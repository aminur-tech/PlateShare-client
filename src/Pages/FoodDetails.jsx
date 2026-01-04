import React, { useContext, useEffect, useRef, useState } from "react";
import { CalendarDays, MapPin, Package, Clock, User, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Providers/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router";
import FoodDetailsSkeleton from "../Component/FoodDetailsSkeleton";
import { Link } from "react-router";


const FoodDetails = () => {
  const requestModalRef = useRef();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [food, setFood] = useState(null);
  const { id } = useParams()
  const [loading, setLoading] = useState(true);
  const {
    _id,
    food_image,
    food_name,
    donator_name,
    donator_image,
    donator_email,
    food_quantity,
    pickup_location,
    expire_date,
    food_status,
    additional_notes,
    food_description,
  } = food || {};


  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then(res => res.json())
      .then(data => {
        setFood(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user?.email === donator_email) {
      axiosSecure.get("/food-request").then((res) => {
        const filtered = res.data.filter((r) => r.foodId === _id);
        setRequests(filtered);
      });
    }
  }, [user, donator_email, _id, axiosSecure]);


  if (loading) {
    return FoodDetailsSkeleton();
  }

  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="loading loading-ring loading-lg text-orange-500"></span>
        <p className="mt-4 text-slate-500 font-medium">Loading delicious details...</p>
      </div>
    );
  }



  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/food-request/${id}/status`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Request ${status} successfully`);
        setRequests((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;

    const requestData = {
      foodId: _id,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      location: form.location.value,
      needFood: form.needFood.value,
      contact: form.contact.value,
      status: "pending",
      requestedAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/food-request", requestData);
      if (res.data.insertedId) {
        toast("Request sent successfully!", {
          className: "toast-orange"
        });
        form.reset();
        requestModalRef.current.close()
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 lg:my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: IMAGE & DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
            <img
              src={food_image}
              alt={food_name}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md shadow-lg text-white ${food_status === "available" ? "bg-emerald-500/90" : "bg-rose-500/90"
                }`}>
                {food_status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Description</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {food_description || "No specific description provided for this item."}
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: INFO & ACTIONS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 space-y-6 lg:sticky lg:top-24"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              {food_name}
            </h1>

            {/* Donor Profile */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-8">
              <div className="relative">
                <img
                  src={donator_image}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-slate-700"
                  alt={donator_name}
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Donated By</p>
                <p className="text-lg font-bold text-slate-800 dark:text-white">{donator_name}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <InfoRow icon={<Package className="w-5 h-5" />} label="Quantity" value={`${food_quantity} Servings`} />
              <InfoRow icon={<MapPin className="w-5 h-5" />} label="Location" value={pickup_location} />
              <InfoRow icon={<Clock className="w-5 h-5" />} label="Expires" value={expire_date} color="text-rose-500" />
            </div>

            {/* Donor's Note */}
            {additional_notes && (
              <div className="mb-8 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-400">
                <div className="flex gap-2 items-center text-orange-700 dark:text-orange-400 mb-1">
                  <MessageSquare size={16} />
                  <span className="font-bold text-sm uppercase">Donor's Note</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic">"{additional_notes}"</p>
              </div>
            )}

            {/* Action Button */}
            {!user ? (
              /* NOT LOGGED IN */
              <Link
                to="/auth/login"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              >
                Login to Request Food
              </Link>

            ) : user.email === donator_email ? (
              /* DONATOR HIMSELF */
              <div className="text-center p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 font-medium">
                  This is your donation
                </p>
              </div>

            ) : (
              /* LOGGED IN & NOT DONATOR */
              <button
                disabled={food_status !== "available"}
                onClick={() => requestModalRef.current.showModal()}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Request This Food
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* DONATOR MANAGEMENT SECTION */}
      <AnimatePresence>
        {user?.email === donator_email && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 dark:border-slate-800">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Manage Requests
                <span className="bg-orange-100 text-orange-600 px-3 py-0.5 rounded-full text-sm">
                  {requests.length}
                </span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-slate-400 uppercase text-xs">
                    <th className="bg-transparent px-8">Requester</th>
                    <th className="bg-transparent">Location & Contact</th>
                    <th className="bg-transparent">Message</th>
                    <th className="bg-transparent text-right px-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <img src={req.userPhoto} className="w-10 h-10 rounded-full" alt="" />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white">{req.userName}</p>
                            <p className="text-xs text-slate-500">{req.userEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                            <MapPin size={14} /> {req.location}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                            <Phone size={14} /> {req.contact}
                          </div>
                        </div>
                      </td>
                      <td className="max-w-xs whitespace-normal text-sm text-slate-600 italic">
                        "{req.needFood}"
                      </td>
                      <td className="px-8 text-right">
                        {req.status === "pending" ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleStatusUpdate(req._id, "accepted")}
                              className="btn btn-sm btn-success text-white capitalize shadow-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "rejected")}
                              className="btn btn-sm btn-ghost text-rose-500 capitalize"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className={`text-sm font-bold capitalize ${req.status === "accepted" ? "text-emerald-500" : "text-rose-500"
                            }`}>
                            {req.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-10 text-center text-slate-400">
                        No requests yet for this item.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODERN REQUEST MODAL */}
      <dialog ref={requestModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 rounded-3xl overflow-hidden bg-white dark:bg-slate-900">
          <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-white">
            <h3 className="font-bold text-2xl">Food Request</h3>
            <p className="text-orange-100 opacity-90">Please provide details to the donor.</p>
          </div>
          <form onSubmit={handleRequestSubmit} className="p-8 space-y-5">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label font-bold text-slate-700 dark:text-slate-300">Your Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input name="location" placeholder="e.g. Downtown, NY" className="input input-bordered w-full pl-12 rounded-xl focus:ring-orange-500" required />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input name="contact" placeholder="+1 (555) 000-0000" className="input input-bordered w-full pl-12 rounded-xl" required />
                </div>
              </div>

              <div className="form-control">
                <label className="label font-bold text-slate-700 dark:text-slate-300">Reason for Request</label>
                <textarea name="needFood" placeholder="Briefly explain why you're requesting this..." className="textarea textarea-bordered w-full h-28 rounded-xl" required />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={() => requestModalRef.current.close()}
                className="btn btn-ghost order-2 sm:order-1 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-orange-500 hover:bg-orange-600 text-white border-0 flex-1 order-1 sm:order-2 rounded-xl shadow-lg"
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Confirm Request"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

// Sub-component for clean organization
const InfoRow = ({ icon, label, value, color = "text-slate-700 dark:text-slate-200" }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800">
    <div className="flex items-center gap-3 text-slate-400">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

export default FoodDetails;