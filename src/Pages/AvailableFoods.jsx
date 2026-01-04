import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodCard from "../Component/FoodCard";
import SkeletonCard from "../Component/SkeletonCard";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  let availableFoods = foods.filter(
    (food) => food.food_status === "available"
  );

  if (searchTerm.trim()) {
    availableFoods = availableFoods.filter((food) =>
      food.food_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder === "asc") {
    availableFoods = [...availableFoods].sort(
      (a, b) => a.food_quantity - b.food_quantity
    );
  } else if (sortOrder === "desc") {
    availableFoods = [...availableFoods].sort(
      (a, b) => b.food_quantity - a.food_quantity
    );
  }

  const totalPages = Math.ceil(availableFoods.length / itemsPerPage);
  const currentFoods = availableFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* LEFT PANEL */}
        <div className="w-full md:w-1/4 space-y-6 md:sticky md:top-24 h-fit">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="default">Sort by Quantity</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>

          <div className="bg-base-100 p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Tips</h3>
            <ul className="text-sm opacity-70 list-disc list-inside">
              <li>Search food name</li>
              <li>Sort by quantity</li>
              <li>Reduce food waste</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-3/4 flex flex-col">

          {/* Header */}
          <div className="text-center mb-10 mt-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              🍱 Available Foods for Donation
            </h1>
            <p className="max-w-2xl mx-auto text-sm md:text-base opacity-70">
              Explore the list of available food items donated by kind-hearted individuals.
            </p>
          </div>

          {/* Food Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading &&
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

            {!loading &&
              currentFoods.map((food) => <FoodCard key={food._id} food={food} />)}

            {!loading && currentFoods.length === 0 && (
              <h2 className="col-span-full text-2xl font-bold text-center opacity-60 mt-20">
                No food items found.
              </h2>
            )}
          </div>

          {/* Go Home */}
          <div className="flex justify-center my-10">
            <Link
              to="/"
              className="btn bg-orange-500 text-white hover:bg-orange-600 border-0 px-8"
            >
              Go Home
            </Link>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                className="btn btn-sm"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${currentPage === i + 1 ? "btn-active bg-orange-500 text-white" : ""}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="btn btn-sm"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </div>

  );
};

export default AvailableFoods;
