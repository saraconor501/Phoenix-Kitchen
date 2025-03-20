import { useQuery } from '@tanstack/react-query';
import { db } from "../../utils/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const fetchRestaurants = async () => {
  const menuCollectionRef = collection(db, "restaurants");
  const snapshot = await getDocs(menuCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'], 
    queryFn: fetchRestaurants, 
    staleTime: 1000 * 60 * 5, 
  });
};