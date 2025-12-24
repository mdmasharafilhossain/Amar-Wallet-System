import  { lazy } from "react";
import type { ISidebarItem } from "../types";


const UserDashboard = lazy(() => import("../pages/User/UserDashboard"));
const UserProfile = lazy(() => import("../pages/User/UserProfile"));
const Settings = lazy(() => import("../pages/Settings"));

export const userSidebarItems: ISidebarItem[] = [
  {
    items: [
      {
        title: "User Dashboard",
        url: "/user/dashboard",
        component: UserDashboard,
      },
      {
        title: "Manage Profile",
        url: "profile",
        component: UserProfile,
      },
      {
        title: "Settings",
        url: "settings",
        component: Settings,
      },
      {
        title: "Go To Home",
        url: "../",
        component: null,
      },
    ],
  },
];
