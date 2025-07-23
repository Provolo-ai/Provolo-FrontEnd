// components/Sidebar.js
import React from "react";
import Esuola from "../assets/Daniel.png";
import Logo from "./Logo";
import { Link, useNavigate } from "@tanstack/react-router";
import useAuthStore from "../stores/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleSignOut = async () => {
    try {
      clearAuth();
      await signOut();
      navigate({ to: "/login", replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
      clearAuth();
      navigate({ to: "/login", replace: true });
    }
  };

  return (
    <div className="w-full sm:w-72 bg-white text-black h-screen flex flex-col p-6 border border-r-gray-200">
      <div className="flex items-center gap-3 mb-10 px-3 w-fit">
        <Logo />
        {/* <h1 className="text-xl font-bold">Optimiz</h1> */}
      </div>

      <div className="flex flex-col gap-4 text-black text-start">
        <Link to="/optimizer">Profile Optimizer</Link>
        <Link to="/proposal">
          Proposal Assistant
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset ml-auto">Soon</span>
        </Link>

        <button onClick={handleSignOut} className="text-left hover:text-gray-600 transition-colors">
          Sign Out
        </button>
      </div>

      {/* <a href="https://linktr.ee/danielafriheart" noreferrer noopener target='_blank' className="mt-auto text-sm text-black-200 flex gap-3">
                <img alt="Esuola Daniel" src={Esuola} className="size-10 rounded-full" />
                <div>
                    <p className='text-xs text-slate-600'>Built by</p>
                    <p className='font-bold h1'> Esuola Daniel </p>
                </div>
            </a> */}
    </div>
  );
};

export default Sidebar;
