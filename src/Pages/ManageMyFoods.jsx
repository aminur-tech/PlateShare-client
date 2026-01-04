import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Providers/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const updateModalRef = useRef(null);

  // Fetch user's foods
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/add-food?email=${user.email}`)
        .then((res) => setFoods(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  // Open modal
  const handleModalOpenBtn = (food) => {
    setSelectedFood(food);
    updateModalRef.current.showModal();
  };

  // Update food
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/add-food/${selectedFood._id}`,
        updatedFood
      );

      if (res.data.modifiedCount > 0) {
        setFoods(
          foods.map((f) =>
            f._id === selectedFood._id ? { ...f, ...updatedFood } : f
          )
        );
        toast.success("Food updated successfully!");
        updateModalRef.current.close();
      } else {
        toast.info("No changes made.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update!");
    }
  };

  // Delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you won’t be able to recover this food item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/add-food/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setFoods(foods.filter((food) => food._id !== id));
              toast.success("Food deleted successfully!");
            }
          })
          .catch(() => toast.error("Failed to delete!"));
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 py-10 text-gray-800 dark:text-gray-200">
      <div className="w-full md:max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Manage My Foods 🍽️
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You haven't added any foods yet.
          </p>
        ) : (
          <div className="overflow-auto shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <table className="table table-auto w-full text-gray-700 dark:text-gray-200">
              <thead className="bg-orange-500 dark:bg-orange-600 text-white">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Expire Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {foods.map((food, index) => (
                  <tr
                    key={food._id}
                    className="hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="font-semibold">
                      {index + 1}
                    </td>

                    <td className="flex flex-col items-center md:flex-row md:gap-3">
                      <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-semibold">
                        {food.food_name}
                      </span>
                    </td>

                    <td className="font-semibold">
                      {food.food_quantity}
                    </td>
                    <td className="font-semibold">
                      {food.pickup_location}
                    </td>
                    <td className="font-semibold">
                      {food.expire_date}
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleModalOpenBtn(food)}
                          className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-0"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleDelete(food._id)}
                          className="btn btn-sm bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-white font-bold hover:from-orange-600 hover:to-orange-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Update Modal */}
            <dialog
              ref={updateModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <h3 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">
                  Update Food Info
                </h3>

                {selectedFood && (
                  <form
                    onSubmit={handleUpdateSubmit}
                    className="space-y-3"
                  >
                    <input
                      name="food_name"
                      defaultValue={selectedFood.food_name}
                      className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    />

                    <input
                      name="food_image"
                      defaultValue={selectedFood.food_image}
                      className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    />

                    <input
                      name="food_quantity"
                      defaultValue={selectedFood.food_quantity}
                      className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    />

                    <input
                      name="pickup_location"
                      defaultValue={selectedFood.pickup_location}
                      className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    />

                    <input
                      name="expire_date"
                      type="date"
                      defaultValue={selectedFood.expire_date}
                      className="input input-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                    />

                    <div className="modal-action">
                      <button
                        type="submit"
                        className="btn bg-sky-600 hover:bg-sky-700 text-white"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() => updateModalRef.current.close()}
                        className="btn bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </dialog>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <Link
          to="/"
          className="btn bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-white font-bold px-8"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default ManageMyFoods;
