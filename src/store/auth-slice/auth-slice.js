import { create } from "zustand";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-config"; 

const googleProvider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
  user: null,
  isFetching: false,
  error: null,

  async registerUser(email, password) {
    try {
      set({ isFetching: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
    } catch (error) {
      // Обрабатываем разные ошибки Firebase
      if (error.code === "auth/email-already-in-use") {
        set({ error: "Этот email уже зарегистрирован. Попробуйте войти." });
      } else if (error.code === "auth/invalid-email") {
        set({ error: "Некорректный email." });
      } else if (error.code === "auth/weak-password") {
        set({ error: "Пароль должен содержать минимум 6 символов." });
      } else {
        set({ error: "Ошибка при регистрации. Попробуйте снова." });
      }
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  async loginUser(email, password) {
    try {
      set({ isFetching: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        set({ error: "Пользователь не найден. Проверьте email или зарегистрируйтесь." });
      } else if (error.code === "auth/wrong-password") {
        set({ error: "Неверный пароль." });
      } else {
        set({ error: "Ошибка при входе. Попробуйте снова." });
      }
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },

  async loginWithGoogle() {
    try {
      set({ isFetching: true, error: null });
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user });
    } catch (error) {
      set({ error: "Ошибка при входе через Google. Попробуйте снова." });
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },
}));

export default useAuthStore;