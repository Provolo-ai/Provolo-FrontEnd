import { create } from "zustand";
import { persist } from "zustand/middleware";
import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuthStore = create(persist((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  initialized: false,
  authChecked: false,
  initPromise: null,
  rehydrated: false,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
      error: null,
      authChecked: true,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Initialize auth listener
  initializeAuth: () => {
    // Prevent multiple initializations
    if (get().initialized) {
      return get().initPromise || Promise.resolve();
    }

    set({ initialized: true });

    // Create a promise that resolves when auth is fully initialized
    const initPromise = new Promise(async (resolve) => {
      try {
        // If we already have a persisted session, render immediately and verify in background
        const persistedSession = get().isAuthenticated && !!get().user;
        if (persistedSession) {
          set({ loading: false, authChecked: false });
          // fire and forget
          get().verifyAuthWithServer();
          resolve();
          return;
        }

        // First, try to verify with server (faster for returning users)
        const serverAuthResult = await get().verifyAuthWithServer();
        
        if (serverAuthResult) {
          resolve();
          return;
        }

        // If server auth failed, wait for Firebase auth
        const firebasePromise = new Promise((firebaseResolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            
            if (firebaseUser) {
              try {
                // Get Firebase ID token
                const idToken = await getIdToken(firebaseUser, true);

                // Send to server for cookie-based authentication
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  credentials: 'include',
                  body: JSON.stringify({ idToken })
                });

                if (response.ok) {
                  const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    emailVerified: firebaseUser.emailVerified,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    createdAt: firebaseUser.metadata.creationTime,
                    lastLoginAt: firebaseUser.metadata.lastSignInTime,
                  };

                  set({
                    user: userData,
                    isAuthenticated: true,
                    loading: false,
                    error: null,
                    authChecked: true,
                  });
                  firebaseResolve();
                } else {
                  throw new Error('Server authentication failed');
                }
              } catch (error) {
                set({
                  user: null,
                  isAuthenticated: false,
                  loading: false,
                  error: 'Authentication failed',
                  authChecked: true,
                });
                firebaseResolve();
              }
            } else {
              // Only sign out from server if we haven't already verified with server
              const currentState = get();
              if (!currentState.isAuthenticated) {
                await get().signOutFromServer();
              }
              set({
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
                authChecked: true,
              });
              firebaseResolve();
            }
          });

          // Cleanup function
          return unsubscribe;
        });

        await firebasePromise;
        resolve();
      } catch (error) {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: 'Authentication initialization failed',
          authChecked: true,
        });
        resolve();
      }
    });

    // Store the promise
    set({ initPromise });

    return initPromise;
  },

  // Verify authentication with server
  verifyAuthWithServer: async () => {
    // Keep loading state true during verification
    set({ loading: true });
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          set({
            user: data.data,
            isAuthenticated: true,
            loading: false,
            error: null,
            authChecked: true,
          });
          return true;
        }
      }
      
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        authChecked: true,
      });
      return false;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        authChecked: true,
      });
      return false;
    }
  },

  // Sign out from server
  signOutFromServer: async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      // no-op
    }
  },

  // Sign out
  signOut: async () => {
    try {
      // Sign out from server first
      await get().signOutFromServer();

      // Then sign out from Firebase
      await signOut(auth);

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        authChecked: true,
      });
    } catch (error) {
      set({ error: "Failed to sign out" });
      throw error;
    }
  },

  // Clear all auth data
  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      initialized: false,
      authChecked: false,
      initPromise: null,
      rehydrated: false,
    }),

  // Check if auth is ready (either authenticated or definitely not authenticated)
  isAuthReady: () => {
    const state = get();
    return state.authChecked && !state.loading;
  },
}), {
  name: 'auth-store',
  partialize: (state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }),
  onRehydrateStorage: () => (state) => {
    const hasSession = !!state?.user && !!state?.isAuthenticated;
    // If we have a session, make UI render immediately without blocking spinner
    set({ rehydrated: true, loading: hasSession ? false : true });
  },
}));

export default useAuthStore;
