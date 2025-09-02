// components/Sidebar.js
import React from "react";
import Logo from "./Logo";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import useAuthStore from "../stores/authStore";
import {
  Book,
  Feather,
  LibraryBig,
  LogOut,
  Recycle,
  Sparkles,
} from "lucide-react";
import Feedback from "./Feedback";
import UserProfile from "../pages/user/User";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  const signOut = useAuthStore((state) => state.signOut);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    try {
      clearAuth();
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      clearAuth();
    } finally {
      navigate({ to: "/login", replace: true });
    }
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `p-3 flex items-center gap-3 rounded-md transition-all duration-300 ${isActive(path)
      ? "bg-gray-50 text-gray-900"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-950"
    }`;

  // Main navigation links
  const navItems = [
    {
      to: "/optimizer",
      icon: <Sparkles size={20} />,
      label: "Optimize My Profile",
    },
    {
      to: "/proposal",
      icon: <Feather size={20} />,
      label: "Ai Proposals",
      badge: { text: "New", color: "green" },
    },
    {
      to: "/resume",
      icon: <Recycle size={20} />,
      label: "Resume Generator",
      // badge: { text: "Soon", color: "blue" },
    },
  ];

  // Upskill section
  const upskillItems = [

    {
      to: "/learn",
      icon: <LibraryBig size={20} />,
      label: "Provolo Learn",
    },
    {
      to: "https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation",
      icon: <Book size={20} />,
      label: "Docs",
      external: true,
    },
  ];

  const renderBadge = (badge) => {
    if (!badge) return null;
    const colors = {
      green: "bg-green-50 text-green-700 ring-green-600/10",
      blue: "bg-blue-50 text-blue-700 ring-blue-600/10",
    };
    return (
      <span
        className={`ml-auto inline-flex items-center rounded-md px-2 py-1 text-xs ring-1 ring-inset ${colors[badge.color]}`}
      >
        {badge.text}
      </span>
    );
  };

  const renderLink = ({ to, icon, label, badge, external }) => {
    if (external) {
      return (
        <Link
          key={label}
          target="_blank"
          to={to}
          className="p-3 flex items-center gap-3 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-all duration-300"
        >
          {icon}
          {label}
        </Link>
      );
    }
    return (
      <Link key={label} to={to} className={linkClass(to)}>
        {icon}
        {label}
        {renderBadge(badge)}
      </Link>
    );
  };

  return (
    <div className="w-full sm:w-72 bg-white h-screen flex flex-col p-6 border-r border-gray-200 text-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-3 w-fit">
        <Logo />
        Provolo
      </div>

      {/* <div className=""> */}
      <UserProfile />
      {/* </div> */}

      {/* Navigation */}
      <div className="flex flex-col gap-2 h-full">
        {navItems.map(renderLink)}

        {/* Upskill Section */}
        <p className="text-xs mt-10 pl-4 text-gray-500">Provolo Upskill</p>
        <span className="border border-gray-100" />
        {upskillItems.map(renderLink)}

        <span className="border mt-auto border-gray-100" />

        <Feedback />

        <span className="border border-gray-100" />

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="text-left text-red-400 transition-all duration-300 rounded-md p-3 flex items-center gap-3 hover:bg-red-50"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
