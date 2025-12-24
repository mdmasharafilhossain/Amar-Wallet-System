



import React from "react";
import type { ISidebarItem } from "../types";

const AdminDashboard = React.lazy(() => import("../pages/Admin/AdminDashboard"));
const AgentManagement = React.lazy(() => import("../pages/Admin/AgentManagement"));
const TransactionList_Admin = React.lazy(() => import("../pages/Admin/TransactionList_Admin"));
const UserManagement = React.lazy(() => import("../pages/Admin/UserManagement"));
const WalletManagement = React.lazy(() => import("../pages/Admin/WalletManagement"));
const UserProfile = React.lazy(() => import("../pages/User/UserProfile"));

export const adminSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Admin Dashboard",
        url: "/admin/dashboard",
        component: AdminDashboard
      },
      {
        title: "User Management",
        url: "/admin/manage-user",
        component: UserManagement
      },
      {
        title: "Agent Management",
        url: "/admin/manage-agent",
        component: AgentManagement
      },
      {
        title: "Wallet Management",
        url: "/admin/manage-wallet",
        component: WalletManagement
      },
      {
        title: "All Trasactions",
        url: "/admin/transaction",
        component: TransactionList_Admin
      },
      {
        title: "Profile",
        url: "/admin/profile",
        component: UserProfile
      },
      {
        title: "Go To Home",
        url: "../",
        component: null
      },
    ],
  },
];