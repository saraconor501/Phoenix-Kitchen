import { create } from "zustand";
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useProducts = create((set) => ({
  products: [],
  // Функция для получения продуктов из Firestore
  fetchProducts: async () => {
    try {
      // Путь: restaurants/ImpirePizza/menu
      const menuCollectionRef = collection(db, "restaurants", "KFC", "menu");
      const snapshot = await getDocs(menuCollectionRef);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ products });
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
    }
  }
}));

export default useProducts;