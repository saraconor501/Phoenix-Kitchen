import { useQuery } from '@tanstack/react-query';
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const fetchProducts = async (restaurantId) => {
  if (!restaurantId) return [];
  const menuCollectionRef = collection(db, "restaurants", restaurantId, "menu");
  const snapshot = await getDocs(menuCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const useProducts = (restaurantId) => {
  return useQuery({
    queryKey: ['products', restaurantId], 
    queryFn: () => fetchProducts(restaurantId), 
    staleTime: 1000 * 60 * 5, 
    enabled: !!restaurantId, 
  });
};