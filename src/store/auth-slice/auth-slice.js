import { create } from "zustand";
import { auth, db } from "../../utils/firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
  user: null,
  isFetching: false,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user }),


  registerUser: async (email, password) => {
    set({ isFetching: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        phone: user.phoneNumber || null,
        cart: [],
        orderHistory: [],
        favoriteDishes: [], 
        location: {
          address: "",
          coordinates: { lat: null, lng: null }
        }
      });

      set({ user });
    } catch (error) {
      let errorMessage = "Ошибка при регистрации. Попробуйте снова.";
      if (error.code === "auth/email-already-in-use") errorMessage = "Этот email уже зарегистрирован.";
      if (error.code === "auth/invalid-email") errorMessage = "Некорректный email.";
      if (error.code === "auth/weak-password") errorMessage = "Пароль должен содержать минимум 6 символов.";

      set({ error: errorMessage });
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  loginUser: async (email, password) => {
    set({ isFetching: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        set({ user: { uid: user.uid, email: user.email, ...userData } });
      } else {
        console.warn("Документ пользователя не найден в Firestore");
        set({ user: { uid: user.uid, email: user.email } });
      }

      return { success: true, user };
    } catch (error) {
      let errorMessage = "Ошибка при входе. Попробуйте снова.";
      if (error.code === "auth/user-not-found") errorMessage = "Пользователь не найден.";
      if (error.code === "auth/wrong-password") errorMessage = "Неверный пароль.";

      set({ error: errorMessage });
      console.error(error);
      return { success: false, error };
    } finally {
      set({ isFetching: false });
    }
  },

  loginWithGoogle: async () => {
    set({ isFetching: true, error: null });
    try {
      let result;
      if (window.innerWidth > 768) {
        result = await signInWithPopup(auth, googleProvider);
      } else {
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          phone: user.phoneNumber || null,
          cart: [],
          orderHistory: [],
          favoriteDishes: [], 
          location: {
            address: "",
            coordinates: { lat: null, lng: null }
          }
        });
      }

      set({ user: { uid: user.uid, email: user.email, ...userDocSnap.data() } });
    } catch (error) {
      let errorMessage = "Ошибка при входе через Google.";
      if (error.code === "auth/popup-closed-by-user") errorMessage = "Вы закрыли окно входа.";
      if (error.code === "auth/cancelled-popup-request") errorMessage = "Попытка входа отменена.";

      set({ error: errorMessage });
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  logoutUser: async () => {
    set({ isFetching: true });
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      set({ isFetching: false });
    }
  },


  addFavoriteDish: async (menuItemId) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        favoriteDishes: arrayUnion(menuItemId)
      });

      set((state) => ({
        user: { ...state.user, favoriteDishes: [...state.user.favoriteDishes, menuItemId] }
      }));
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
    }
  },


  removeFavoriteDish: async (menuItemId) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        favoriteDishes: arrayRemove(menuItemId)
      });

      set((state) => ({
        user: { ...state.user, favoriteDishes: state.user.favoriteDishes.filter(id => id !== menuItemId) }
      }));
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  },

  observeAuthState: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          set({ user: { uid: user.uid, email: user.email, ...userDocSnap.data() }, isLoading: false });
        } else {
          console.warn("Документ пользователя не найден в Firestore");
          set({ user: { uid: user.uid, email: user.email }, isLoading: false });
        }
      } else {
        set({ user: null, isLoading: false });
      }
    });
  }
}));


useAuthStore.getState().observeAuthState();

export default useAuthStore;