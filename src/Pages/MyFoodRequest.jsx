import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthContext';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { Link } from 'react-router';

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [myRequests, setMyRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return;
        axiosSecure
            .get(`/food-request?userEmail=${user.email}`)
            .then((res) => setMyRequests(res.data))
            .catch((err) => console.error(err));
    }, [axiosSecure, user?.email]);

    const handleRemoveRequest = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/food-request/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your request has been removed.', 'success');
                        setMyRequests(myRequests.filter((req) => req._id !== id));
                    }
                });
            }
        });
    };

    return (
        <div>
            <div className="min-h-screen max-w-6xl mx-auto py-12 bg-gray-50">
                <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                        🥗 My Food Requests ({myRequests.length})
                    </h2>

                    {myRequests.length === 0 ? (
                        <p className="text-center text-gray-500">No food requests yet.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-100">
                            <table className="table w-full">
                                <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                                    <tr>
                                        <th className="py-3 px-4 text-left">#</th>
                                        <th className="py-3 px-4 text-left">User</th>
                                        <th className="py-3 px-4 text-left">Location</th>
                                        <th className="py-3 px-4 text-left">Reason</th>
                                        <th className="py-3 px-4 text-left">Contact</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                        <th className="py-3 px-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRequests.map((req, index) => (
                                        <tr
                                            key={req._id}
                                            className="hover:bg-gray-50 transition border-b border-gray-100"
                                        >
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4 flex items-center gap-3">
                                                {req.userPhoto ? (
                                                    <img
                                                        src={req.userPhoto}
                                                        alt=""
                                                        className="w-10 h-10 rounded-full object-cover border"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
                                                        {req.userName?.charAt(0)}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-800">{req.userName}</p>
                                                    <p className="text-xs text-gray-500">{req.userEmail}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">{req.location}</td>
                                            <td className="py-3 px-4 text-gray-700 max-w-[250px] truncate">{req.needFood}</td>
                                            <td className="py-3 px-4 text-gray-700">{req.contact}</td>

                                            {/* ✅ Status Column */}
                                            <td className="py-3 px-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                    ${req.status === 'accepted'
                                                            ? 'bg-green-100 text-green-700'
                                                            : req.status === 'rejected'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                >
                                                    {req.status || 'pending'}
                                                </span>
                                            </td>

                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    onClick={() => handleRemoveRequest(req._id)}
                                                    className="px-4 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md  hover:from-orange-600 hover:to-orange-700 transition"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-10 mb-10">
                    <Link to='/'
                        className="btn bg-gradient-to-r from-orange-500 to-orange-600 border-0 text-white hover:rounded-2xl font-bold px-8"
                    >
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyFoodRequest;
