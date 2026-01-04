import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  LayoutGrid,
  PlusCircle,
  Settings,
  ClipboardList,
  Menu,
  X,
  Home,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../Providers/AuthContext";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const navItems = [
    { name: "Home", path: "home", icon: <Home size={20} /> },
    { name: "Add Food", path: "add-food", icon: <PlusCircle size={20} /> },
    { name: "Manage My Foods", path: "manage-my-foods", icon: <Settings size={20} /> },
    { name: "My Food Request", path: "my-food-request", icon: <ClipboardList size={20} /> },
  ];

  // close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* ================= Sidebar (Desktop) ================= */}
      <aside className="w-64 bg-base-100 shadow-md hidden lg:block">
        <div className="p-6 border-b">
          <Link to={`/`} className="text-xl font-bold text-orange-500 flex items-center gap-2">
            <LayoutGrid /> Dashboard
          </Link>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition
                    ${
                      isActive
                        ? "bg-orange-100 text-orange-600 font-semibold"
                        : "text-base-content hover:bg-base-300"
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ================= Mobile Sidebar ================= */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="w-64 h-full bg-base-100 shadow-xl">
          <div className="p-6 border-b flex justify-between items-center">
            <Link to={`/`} className="text-xl font-bold text-orange-500 flex items-center gap-2"><LayoutGrid />  Dashboard</Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="mt-4 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg mb-1 ${
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "text-base-content"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/30 -z-10"
        />
      </div>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-base-100 shadow-sm flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4 overflow-hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu />
            </button>

            {/* === Marquee Slogan === */}
            <div className="relative overflow-hidden w-56 sm:w-72 md:w-96">
              <div className="whitespace-nowrap animate-marquee font-medium text-base-content">
                Community Food Sharing • Connecting People Through Food •
              </div>
            </div>
          </div>

          {/* ===== Profile Dropdown ===== */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-3"
            >
              <div className="avatar">
                <div className="w-9 rounded-full ring ring-orange-400 ring-offset-2">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="profile"
                  />
                </div>
              </div>

              <span className="hidden sm:block font-medium">
                {user?.displayName?.split(" ")[0]}
              </span>

              <ChevronDown size={18} />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-base-100 border rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold">
                    {user?.displayName}
                  </p>
                  <p className="text-xs opacity-70 truncate">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={logOut}
                  className="w-full btn flex items-center gap-2 px-4 py-3 text-sm text-error hover:bg-base-200"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-8">
          <div className="bg-base-100 rounded-xl shadow-sm p-4 md:p-6 min-h-[85vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
