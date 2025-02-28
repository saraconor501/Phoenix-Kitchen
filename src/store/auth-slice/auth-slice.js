import { create } from "zustand";
import { auth } from "../../utils/firebase/firebase-config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  onAuthStateChanged
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
  user: null,
  isFetching: false,  // Состояние для загрузки
  isLoading: true,    // Состояние для отслеживания загрузки состояния аутентификации
  error: null,

  // Функция для установки пользователя
  setUser: (user) => set({ user }),

  // Регистрируем нового пользователя
  registerUser: async (email, password) => {
    set({ isFetching: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
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

  // Входим с помощью email и пароля
  loginUser: async (email, password) => {
    set({ isFetching: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
      return { success: true, user: userCredential.user };
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

  // Входим через Google
  loginWithGoogle: async () => {
    set({ isFetching: true, error: null });
    try {
      if (window.innerWidth > 768) {
        const result = await signInWithPopup(auth, googleProvider);
        set({ user: result.user });
      } else {
        await signInWithRedirect(auth, googleProvider);
      }
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

  // Выход из аккаунта
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

  // Следим за состоянием аутентификации
  observeAuthState: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, isLoading: false });  // При изменении состояния аутентификации обновляем store
    });
  }
}));

// Инициализируем наблюдателя за состоянием аутентификации
useAuthStore.getState().observeAuthState();

export default useAuthStore;