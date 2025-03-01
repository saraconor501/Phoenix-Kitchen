import { create } from "zustand";
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useNavat = create((set) => ({
  products: [], 
  isLoading: false, 
  error: null, 

  fetchProducts: async () => {
    set({ isLoading: true, error: null }); 

    try {
      const menuCollectionRef = collection(db, "restaurants", "Navat", "menu");
      const snapshot = await getDocs(menuCollectionRef);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ products, isLoading: false });

      
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      set({ error: "Не удалось загрузить продукты", isLoading: false });
    }
  },

}));

export default useNavat;