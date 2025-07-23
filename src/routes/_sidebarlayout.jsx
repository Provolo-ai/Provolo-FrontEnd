import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import useAuthStore from "../stores/authStore";

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
  return (
    <>
      <div className="flex h-screen bg-gray-50 ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
