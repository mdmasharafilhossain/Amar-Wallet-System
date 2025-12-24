

import { lazy } from "react";
import type { ISidebarItem } from "../types";
const AgentDashboard = lazy(() => import("../pages/Agent/AgentDashboard"));
const UserProfile = lazy(() => import("../pages/User/UserProfile"));
const Settings = lazy(() => import("../pages/Settings"));

export const agentSidebarItems: ISidebarItem[] = [
    
  {
    
    items: [
      {
        title: "Agent Dashboard",
        url: "/agent/dashboard",
        component: AgentDashboard
      },
      {
        title: "Manage Profile",
        url: "profile",
        component: UserProfile
      },
       {
        title: "Settings",
        url: "settings",
        component: Settings,
      },
      {
        title: "Go To Home",
        url: "../",
        component: null
      },
    ],
  },
];