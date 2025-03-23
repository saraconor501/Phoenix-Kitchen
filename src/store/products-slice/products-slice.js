import { useQuery } from '@tanstack/react-query';
import { db } from "../../utils/firebase/firebase-config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


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
    staleTime: 1000 * 60 * 5, // 5 минут
    enabled: !!restaurantId,
  });
};
const fetchFavoriteDishes = async (userId) => {
  if (!userId) return [];
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? userDocSnap.data().favoriteDishes : [];
};

export const useFavoriteDishes = (userId) => {
  return useQuery({
    queryKey: ['favoriteDishes', userId],
    queryFn: () => fetchFavoriteDishes(userId),
    staleTime: 1000 * 60 * 5, // 5 минут
    enabled: !!userId,
  });
};
export const saveOrRemoveFavoriteDish = async (userId, product, isProductSaved, restaurantId) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    const favoriteDishes = userData.favoriteDishes || [];

    let updatedFavorites;
    if (isProductSaved) {
      updatedFavorites = favoriteDishes.filter((item) => item.id !== product.id);
    } else {
      // Добавляем информацию о ресторане в избранное блюдо
      updatedFavorites = [...favoriteDishes, { ...product, restaurantId }];
    }

    await setDoc(userDocRef, { ...userData, favoriteDishes: updatedFavorites }, { merge: true });
  }
};