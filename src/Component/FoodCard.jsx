import React from "react";
import { CalendarDays, MapPin, Package } from "lucide-react";
import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {
    food_image,
    food_name,
    donator_name,
    donator_image,
    food_quantity,
    pickup_location,
    expire_date,
    food_status,
    _id
  } = food;

  return (
    <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Food Image */}
      <div className="relative">
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-52 object-cover"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
            food_status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {food_status}
        </span>
      </div>

      {/* Food Info */}
      <div className="p-5 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{food_name}</h2>

        {/* Donator Info */}
        <div className="flex items-center gap-3">
          {donator_image ? (
            <img
              src={donator_image}
              alt={donator_name}
              className="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {donator_name?.charAt(0)}
            </div>
          )}
          <p className="text-sm text-gray-600">
            Donated by{" "}
            <span className="font-medium text-gray-800">{donator_name}</span>
          </p>
        </div>

        {/* Food Details */}
        <div className="flex flex-col gap-2 text-gray-600 text-sm">
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
            <span>Expire: {expire_date}</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/foods/${_id}`} className="btn mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
