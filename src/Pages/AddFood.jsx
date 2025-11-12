import React, { useContext, useState } from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../Providers/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [expireDate, setExpireDate] = useState(new Date());

  const handleAddFood = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const Image = form.Image.value;
    const quantity = parseInt(form.quantity.value);
    const location = form.location.value;
    const notes = form.notes.value;

    const newFood = {
      food_image: Image,
      food_name: name,
      food_quantity: quantity,
      pickup_location: location,
      expire_date: expireDate.toISOString().split("T")[0], // YYYY-MM-DD
      additional_notes: notes,
      donator_name: user.displayName,
      donator_email: user.email,
      donator_image: user.photoURL,
      food_status: "available",
    };

    try {
      const res = await axiosSecure.post("/add-food", newFood);
      if (res.data.insertedId) {
        toast.success("Food added successfully!");
        form.reset();
        setExpireDate(new Date()); // Reset date picker
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add food. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-black/60 to-sky-800/70 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 flex justify-center items-center mt-10 mb-10">
        <form
          onSubmit={handleAddFood}
          className="w-full max-w-lg bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/30 space-y-5"
        >
          <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-4">
            🍽️ Add New Food
          </h2>

          <div className="divider text-white/70">Donator Info</div>

          {/* Donator Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label text-white font-semibold">Donator Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-white/60 text-gray-700 font-semibold"
              />
            </div>
            <div>
              <label className="label text-white font-semibold">Donator Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-white/60 text-gray-700 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="label text-white font-semibold">Donator Image URL</label>
            <input
              type="text"
              value={user?.photoURL || ""}
              readOnly
              className="input input-bordered w-full bg-white/60 text-gray-700 font-semibold"
            />
          </div>

          <div className="divider text-white/70">Food Details</div>

          {/* Food Inputs */}
          <div>
            <label className="label text-white font-semibold">Food Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter food name"
              className="input input-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              required
            />
          </div>

          <div>
            <label className="label text-white font-semibold">Food Image URL</label>
            <input
              type="text"
              name="Image"
              placeholder="Enter image URL"
              className="input input-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              required
            />
          </div>

          <div>
            <label className="label text-white font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              className="input input-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              required
            />
          </div>

          <div>
            <label className="label text-white font-semibold">Pickup Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter pickup location"
              className="input input-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              required
            />
          </div>

          <div>
            <label className="label text-white font-semibold mr-4">Expire Date</label>
            <DatePicker
              selected={expireDate}
              onChange={(date) => setExpireDate(date)}
              className="input input-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              required
            />
          </div>

          <div>
            <label className="label text-white font-semibold">Additional Notes</label>
            <textarea
              name="notes"
              placeholder="Write any notes here..."
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-sky-400 transition-all placeholder:text-base-content/50"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/"
              type="button"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-300 hover:rounded-2xl transition-all"
            >
              Cancel
            </Link>
            <button className="btn border-0 bg-orange-500 hover:bg-orange-600 hover:rounded-2xl text-white font-semibold px-6">
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
