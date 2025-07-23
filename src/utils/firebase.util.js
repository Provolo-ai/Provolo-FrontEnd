import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

// Retry function for Firestore operations with exponential backoff
export const retryFirestoreOperation = async (operation, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await operation();
      return true; // Success
    } catch (error) {
      console.error(`Firestore attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        console.error("All Firestore retry attempts failed");
        return false; // All retries failed
      }

      // Wait before retrying with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }
};

/**
 * Helper function to save newsletter subscription with retry
 * Checks if email exists and updates instead of duplicating
 */
export const saveNewsletterSubscription = async (db, email, userId, subscribed = true) => {
  const firestoreOperation = async () => {
    // Check if email already exists in newsletter collection
    const newsletterRef = collection(db, "newsletter");
    const q = query(newsletterRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Email exists, update the existing document
      const existingDoc = querySnapshot.docs[0];
      const docRef = doc(db, "newsletter", existingDoc.id);

      await updateDoc(docRef, {
        subscribed: subscribed,
        userId: userId,
        updatedAt: new Date(),
      });

      console.log("Newsletter subscription updated for existing email");
    } else {
      // Email doesn't exist, create new document
      await addDoc(collection(db, "newsletter"), {
        email: email,
        subscribed: subscribed,
        userId: userId,
        createdAt: new Date(),
      });

      console.log("New newsletter subscription created");
    }
  };

  const success = await retryFirestoreOperation(firestoreOperation);

  if (success) {
    console.log("Newsletter subscription saved/updated successfully");
  } else {
    console.warn("Failed to save/update newsletter subscription after all retries");
  }

  return success;
};
