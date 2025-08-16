import { createFileRoute } from "@tanstack/react-router";
import Authentication from "../../pages/auth/Signup";
import useAuthStore from "../../stores/authStore";

export const Route = createFileRoute("/_auth/_protect/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const loading = useAuthStore((state) => state.loading);
  const initialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Show loading screen while authentication is being verified
  if (loading && (!initialized || !isAuthenticated)) {
    return (
      <VerifyingAuth />
    );
  }

  return <Authentication />;
}
