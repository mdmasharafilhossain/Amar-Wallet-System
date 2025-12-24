
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useGetAllAgentsQuery,
  useGetAllUsersQuery,
} from "../../redux/features/auth/admin.api";
import { useGetAllTransactionsQuery } from "../../redux/features/auth/transaction.Api";

import { useGetProfileQuery } from "../../redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { Users, UserCheck, ReceiptText } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Skeleton from "../../shared/Skeleton";

const AdminDashboard: React.FC = () => {
  const { data } = useGetProfileQuery();

  // Fetch paginated data (only totals matter)
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 1,
  });
  const { data: agentsData, isLoading: agentsLoading } = useGetAllAgentsQuery({
    page: 1,
    limit: 1,
  });

  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery({ page: 1, limit: 100 });

  if (usersLoading || agentsLoading || transactionsLoading) {
  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen">

      {/* Header Skeleton */}
      <div className="bg-[#355676] rounded-2xl p-6 space-y-4">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#355676] rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ))}
      </div>

      {/* Monthly Summary Skeleton */}
      <div className="bg-[#355676] rounded-2xl p-6 space-y-4">
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>

      {/* Growth Cards Skeleton */}
      <div className="bg-[#355676] rounded-2xl p-6 space-y-4">
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-[#355676] rounded-2xl p-6 space-y-4">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>

    </div>
  );
}


  // Counts from backend totals
  const userCount = usersData?.total || 0;
  const agentCount = agentsData?.total || 0;
  const transactionCount = transactionsData?.total || 0;

  // Transaction volume (sum of all amounts in current fetch)
  const transactionVolume =
    transactionsData?.transactions?.reduce(
      (sum: number, tx: any) => sum + (tx.amount || 0),
      0
    ) || 0;

  const stats = [
    {
      title: "Users",
      value: userCount,
      icon: <Users className="w-8 h-8 text-[#E6D5B8]" />,
    },
    {
      title: "Agents",
      value: agentCount,
      icon: <UserCheck className="w-8 h-8 text-[#E6D5B8]" />,
    },
    {
      title: "Transactions",
      value: transactionCount,
      subtitle: `Volume: ${transactionVolume} Tk`,
      icon: <ReceiptText className="w-8 h-8 text-[#E6D5B8]" />,
    },
  ];
const pieData = [
  { name: "Users", value: userCount },
  { name: "Agents", value: agentCount },
];

const lineData =
  transactionsData?.transactions?.slice(0, 10).map((tx: any, index: number) => ({
    index: index + 1,
    amount: tx.amount,
  })) || [];

const COLORS = ["#E6D5B8", "#C8A978"];
// Monthly transaction summary
const monthlySummary: Record<string, number> = {};

transactionsData?.transactions?.forEach((tx: any) => {
  const month = new Date(tx.createdAt).toLocaleString("default", {
    month: "short",
  });
  monthlySummary[month] =
    (monthlySummary[month] || 0) + (tx.amount || 0);
});

const monthlyStats = Object.entries(monthlySummary).slice(0, 6);
const totalBalanceGrowth =
  transactionsData?.transactions?.reduce(
    (sum: number, tx: any) => sum + (tx.amount || 0),
    0
  ) || 0;

const avgTransaction =
  transactionCount > 0
    ? Math.round(totalBalanceGrowth / transactionCount)
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#355676] shadow-lg rounded-2xl p-6 text-[#E6D5B8]"
      >
        <h1 className="text-2xl font-bold">
          Welcome <span className="hover:text-[#C8A978]">{data?.name}</span>
        </h1>
        <p className="text-sm opacity-80">
          Manage users, agents, wallets, and transactions
        </p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#355676] text-[#E6D5B8] shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl hover:text-[#C8A978] transition-all duration-300"
          >
            <div>
              <h3 className="text-sm opacity-80">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-sm opacity-70">{stat.subtitle}</p>
              )}
            </div>
            <div className="p-3 rounded-full bg-[#E6D5B8]/10">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Monthly Transaction Summary */}
<div className="bg-[#355676] rounded-2xl p-6 shadow-lg text-[#E6D5B8] mt-6">
  <h3 className="text-lg font-semibold mb-6">
    Monthly Transaction Summary
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {monthlyStats.map(([month, amount], i) => (
      <motion.div
        key={month}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="bg-[#2D4754] rounded-xl p-4 text-center hover:scale-105 transition"
      >
        <p className="text-sm opacity-80">{month}</p>
        <p className="text-lg font-bold text-[#C8A978]">
          ৳ {amount}
        </p>
      </motion.div>
    ))}
  </div>
</div>
{/* Wallet Growth Insights */}
<div className="bg-[#355676] rounded-2xl p-6 shadow-lg text-[#E6D5B8] mt-6">
  <h3 className="text-lg font-semibold mb-6">
    Wallet Balance Growth
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Total Growth */}
    <div className="bg-[#2D4754] rounded-xl p-5">
      <p className="text-sm opacity-80">Total Growth</p>
      <p className="text-2xl font-bold text-[#C8A978]">
        ৳ {totalBalanceGrowth}
      </p>
    </div>

    {/* Avg Transaction */}
    <div className="bg-[#2D4754] rounded-xl p-5">
      <p className="text-sm opacity-80">Average Transaction</p>
      <p className="text-2xl font-bold text-[#C8A978]">
        ৳ {avgTransaction}
      </p>
    </div>

   

  </div>
</div>


      {/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  {/* 3D Pie Chart */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-[#355676] rounded-2xl p-6 shadow-lg text-[#E6D5B8]"
  >
    <h3 className="text-lg font-semibold mb-4">
      User vs Agent Distribution
    </h3>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            isAnimationActive
          >
            {pieData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#355676",
              border: "none",
              color: "#E6D5B8",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </motion.div>

  {/* Line Chart */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-[#355676] rounded-2xl p-6 shadow-lg text-[#E6D5B8]"
  >
    <h3 className="text-lg font-semibold mb-4">
      Transaction Trend
    </h3>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6D5B8" opacity={0.1} />
          <XAxis dataKey="index" stroke="#E6D5B8" />
          <YAxis stroke="#E6D5B8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#355676",
              border: "none",
              color: "#E6D5B8",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#C8A978"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </motion.div>

</div>

    </div>
  );
};

export default AdminDashboard; 
