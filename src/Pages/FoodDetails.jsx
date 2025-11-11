import React, { useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { CalendarDays, MapPin, Package } from 'lucide-react';

const FoodDetails = () => {
    const food = useLoaderData();
    // console.log(food)

    const [requestFood, setRequestFood] = useState()
    const requestModalRef = useRef()

    if (!food) return <p className="text-center mt-10 text-gray-500">Loading...</p>;


    const {
        food_image,
        food_name,
        donator_name,
        donator_image,
        food_quantity,
        pickup_location,
        expire_date,
        food_status,
        additional_notes,
        food_description
    } = food;

    const handleOpenModal = () => {
        requestModalRef.current.showModal()
    }

    const handleRequestSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white shadow-md rounded-2xl overflow-hidden">
            <img src={food_image} alt={food_name} className="w-full h-80 object-cover" />

            <div className="p-6 space-y-5">
                <h1 className="text-3xl font-bold text-gray-800">{food_name}</h1>

                <div className="flex items-center gap-3">
                    {donator_image ? (
                        <img
                            src={donator_image}
                            alt=''
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
                            className={`text-xs px-3 py-1 rounded-full ${food_status === "available"
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

                <button onClick={handleOpenModal} className="btn w-full mt-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    Request Food
                </button>
            </div>


            {/* ✅  Modal */}
            <dialog
                ref={requestModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3 text-sky-700">
                        Food Request Info
                    </h3>


                    <form
                        onSubmit={handleRequestSubmit}
                        className="space-y-6 bg-gradient-to-br from-sky-900/60 via-sky-800/70 to-sky-700/80 p-8 rounded-2xl shadow-2xl border border-sky-400/30 backdrop-blur-lg transition-all hover:shadow-sky-400/40"
                    >
                        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
                            📝 Request for Food
                        </h2>

                        {/* Location */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-white font-semibold mb-2 tracking-wide"
                            >
                                Your Location
                            </label>
                            <input
                                id="location"
                                name="location"
                                className="input input-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                                placeholder="Enter your location"
                                required
                            />
                        </div>

                        {/* Why Need Food */}
                        <div>
                            <label
                                htmlFor="needFood"
                                className="block text-white font-semibold mb-2 tracking-wide"
                            >
                                Why Do You Need Food?
                            </label>
                            <textarea
                                id="needFood"
                                name="needFood"
                                className="textarea textarea-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                                placeholder="Explain briefly..."
                                rows={5}
                                required
                            ></textarea>
                        </div>

                        {/* Contact */}
                        <div>
                            <label
                                htmlFor="contact"
                                className="block text-white font-semibold mb-2 tracking-wide"
                            >
                                Your Contact Number
                            </label>
                            <input
                                type="number"
                                id="contact"
                                name="contact"
                                className="input input-bordered w-full bg-white/90 text-gray-800 font-medium placeholder-gray-500 focus:ring-2 focus:ring-sky-400 focus:outline-none rounded-xl shadow-sm transition-all"
                                placeholder="Enter your contact number"
                                required
                            />
                        </div>

                        {/* Buttons */}
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
        </div>
    );
};

export default FoodDetails;
