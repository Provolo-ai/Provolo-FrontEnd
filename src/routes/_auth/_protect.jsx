import { createFileRoute, redirect } from "@tanstack/react-router";
import useAuthStore from "../../stores/authStore";

export const Route = createFileRoute("/_auth/_protect")({
  beforeLoad: async () => {
    const authState = useAuthStore.getState();

    // If auth hasn't been initialized yet, wait for it to complete
    if (!authState.initialized) {
      await useAuthStore.getState().initializeAuth();
    }
    
    // Wait for auth to be checked if it hasn't been yet
    if (!authState.authChecked) {
      await new Promise((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (state.authChecked) {
            unsubscribe();
            resolve();
          }
        });
        
        // Timeout after 2 seconds
        setTimeout(() => {
          unsubscribe();
          resolve();
        }, 2000);
      });
    }
    
    // After auth check, redirect if already authenticated
    const finalAuthState = useAuthStore.getState();
    
    if (finalAuthState.isAuthenticated) {
      throw redirect({
        to: "/optimizer",
        replace: true,
      });
    }
  },
});
