import { create } from "zustand";
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const useProducts = create((set) => ({
  products: [], 
  isLoading: false, 
  error: null, 

  fetchProducts: async () => {
    set({ isLoading: true, error: null }); 

    try {
      const cachedData = localStorage.getItem('cachedProducts');
      if (cachedData) {
        const { products, timestamp } = JSON.parse(cachedData);
        const isCacheValid = (Date.now() - timestamp) < 3600000; 

        if (isCacheValid) {
          set({ products, isLoading: false })
          return;
        }
      }
      const menuCollectionRef = collection(db, "restaurants", "ImpirePizza", "menu");
      const snapshot = await getDocs(menuCollectionRef);
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      localStorage.setItem('cachedProducts', JSON.stringify({
        products,
        timestamp: Date.now()
      }));


      set({ products, isLoading: false });
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      set({ error: "Не удалось загрузить продукты", isLoading: false });
    }
  },

  
  clearCache: () => {
    localStorage.removeItem('cachedProducts');
    set({ products: [] });
  }
}));

export default useProducts;