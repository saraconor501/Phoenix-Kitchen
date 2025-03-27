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
import { doc, setDoc, getDoc } from "firebase/firestore";
import { message } from "antd";

const googleProvider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({

  user: null,
  isFetching: false,
  isLoading: true,
  error: null,


  setUser: (user) => set({ user }),


  registerUser: async (email, password, additionalData = {}) => {
    set({ isFetching: true, error: null });

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("Ошибка: пользователь не найден после регистрации!");
      }

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: additionalData.name || 'User',
        email: user.email,
        phone: additionalData.phone || null,
        cart: [],
        orderHistory: [],
        favoriteDishes: [],
        location: {
          address: additionalData.address || "",
          coordinates: {
            lat: additionalData.lat || null,
            lng: additionalData.lng || null
          },
        },
        createdAt: new Date().toISOString(),
      });
      const userDocSnap = await getDoc(userDocRef);

      set({
        user: {
          uid: user.uid,
          email: user.email,
          ...userDocSnap.data()
        },
        isLoading: false
      });

      message.success('Регистрация прошла успешно!');
      return { success: true, user: userDocSnap.data() };
    } catch (error) {
      let errorMessage = "Ошибка при регистрации. Попробуйте снова.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Этот email уже зарегистрирован.";
          break;
        case "auth/invalid-email":
          errorMessage = "Некорректный email.";
          break;
        case "auth/weak-password":
          errorMessage = "Пароль должен содержать минимум 6 символов.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Операция не разрешена.";
          break;
        default:
          console.error("Неизвестная ошибка регистрации:", error);
      }

      set({ error: errorMessage, isLoading: false });
      message.error(errorMessage);
      return { success: false, error: errorMessage };
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
        await setDoc(userDocRef, {
          name: 'User',
          email: user.email,
          phone: null,
          cart: [],
          orderHistory: [],
          favoriteDishes: [],
          location: {
            address: "",
            coordinates: { lat: null, lng: null },
          },
          createdAt: new Date().toISOString(),
        });
      }

      set({
        user: {
          uid: user.uid,
          email: user.email,
          ...(userDocSnap.exists() ? userDocSnap.data() : {})
        },
        isLoading: false
      });


      message.success('Вход выполнен успешно!');
      return { success: true, user: userDocSnap.data() };
    } catch (error) {
      let errorMessage = "Ошибка при входе. Попробуйте снова.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Пользователь не найден.";
          break;
        case "auth/wrong-password":
          errorMessage = "Неверный пароль.";
          break;
        case "auth/invalid-email":
          errorMessage = "Некорректный email.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Слишком много попыток. Попробуйте позже.";
          break;
        case "auth/user-disabled":
          errorMessage = "Аккаунт отключен.";
          break;
        default:
          console.error("Неизвестная ошибка входа:", error);
      }

      set({ error: errorMessage, isLoading: false });
      message.error(errorMessage);
      return { success: false, error: errorMessage };
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
        return { success: true };
      }

      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || 'User',
          email: user.email,
          phone: user.phoneNumber || null,
          cart: [],
          orderHistory: [],
          favoriteDishes: [],
          location: {
            address: "",
            coordinates: { lat: null, lng: null },
          },
          createdAt: new Date().toISOString(),
        });
      }

      set({
        user: {
          uid: user.uid,
          email: user.email,
          ...(userDocSnap.exists() ? userDocSnap.data() : {})
        },
        isLoading: false
      });

      message.success('Вход через Google выполнен успешно!');
      return { success: true, user: userDocSnap.data() };
    } catch (error) {
      let errorMessage = "Ошибка при входе через Google.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage = "Вы закрыли окно входа.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Попытка входа отменена.";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage = "Аккаунт уже существует с другими учетными данными.";
          break;
        default:
          console.error("Неизвестная ошибка входа через Google:", error);
      }

      set({ error: errorMessage, isLoading: false });
      message.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isFetching: false });
    }
  },

  logoutUser: async () => {
    set({ isFetching: true });
    try {
      await signOut(auth);
      set({ user: null, isLoading: false });
      message.success('Вы успешно вышли из системы');
      return { success: true };
    } catch (error) {
      const errorMessage = "Ошибка при выходе из системы";
      console.error(errorMessage, error);
      message.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isFetching: false });
    }
  },


  observeAuthState: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ isLoading: true });

      if (!user) {
        set({ user: null, isLoading: false });
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        let userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'User'
        };

        if (userDocSnap.exists()) {
          userData = { ...userData, ...userDocSnap.data() };
        } else {
          await setDoc(userDocRef, {
            name: user.displayName || 'User',
            email: user.email,
            phone: user.phoneNumber || null,
            cart: [],
            orderHistory: [],
            favoriteDishes: [],
            location: {
              address: "",
              coordinates: { lat: null, lng: null },
            },
            createdAt: new Date().toISOString(),
          });
        }

        set({ user: userData, isLoading: false });
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        set({ isLoading: false });
      }
    });

    return unsubscribe;
  },

  clearError: () => set({ error: null }),
}));

const unsubscribe = useAuthStore.getState().observeAuthState();

export default useAuthStore;