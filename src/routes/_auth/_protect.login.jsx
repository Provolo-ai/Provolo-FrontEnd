import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/auth/Login";
import useAuthStore from "../../stores/authStore";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const loading = useAuthStore((state) => state.loading);
  const initialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (loading && (!initialized || !isAuthenticated)) {
    return ( 
      <VerifyingAuth/>
    );
  }
  
  return <Login />;
}
