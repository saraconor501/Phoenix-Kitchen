import { create } from "zustand";

const useRestaurantStore = create((set) => ({
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
}));

export default useRestaurantStore;