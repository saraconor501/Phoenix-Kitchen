import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, auth } from "../../utils/firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const fetchCart = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    return userDocSnap.exists() ? userDocSnap.data().cart || [] : [];
};

const updateCart = async (newCart) => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { cart: newCart });
};

export const useCart = () => {
    const queryClient = useQueryClient();

    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        staleTime: 0,  // Убираем кэширование
        refetchOnWindowFocus: true, // Перезапрашиваем при возврате на страницу
    });

    const addToCartMutation = useMutation({
        mutationFn: async (product) => {
            let newCart = [...cart];
            const existingItem = newCart.find((item) => item.id === product.id);

            if (existingItem) {
                newCart = newCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            } else {
                newCart.push(product);
            }

            await updateCart(newCart);
            return newCart;
        },
        onSuccess: (newCart) => queryClient.setQueryData(["cart"], newCart),
    });

    const removeFromCartMutation = useMutation({
        mutationFn: async (productId) => {
            const newCart = cart.filter((item) => item.id !== productId);
            await updateCart(newCart);
            return newCart;
        },
        onSuccess: (newCart) => queryClient.setQueryData(["cart"], newCart),
    });

    return { cart, isLoading, addToCartMutation, removeFromCartMutation, refetch };
};