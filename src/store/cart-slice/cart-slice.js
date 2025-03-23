import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, auth } from "../../utils/firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

const fetchCart = async () => {
    const user = auth.currentUser;


    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    return  userDocSnap.data().cart


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
        staleTime: 0,
        refetchOnWindowFocus: true, 
        refetchOnReconnect: true, 
        onSuccess: () => {
            
            console.log("Cart fetched successfully");
        }
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

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { cart, isLoading, addToCartMutation, removeFromCartMutation, refetch };
};