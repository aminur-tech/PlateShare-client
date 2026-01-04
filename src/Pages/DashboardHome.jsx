import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { AuthContext } from "../Providers/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [foods, setFoods] = useState([]);

  const [stats, setStats] = useState({
    totalFoods: 0,
    totalRequests: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        // 1️⃣ Get all foods of this donator
        const foodsRes = await axiosSecure.get(
          `/foods/donate?email=${user.email}`
        );

        const foodsData = foodsRes.data;

        // 2️⃣ Get food requests related to this user
        const requestsRes = await axiosSecure.get(
          `/food-request?userEmail=${user.email}`
        );

        const requests = requestsRes.data;

        // 3️⃣ Request status counts
        const accepted = requests.filter(r => r.status === "accepted").length;
        const rejected = requests.filter(r => r.status === "rejected").length;
        const pending = requests.filter(
          r => !r.status || r.status === "pending"
        ).length;

        // 4️⃣ Set everything safely
        setFoods(foodsData);
        setStats({
          totalFoods: foodsData.length,
          totalRequests: requests.length,
          accepted,
          rejected,
          pending,
        });

      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchStats();
  }, [user?.email, axiosSecure]);


  // Pie chart colors
  const COLORS = ["#10B981", "#F87171", "#FACC15"]; // accepted-green, rejected-red, pending-yellow
  const pieData = [
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="p-6 bg-base-200 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Foods Added</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.totalFoods}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Requests Made</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.totalRequests}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Accepted</p>
          <p className="text-3xl font-bold text-green-500">{stats.accepted}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Rejected</p>
          <p className="text-3xl font-bold text-red-500">{stats.rejected}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Requests Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Accepted", value: stats.accepted },
                { name: "Rejected", value: stats.rejected },
                { name: "Pending", value: stats.pending },
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {[
                  { name: "Accepted", value: stats.accepted },
                  { name: "Rejected", value: stats.rejected },
                  { name: "Pending", value: stats.pending },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
