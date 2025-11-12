import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { CalendarDays, MapPin, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const FoodDetails = () => {
  const food = useLoaderData();
  const requestModalRef = useRef();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  if (!food) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

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
  } = food;

  // ✅ Fetch requests for this food if the logged-in user is the donator
  useEffect(() => {
    const fetchRequests = async () => {
      if (user?.email === donator_email) {
        const res = await axiosSecure.get(`/food-request`);
        const foodRequests = res.data.filter(req => req.foodId === _id);
        setRequests(foodRequests);
      }
    };
    fetchRequests();
  }, [user, donator_email, _id, axiosSecure]);

  // ✅ Handle accept / reject
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/food-request/${id}/status`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Request ${status} successfully!`);
        setRequests(prev =>
          prev.map(req =>
            req._id === id ? { ...req, status } : req
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status!");
    }
  };

  // ✅ Handle open modal
  const handleOpenModal = () => {
    requestModalRef.current.showModal();
  };

  // ✅ Handle request submit
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const needFood = form.needFood.value;
    const contact = form.contact.value;

    const newRequest = {
      foodId: _id,
      userEmail: user?.email,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      location,
      needFood,
      contact,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post(`/food-request`, newRequest);
      if (res.data.insertedId) {
        toast.success("Request submitted successfully!");
        form.reset();
        requestModalRef.current.close();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-md rounded-2xl overflow-hidden">
      <img src={food_image} alt={food_name} className="w-full h-80 object-cover" />

      <div className="p-6 space-y-5">
        <h1 className="text-3xl font-bold text-gray-800">{food_name}</h1>

        <div className="flex items-center gap-3">
          {donator_image ? (
            <img
              src={donator_image}
              alt=""
              className="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {donator_name?.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-700">{donator_name}</p>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                food_status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {food_status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Package size={16} />
            <span>Quantity: {food_quantity}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{pickup_location}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>Expires on: {expire_date}</span>
          </div>
        </div>

        {(additional_notes || food_description) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl text-gray-700">
            <h3 className="font-semibold text-lg mb-1">Additional Notes:</h3>
            <p>{additional_notes || food_description}</p>
          </div>
        )}

        {user?.email !== donator_email && (
          <button
            onClick={handleOpenModal}
            className="btn w-full border-0 mt-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Request Food
          </button>
        )}
      </div>

      {/* ✅ Request Modal */}
      <dialog ref={requestModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3 text-sky-700">Food Request Info</h3>

          <form
            onSubmit={handleRequestSubmit}
            className="space-y-6 bg-gradient-to-br from-sky-900/60 via-sky-800/70 to-sky-700/80 p-8 rounded-2xl shadow-2xl border border-sky-400/30 backdrop-blur-lg transition-all hover:shadow-sky-400/40"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
              📝 Request for Food
            </h2>

            {/* Location */}
            <div>
              <label className="block text-white font-semibold mb-2 tracking-wide">
                Your Location
              </label>
              <input
                name="location"
                className="input input-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                placeholder="Enter your location"
                required
              />
            </div>

            {/* Why Need Food */}
            <div>
              <label className="block text-white font-semibold mb-2 tracking-wide">
                Why Do You Need Food?
              </label>
              <textarea
                name="needFood"
                className="textarea textarea-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                placeholder="Explain briefly..."
                rows={5}
                required
              ></textarea>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-white font-semibold mb-2 tracking-wide">
                Your Contact Number
              </label>
              <input
                id="contact"
                name="contact"
                className="input input-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div className="modal-action flex justify-end gap-3 pt-4">
              <button
                type="submit"
                className="btn bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-semibold px-6 rounded-xl transition-all hover:scale-105"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => requestModalRef.current.close()}
                className="btn bg-white/90 hover:bg-white text-sky-700 font-semibold rounded-xl px-6 border border-sky-300 hover:scale-105 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* ✅ Requests Table (only donator) */}
      {user?.email === donator_email && (
        <div className="p-6 border-t bg-gray-50 max-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Food Requests ({requests.length})
          </h2>
          {requests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full border text-sm">
                <thead className="bg-sky-100 text-sky-800">
                  <tr>
                    <th>User</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td className="flex items-center gap-2">
                        <img
                          src={req.userPhoto}
                          alt={req.userName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{req.userName}</p>
                          <p className="text-xs text-gray-500">{req.userEmail}</p>
                        </div>
                      </td>
                      <td>{req.location}</td>
                      <td>{req.needFood}</td>
                      <td>{req.contact}</td>
                      <td>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            req.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : req.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(req._id, "accepted")}
                          className="btn btn-xs bg-green-500 border-0 text-white hover:bg-green-600"
                          disabled={req.status !== "pending"}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "rejected")}
                          className="btn btn-xs bg-red-500 border-0 text-white hover:bg-red-600"
                          disabled={req.status !== "pending"}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No requests yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
