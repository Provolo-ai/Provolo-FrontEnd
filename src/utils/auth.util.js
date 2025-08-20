import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

/**
 * Listen to authentication state changes
 * This runs whenever user signs in/out
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is authenticated:", user.uid);
      callback({ user, isAuthenticated: true });
    } else {
      console.log("User is not authenticated");
      callback({ user: null, isAuthenticated: false });
    }
  });
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Make authenticated API requests using cookies
export const authenticatedFetch = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Always include cookies
  });

  if (response.status === 401) {
    // Authentication failed - redirect to login
    window.location.href = "/login";
    throw new Error("Authentication failed");
  }

  return response;
};

// Verify current authentication status with server
export const verifyAuthentication = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Authentication verification failed:', error);
    return false;
  }
};
