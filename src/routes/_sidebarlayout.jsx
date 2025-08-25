import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import useAuthStore from "../stores/authStore";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";
import UserName from "../pages/auth/UserName";
import VerifyingAuth from "../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_sidebarlayout")({
  beforeLoad: async ({ location }) => {
    const authState = useAuthStore.getState();

    // If we already have a rehydrated session, proceed immediately
    if (authState.isAuthenticated && authState.user) {
      return;
    }

    // If auth hasn't been initialized yet, wait for it to complete
    if (!authState.initialized) {
      await useAuthStore.getState().initializeAuth();
    }

    // If auth hasn't been checked yet, wait for it to complete
    if (!authState.authChecked) {
      await new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (state.authChecked || (state.isAuthenticated && state.user)) {
            unsubscribe();
            resolve();
          }
        });
        
        // Timeout after 1500ms to prevent long blocking
        setTimeout(() => {
          unsubscribe();
          resolve();
        }, 1500);
      });
    }
    
    // After auth check is complete, verify authentication
    const finalAuthState = useAuthStore.getState();
    
    if (!finalAuthState.isAuthenticated) {
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
  const authChecked = useAuthStore((state) => state.authChecked);
  const rehydrated = useAuthStore((state) => state.rehydrated);

  useEffect(() => {
    const os = detectSystem();
    setOperatingSystem(os);
  }, []);
  
  // Show loading screen only if we don't have a rehydrated session
  if ((loading || !authChecked || !isAuthenticated) && !rehydrated) {
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
