import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import useAuthStore from "../stores/authStore";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";

const isAuthenticated = () => {
  // Get auth state from Zustand store
  const authData = useAuthStore.getState();
  const isAuth = authData.isAuthenticated;

  return isAuth;
};

export const Route = createFileRoute("/_sidebarlayout")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      // Clear any existing auth data
      useAuthStore.getState().clearAuth();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [operatingSystem, setOperatingSystem] = useState(null);
  
  useEffect(() => {
    const os = detectSystem();
    setOperatingSystem(os);
  }, []);
  
  const isMobile = operatingSystem === "android" || operatingSystem === "ios";
  
  if (isMobile) {
    return <MobilePageModal operatingSystem={operatingSystem} />;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50 ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
