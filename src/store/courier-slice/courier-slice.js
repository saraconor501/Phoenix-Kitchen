import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";


export const fetchCourier = async() => {
    const courierCoollectionRef = collection(db, 'couriers');
    const snapshot = await getDocs(courierCoollectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}