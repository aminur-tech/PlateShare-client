import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router';
import { AuthContext } from '../Providers/AuthContext';
import { LogIn, LogOut, Menu } from 'lucide-react';

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
                    `px-4 py-2 font-medium transition-all duration-300 relative group ${isActive
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`
                }
            >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
                to="/available-foods"
                className={({ isActive }) =>
                    `px-4 py-2 font-medium transition-all duration-300 relative group ${isActive
                        ? 'text-orange-600'
                        : 'text-gray-700 hover:text-orange-600'
                    }`
                }
            >
                Available Foods
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
        </>
    );

    return (
        <div className="navbar bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu size={20} className="text-gray-700" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-xl mt-3 w-52 p-2 shadow-lg border border-orange-100"
                    >
                        {link}
                    </ul>
                </div>
                <NavLink to="/">
                    <div className="flex gap-2 items-center text-2xl font-bold tracking-wider hover:scale-105 transition-transform">
                        <img
                            src="https://i.ibb.co.com/HL8J61bT/Plate-Share-removebg-preview.png"
                            alt="PlateShare"
                            className="w-10 h-10"
                        />
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                            PlateShare
                        </span>
                    </div>
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-2">{link}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-3">
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-orange-400 transition-all">
                                <div className="w-10 rounded-full ring ring-orange-300/50">
                                    <img src={user?.photoURL} alt="User" className="object-cover" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52 border border-orange-100"
                            >
                                <li>
                                    <NavLink to="/add-food" className={({ isActive }) =>
                                        `px-4 py-2 font-medium transition-all duration-300 relative group ${isActive
                                            ? 'text-orange-600'
                                            : 'text-gray-700 hover:text-orange-600'
                                        }`}>
                                        Add Food
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manage-my-foods" className={({ isActive }) =>
                                        `px-4 py-2 font-medium transition-all duration-300 relative group ${isActive
                                            ? 'text-orange-600'
                                            : 'text-gray-700 hover:text-orange-600'
                                        }`}>
                                        Manage My Foods
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-food-request" className={({ isActive }) =>
                                        `px-4 py-2 font-medium transition-all duration-300 relative group ${isActive
                                            ? 'text-orange-600'
                                            : 'text-gray-700 hover:text-orange-600'
                                        }`}>
                                        My Food Requests
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                                    </NavLink>
                                </li>

                                <li className="border-t border-gray-200 mt-2 pt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
                                    >
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to="/auth/login"
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex gap-2 items-center"
                        >
                            <LogIn size={18} /> Login
                        </Link>
                    )}
            </div>
        </div >
    );
};

export default Navbar;
