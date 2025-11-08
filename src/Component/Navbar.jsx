import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Providers/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut();
    };

    const link = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `px-4 py-2 font-medium transition hover:text-[#9F62F2] ${isActive ? 'text-[#9F62F2] underline' : ''}`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/apps"
                className={({ isActive }) =>
                    `px-4 py-2 font-medium transition hover:text-[#9F62F2] ${isActive ? 'text-[#9F62F2] underline' : ''}`
                }
            >
                Available Foods
            </NavLink>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                        {link}
                    </ul>
                </div>
                <NavLink
                    to="/"
                >
                    <div className='flex gap-1 items-center btn-ghost text-xl text-[#9F62F2] font-bold tracking-wide'>
                        <img src="https://i.ibb.co.com/HL8J61bT/Plate-Share-removebg-preview.png" alt="" className='w-12 h-12' /> PlateShare
                    </div>
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-6">{link}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-[#9F62F2]/30">
                                <img
                                    src={user?.photoURL}
                                    alt="User"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link to="/add-food" className="hover:text-[#9F62F2]">
                                    Add Food
                                </Link>
                            </li>
                            <li>
                                <Link to="/manage-foods" className="hover:text-[#9F62F2]">
                                    Manage My Foods
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-requests" className="hover:text-[#9F62F2]">
                                    My Food Requests
                                </Link>
                            </li>

                            <li className="border-t border-gray-300 mt-2 pt-2">
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-600 font-medium"
                                >
                                    <LogOut /> Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/auth/login"
                        className="px-3 py-2 rounded-md bg-[#9F62F2] text-white font-bold hover:bg-[#7c3aed] transition"
                    >
                        <div className='flex gap-2 items-center'><LogIn></LogIn> Login</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
