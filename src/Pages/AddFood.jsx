import React, { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
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

    const newFood = {
      food_image: form.Image.value,
      food_name: form.name.value,
      food_quantity: Number(form.quantity.value),
      pickup_location: form.location.value,
      expire_date: expireDate.toISOString().split("T")[0],
      additional_notes: form.notes.value,
      donator_name: user.displayName,
      donator_email: user.email,
      donator_image: user.photoURL,
      food_status: "available",
    };

    try {
      const res = await axiosSecure.post("/add-food", newFood);
      if (res.data.insertedId) {
        toast("Food added successfully", {
            className: "toast-orange"
          }
        );
        form.reset();
        setExpireDate(new Date());
      }
    } catch {
      toast.error("Failed to add food");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-base-content">
          Add New Food
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Share food details to make it available for requests.
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleAddFood}
        className="bg-base-100 rounded-xl shadow border border-base-300 p-6 md:p-8 space-y-6"
      >
        {/* Donator Info */}
        <section>
          <h2 className="text-sm font-semibold opacity-80 mb-4">
            Donator Information
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered w-full bg-base-200"
            />
            <input
              readOnly
              value={user?.email || ""}
              className="input input-bordered w-full bg-base-200"
            />
            <input
              readOnly
              value={user?.photoURL || ""}
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </section>

        {/* Food Details */}
        <section>
          <h2 className="text-sm font-semibold opacity-80 mb-4">
            Food Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Food name"
              required
              className="input input-bordered w-full"
            />
            <input
              name="Image"
              placeholder="Image URL"
              required
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              required
              className="input input-bordered w-full"
            />
            <input
              name="location"
              placeholder="Pickup location"
              required
              className="input input-bordered w-full"
            />

            <DatePicker
              selected={expireDate}
              onChange={(date) => setExpireDate(date)}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="input input-bordered w-full bg-base-100"
              required
            />
          </div>

          <textarea
            name="notes"
            rows={4}
            placeholder="Additional notes"
            required
            className="textarea textarea-bordered w-full mt-4"
          />
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-base-300 pt-6">
          <Link to="/" className="btn btn-ghost">
            Cancel
          </Link>
          <button className="btn bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6">
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
