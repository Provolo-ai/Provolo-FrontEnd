import { create } from "zustand";
import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  initialized: false,

  // Actions
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
      error: null,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Initialize auth listener
  initializeAuth: () => {
    // Prevent multiple initializations
    if (get().initialized) {
      return () => {}; // Return empty unsubscribe function
    }
    
    set({ initialized: true });
    
    // Only call verifyAuthWithServer once during initialization
    get().verifyAuthWithServer();
    
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
            });

            console.log("User authenticated with server:", userData.uid);
          } else {
            throw new Error('Server authentication failed');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: 'Authentication failed',
          });
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
        });
        console.log("User not authenticated");
      }
    });

    return unsubscribe;
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
        console.log(data.data)
        if (data.data) {
          set({
            user: data.data,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return true;
        }
      }
      
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
      return false;
    } catch (error) {
      console.error('Server verification failed:', error);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
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
      console.error('Server signout error:', error);
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
      });
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
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
    }),
}));

export default useAuthStore;
