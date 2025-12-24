import React from "react";

import { motion } from "framer-motion";
import type { WalletCardProps } from "../../types/wallet";



const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  isLoading,
  onAddMoney,
  onWithdraw,
  onSendMoney,
}) => {
  if (isLoading) {
    return (
      <div className="bg-[#355676] shadow-lg rounded-2xl p-6 animate-pulse text-[#E6D5B8]">
        <div className="h-6 bg-[#2b455a] rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-[#2b455a] rounded w-1/2 mb-6"></div>
        <div className="flex space-x-4">
          <div className="h-10 bg-[#2b455a] rounded w-1/3"></div>
          <div className="h-10 bg-[#2b455a] rounded w-1/3"></div>
          <div className="h-10 bg-[#2b455a] rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#355676] shadow-xl rounded-2xl p-6 text-[#E6D5B8]"
    >
      <h2 className="text-xl font-semibold">💳 Your Wallet</h2>
      <div className="mt-4">
        <p className="text-4xl font-extrabold">
          ৳{wallet?.balance ? wallet?.balance.toLocaleString() : 0}
        </p>
        <p className="text-sm mt-2">
          {wallet?.isBlocked ? (
            <span className="text-red-400 font-medium">🔒 Wallet is blocked</span>
          ) : (
            <span className="text-green-400 font-medium">✅ Wallet is active</span>
          )}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {(wallet?.user?.role === "agent" || wallet?.user?.role === "admin") && (
          <button
            onClick={onAddMoney}
            disabled={wallet?.isBlocked}
            className="w-full bg-gradient-to-r from-[#E6D5B8] to-[#C8A978] text-[#1c3144] font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-transform disabled:opacity-50"
          >
            ➕ Add Money to User
          </button>
        )}
        {
          wallet?.user?.role === 'user'?
          <button
          onClick={onWithdraw}
          disabled={wallet?.isBlocked}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-transform disabled:opacity-50"
        >
          💵 Withdraw
        </button> :
        <button
          onClick={onWithdraw}
          disabled={wallet?.isBlocked}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-transform disabled:opacity-50"
        >
          💵 Withdraw User Money
        </button>
        }
       {
        wallet?.user?.role === 'user' && 
         <button
          onClick={onSendMoney}
          disabled={wallet?.isBlocked}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-transform disabled:opacity-50"
        >
          📤 Send Money
        </button>
       }
      </div>
    </motion.div>
  );
};

export default WalletCard;
