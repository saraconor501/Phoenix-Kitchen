import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase-config';
import { useQuery } from '@tanstack/react-query';

export const fetchRestaurants = async () => {
  const restaurantsCollectionRef = collection(db, 'restaurants');
  const snapshot = await getDocs(restaurantsCollectionRef);
  const restaurants = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const menuSnapshot = await getDocs(collection(db, 'restaurants', doc.id, 'menu'));
      const menu = menuSnapshot.docs.map((menuDoc) => ({ id: menuDoc.id, ...menuDoc.data() }));
      return { id: doc.id, ...doc.data(), menu };
    })
  );
  return restaurants;
};


export const addMenuItem = async (restaurantId, newItem) => {
  const menuCollectionRef = collection(db, 'restaurants', restaurantId, 'menu');
  await addDoc(menuCollectionRef, newItem);
};

export const deleteMenuItem = async (restaurantId, itemId) => {
  const itemDocRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
  await deleteDoc(itemDocRef);
};


export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 5, 
  });
};

