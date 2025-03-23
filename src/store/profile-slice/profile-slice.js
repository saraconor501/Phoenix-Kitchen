import { create } from "zustand";
import { db } from "../../utils/firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

export const useProfileStore = create((set) => ({
  userData: null,
  loading: false,
  error: null,

  fetchUserData: async (userId) => {
    set({ loading: true, error: null });
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        set({ userData: userDoc.data(), loading: false });
      } else {
        set({ error: "User not found", loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateUserData: async (userId, newData) => {
    set({ loading: true, error: null });
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: newData.name,
        });
      }

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, newData);

      set({ userData: newData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));