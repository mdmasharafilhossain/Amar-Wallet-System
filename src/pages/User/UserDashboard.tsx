/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import { motion } from "framer-motion";

import WalletCard from "../../components/wallet/WalletCard";
import TransactionList from "../../components/transactions/TransactionList";
import AddMoneyModal from "../../components/wallet/AddMoneyModal";
import WithdrawMoneyModal from "../../components/wallet/WithdrawMoneyModal";
import SendMoneyModal from "../../components/wallet/SendMoneyModal";


import { useGetWalletQuery } from "../../redux/features/auth/wallet.api";
import { useGetMyTransactionsQuery } from "../../redux/features/auth/transaction.Api";
import { useGetProfileQuery } from "../../redux/features/auth/auth.api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Skeleton from "../../shared/Skeleton";

const UserDashboard: React.FC = () => {
  
  const {  data:user } = useGetProfileQuery();
  const { data: wallet, isLoading: walletLoading } = useGetWalletQuery();
   
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 10;

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    limit,
    type: typeFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const transactions = data?.transactions || [];
  const totalPages = data?.totalPages || 0;
  

  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);

const totalTransactions = data?.total || 0;

const totalAmount =
  transactions.reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);


const typeCounts: Record<string, number> = {};

transactions.forEach((tx: any) => {
  typeCounts[tx.type] = (typeCounts[tx.type] || 0) + 1;
});

const totalTx = transactions.length;

// Pie Chart Data (Percentage)
const pieData = Object.keys(typeCounts).map((type) => ({
  name: type.replace("-", " "),
  value: Math.round((typeCounts[type] / totalTx) * 100),
}));


const PIE_COLORS: Record<string, string> = {
  "top up": "#22c55e",    
  "cash in": "#16a34a",    
  withdraw: "#ef4444",   
  "cash out": "#dc2626",   
  send: "#8b5cf6",         
};



// Line Chart Data (Recent Balance Flow) 
let runningBalance = wallet?.balance || 0;

const lineData =
  [...transactions]
    .slice(0, 7)
    .reverse()
    .map((tx: any, index: number) => {
      runningBalance += tx.type === "withdraw" ? -tx.amount : tx.amount;
      return {
        step: `T${index + 1}`,
        balance: runningBalance,
      };
    });
const isDashboardLoading = walletLoading || isLoading;
if (isDashboardLoading) {
  return (
    <div className="space-y-10 p-4 md:p-10 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen">

      {/* Header Skeleton */}
      <div className="bg-[#355676]/90 rounded-2xl p-8 space-y-4">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#355676]/90 rounded-2xl p-5 space-y-3"
          >
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/2" />
          </div>
        ))}
      </div>

      {/* Wallet Card Skeleton */}
      <div className="bg-[#355676]/90 rounded-2xl p-6 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#355676]/90 rounded-2xl p-6 space-y-4"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-56 w-full" />
          </div>
        ))}
      </div>

      {/* Transactions Skeleton */}
      <div className="bg-[#355676]/90 rounded-2xl p-6 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>

    </div>
  );
}


  return (
    <div className="space-y-10 p-4 md:p-10 bg-gradient-to-b from-[#355676] via-[#2b4455] to-[#1f2e3d] min-h-screen" id="quick-actions">

  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-[#355676]/90 shadow-xl rounded-2xl p-6 md:p-8 text-center text-[#E6D5B8] backdrop-blur-md"
  >
    <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">
      Welcome To User Dashboard, {user?.name} 👋
    </h1>
    <p className="text-[#C8A978] mt-2 md:mt-3 text-sm md:text-lg font-medium">
      Manage your wallet and track your transactions effortlessly
    </p>
  </motion.div>
{/* Overview Cards */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {[
    { title: "Balance", value: `৳${wallet?.balance || 0}` },
    { title: "Transactions", value: totalTransactions },
    { title: "Total Volume", value: `৳${totalAmount}` },
  ].map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15 }}
      className="bg-[#355676]/90 backdrop-blur-md rounded-2xl p-5 text-[#E6D5B8] shadow-lg hover:scale-105 transition"
    >
      <p className="text-sm opacity-80">{item.title}</p>
      <p className="text-2xl font-bold text-[#C8A978]">{item.value}</p>
    </motion.div>
  ))}
</div>

  {/* Wallet Section */}
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="mx-auto w-full sm:w-3/4 md:w-full"
    id="wallet-balance"
  >
    <WalletCard
      wallet={wallet}
      isLoading={walletLoading}
      onAddMoney={() => setShowAddMoney(true)}
      onWithdraw={() => setShowWithdraw(true)}
      onSendMoney={() => setShowSendMoney(true)}
    />
  </motion.div>
{/* Analytics Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* Pie Chart */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-[#355676]/90 rounded-2xl p-6 shadow-xl text-[#E6D5B8] backdrop-blur-md"
  >
    <h3 className="text-lg font-semibold mb-4">
      Transaction Breakdown
    </h3>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
         <Pie
  data={pieData}
  dataKey="value"
  innerRadius={55}
  outerRadius={90}
  paddingAngle={4}
  label={({ name, value }) =>
    value !== undefined ? `${name}: ${value}%` : ""
  }
>
  {pieData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={PIE_COLORS[entry.name] || "#E6D5B8"}
    />
  ))}
</Pie>


          <Tooltip
  formatter={(value?: number) =>
    value !== undefined ? `${value}%` : "0%"
  }
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
    className="bg-[#355676]/90 rounded-2xl p-6 shadow-xl text-[#E6D5B8] backdrop-blur-md"
  >
    <h3 className="text-lg font-semibold mb-4">
      Balance Trend
    </h3>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
          <CartesianGrid stroke="#E6D5B8" opacity={0.1} />
          <XAxis dataKey="step" stroke="#E6D5B8" />
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
            dataKey="balance"
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

  {/* Transactions Section */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="bg-[#355676]/90 shadow-xl rounded-2xl p-4 md:p-6 backdrop-blur-md"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-semibold text-[#E6D5B8] drop-shadow mb-2 md:mb-0">
        Recent Transactions
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-auto">
        <select
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8] w-full md:w-auto"
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Types</option>
          <option value="top-up">Top-up</option>
          <option value="withdraw">Withdraw</option>
          <option value="send">Send</option>
        </select>

        <input
          type="date"
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8] w-full md:w-auto"
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
        />
        <input
          type="date"
          className="p-2 rounded bg-[#2C3E50] text-[#E6D5B8] w-full md:w-auto"
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
        />
      </div>
    </div>

    <div className="overflow-x-auto">
      <TransactionList transactions={transactions} isLoading={isLoading} />
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
      <div className="flex flex-wrap justify-center mt-4 gap-2">
        <button
          className="px-2 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50 text-sm"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 py-1 text-[#E6D5B8] text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-2 py-1 rounded bg-[#355676] text-[#E6D5B8] disabled:opacity-50 text-sm"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    )}
  </motion.div>

  {/* Modals */}
  {showAddMoney && <AddMoneyModal isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} />}
  {showWithdraw && <WithdrawMoneyModal isOpen={showWithdraw} onClose={() => setShowWithdraw(false)} />}
  {showSendMoney && <SendMoneyModal isOpen={showSendMoney} onClose={() => setShowSendMoney(false)} />}
</div>

  );
};

export default UserDashboard;
