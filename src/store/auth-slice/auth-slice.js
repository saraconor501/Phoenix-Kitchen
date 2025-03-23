import { create } from "zustand";
import { auth, db } from "../../utils/firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc} from "firebase/firestore";

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

      if (!user) {
        throw new Error("Ошибка: пользователь не найден после регистрации!");
      }

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name:'User',
        email: user.email,
        phone: user.phoneNumber || null, 
        cart: [],
        orderHistory: [],
        favoriteDishes: [],
        location: {
          address: "",
          coordinates: { lat: null, lng: null },
        },
      });

      set({ user: { uid: user.uid, email: user.email }, isLoading: false });
    } catch (error) {
      let errorMessage = "Ошибка при регистрации. Попробуйте снова.";
      if (error.code === "auth/email-already-in-use") errorMessage = "Этот email уже зарегистрирован.";
      if (error.code === "auth/invalid-email") errorMessage = "Некорректный email.";
      if (error.code === "auth/weak-password") errorMessage = "Пароль должен содержать минимум 6 символов.";

      set({ error: errorMessage, isLoading: false });
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

      if (!user) {
        throw new Error("Ошибка: пользователь не найден после входа!");
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.warn("Документ пользователя отсутствует в Firestore, создаём новый...");
        await setDoc(userDocRef, {
          name:'User',
          email: user.email,
          phone: user.phoneNumber || null,
          cart: [],
          orderHistory: [],
          favoriteDishes: [],
          location: {
            address: "",
            coordinates: { lat: null, lng: null },
          },
        });
      }

      set({ user: { uid: user.uid, email: user.email, ...userDocSnap.data() }, isLoading: false });
    } catch (error) {
      let errorMessage = "Ошибка при входе. Попробуйте снова.";
      if (error.code === "auth/user-not-found") errorMessage = "Пользователь не найден.";
      if (error.code === "auth/wrong-password") errorMessage = "Неверный пароль.";

      set({ error: errorMessage, isLoading: false });
      console.error(error);
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
          name:'User',
          email: user.email,
          phone: user.phoneNumber || null,
          cart: [],
          orderHistory: [],
          favoriteDishes: [],
          location: {
            address: "",
            coordinates: { lat: null, lng: null },
          },
        });
      }

      set({ user: { uid: user.uid, email: user.email, ...userDocSnap.data() }, isLoading: false });
    } catch (error) {
      let errorMessage = "Ошибка при входе через Google.";
      if (error.code === "auth/popup-closed-by-user") errorMessage = "Вы закрыли окно входа.";
      if (error.code === "auth/cancelled-popup-request") errorMessage = "Попытка входа отменена.";

      set({ error: errorMessage, isLoading: false });
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  logoutUser: async () => {
    set({ isFetching: true });
    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      set({ isFetching: false });
    }
  },

  observeAuthState: () => {
    onAuthStateChanged(auth, async (user) => {
      set({ isLoading: true });

      if (!user) {
        set({ user: null, isLoading: false });
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let newUserData;
      if (userDocSnap.exists()) {
        newUserData = { uid: user.uid, email: user.email, ...userDocSnap.data() };
      } else {
        newUserData = { uid: user.uid, email: user.email };
        console.warn("Документ пользователя не найден в Firestore.");
      }

      set({ user: newUserData, isLoading: false });
    });
  },
}));

useAuthStore.getState().observeAuthState();

export default useAuthStore;