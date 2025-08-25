import { useEffect, useRef } from "react";
import useAuthStore from "../stores/authStore";

export const useAuthInit = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initialized = useAuthStore((state) => state.initialized);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    // Only initialize if not already initialized
    if (!initialized) {
      initializeAuth();
    }

    return () => {
      // Cleanup is now handled by the store itself
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [initializeAuth, initialized]);
};
