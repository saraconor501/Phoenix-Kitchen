import { create } from "zustand";
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useProducts = create((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const menuCollectionRef = collection(db, "restaurants", "KFC", "menu");
      const snapshot = await getDocs(menuCollectionRef);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ products, isLoading: false }); 
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      set({ isLoading: false })
    }
  }
}));

export default useProducts;