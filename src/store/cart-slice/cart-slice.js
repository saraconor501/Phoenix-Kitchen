import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, auth } from "../../utils/firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const useCartStore = create((set) => ({
    cart: [],
    isLoading: false,
    error: null,

   
    setCart: (cart) => set({ cart }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));

const fetchCart = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data()?.cart || [];
};

const updateCart = async (newCart) => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { cart: newCart });
};

export const useCart = () => {
    const queryClient = useQueryClient();
    const { cart, setCart, setLoading, setError } = useCartStore();

    const { isLoading, refetch } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            try {
                setLoading(true);
                const data = await fetchCart();
                setCart(data);
                return data;
            } catch (error) {
                setError(error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
    });

    const addToCartMutation = useMutation({
        mutationFn: async (product) => {
            let newCart = [...cart];
            const existingItem = newCart.find((item) => item.id === product.id);

            if (existingItem) {
                newCart = newCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: product.quantity } : item
                );
            } else {
                newCart.push(product);
            }

            await updateCart(newCart);
            return newCart;
        },
        onSuccess: (newCart) => {
            queryClient.setQueryData(["cart"], newCart);
            setCart(newCart);
        },
    });

    const removeFromCartMutation = useMutation({
        mutationFn: async (productId) => {
            const newCart = cart.filter((item) => item.id !== productId);
            await updateCart(newCart);
            return newCart;
        },
        onSuccess: (newCart) => {
            queryClient.setQueryData(["cart"], newCart);
            setCart(newCart);
        },
    });

    const clearCartMutation = useMutation({
        mutationFn: async () => {
            await updateCart([]);
            return [];
        },
        onSuccess: () => {
            queryClient.setQueryData(["cart"], []);
            setCart([]);
        },
    });

    return {
        cart,
        isLoading,
        addToCartMutation,
        removeFromCartMutation,
        clearCartMutation,
        refetch,
    };
};