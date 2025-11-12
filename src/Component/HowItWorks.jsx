import React from "react";
import { FaUtensils, FaSearch, FaHandHoldingHeart } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold  mb-8 text-base-content">How It Works</h2>
        <p className="text-base-content/70 mb-12 max-w-2xl mx-auto">
          Sharing food has never been easier! Follow these three simple steps to
          connect with the community and reduce food waste.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl  hover:-translate-y-1 transition-all duration-300">
            <div className="text-5xl mb-4 mx-auto">
              <FaUtensils />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Post Food</h3>
            <p className="text-base-content/70">
              Donators can easily post available food with details like quantity,
              pickup time, and location.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl  hover:-translate-y-1 transition-all duration-300">
            <div className="text-5xl mb-4 mx-auto">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Find Food</h3>
            <p className="text-base-content/70">
              Hungry members or organizations can browse food listings nearby.
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl  hover:-translate-y-1 transition-all duration-300">
            <div className="text-5xl mb-4 mx-auto">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Collect Food</h3>
            <p className="text-base-content/70">
              Pick up the food and share the joy of giving! Help reduce waste and
              feed more people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
