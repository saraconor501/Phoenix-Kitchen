import { create } from "zustand";
import { db, auth } from "../../utils/firebase/firebase-config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const useCartStore = create((set, get) => ({
    cart: [],
    isLoading: false,
    error: null,

    loadCart: async () => {
        const user = auth.currentUser;
        if (!user) return;

        set({ isLoading: true });

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                set({ cart: userData.cart || [] });
            }
        } catch (error) {
            console.error("Ошибка загрузки корзины:", error);
            set({ error: "Не удалось загрузить корзину." });
        } finally {
            set({ isLoading: false });
        }
    },

    addToCart: async (product) => {
        const user = auth.currentUser;
        if (!user) return;

        set({ isLoading: true });

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let cart = userDocSnap.exists() ? userDocSnap.data().cart || [] : [];

            const existingItem = cart.find((item) => item.id === product.id);

            if (existingItem) {
                cart = cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                cart.push(product);
            }

            await updateDoc(userDocRef, { cart });

            set({ cart });
        } catch (error) {
            console.error("Ошибка добавления в корзину:", error);
            set({ error: "Не удалось добавить в корзину." });
        } finally {
            set({ isLoading: false });
        }
    },

    updateItemQuantity: (itemId, operation) => {
        set((state) => {
            const cart = state.cart.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity: operation === "+" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                    }
                    : item
            );
            return { cart };
        });
    },

    removeFromCart: async (productId) => {
        const user = auth.currentUser;
        if (!user) return;

        set({ isLoading: true });

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let cart = userDocSnap.exists() ? userDocSnap.data().cart || [] : [];
            cart = cart.filter((item) => item.id !== productId);

            await updateDoc(userDocRef, { cart });
            set({ cart });
        } catch (error) {
            console.error("Ошибка удаления из корзины:", error);
            set({ error: "Не удалось удалить товар из корзины." });
        } finally {
            set({ isLoading: false });
        }
    },

    clearCart: async () => {
        const user = auth.currentUser;
        if (!user) return;

        set({ isLoading: true });

        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { cart: [] });
            set({ cart: [] });
        } catch (error) {
            console.error("Ошибка очистки корзины:", error);
            set({ error: "Не удалось очистить корзину." });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useCartStore;