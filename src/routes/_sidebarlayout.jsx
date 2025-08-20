import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import useAuthStore from "../stores/authStore";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";
import UserName from "../pages/auth/UserName";
import VerifyingAuth from "../Reusables/VerifyingAuth";

const isAuthenticated = () => {
  const authData = useAuthStore.getState();
  return authData.isAuthenticated && !authData.loading;
};

export const Route = createFileRoute("/_sidebarlayout")({
  beforeLoad: async ({ location }) => {
    const authState = useAuthStore.getState();

    // If still loading, wait for auth to complete
    if (authState.loading) {
      await new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (!state.loading) {
            unsubscribe();
            resolve();
          }
        });
        
        // Timeout after 5 seconds to prevent infinite waiting
        setTimeout(() => {
          unsubscribe();
          resolve();
        }, 5000);
      });
    }
    
    // Check authentication after loading is complete
    if (!isAuthenticated()) {
      useAuthStore.getState().clearAuth();
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [operatingSystem, setOperatingSystem] = useState(null);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const os = detectSystem();
    setOperatingSystem(os);
  }, []);
  
  // Show loading screen while authentication is being verified
  if (loading || !isAuthenticated) {
    return <VerifyingAuth />;
  }
  
  const isMobile = operatingSystem === "android" || operatingSystem === "ios";
  
  // Check if user's displayName is null or empty
  const hasDisplayName = user?.displayName && user.displayName.trim() !== "";
  
  if (isMobile) {
    return <MobilePageModal operatingSystem={operatingSystem} />;
  }

  // Show UserName component if displayName is missing
  if (!hasDisplayName) {
    return <UserName />;
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
