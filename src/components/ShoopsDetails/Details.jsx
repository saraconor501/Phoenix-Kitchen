import { useState, useEffect, useCallback, useMemo } from "react";
import { getAuth } from "firebase/auth";
import { useQueryClient } from '@tanstack/react-query';
import { useProducts, useFavoriteDishes, saveOrRemoveFavoriteDish } from "../../store/products-slice/products-slice";
import CardSkeleton from "../Card-Skeleton/Card-Skeleton";
import ModalWindow from "../ModalWindow/ModalWindow";
import { message } from 'antd';
import main from "./Details.module.css";
import ProductCard from "./ProductCard/ProductCard";


const Cards = ({ restaurantId, filterCategory, searchQuery = '' }) => {
  const { data: products, isLoading, error } = useProducts(restaurantId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [savedProducts, setSavedProducts] = useState({});
  const auth = getAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const { data: favoriteDishes } = useFavoriteDishes(auth.currentUser?.uid);

  useEffect(() => {
    if (favoriteDishes) {
      const savedProductsState = favoriteDishes.reduce((acc, product) => {
        acc[product.id] = true;
        return acc;
      }, {});
      setSavedProducts(savedProductsState);
    }
  }, [favoriteDishes]);

  const filteredProducts = useMemo(() => {
    let filtered = products || [];

    if (!restaurantId) {
      const allRestaurants = queryClient.getQueryData(['restaurants']) || [];
      filtered = allRestaurants.flatMap(restaurant =>
        restaurant.menu?.filter(item =>
          filterCategory ? item?.category?.includes(filterCategory) : true
        ) || []
      );
    }
    else {
      if (filterCategory === "Избранные") {
        filtered = favoriteDishes
          ?.filter((fav) => fav.restaurantId === restaurantId)
          .map((fav) => products?.find((product) => product.id === fav.id))
          .filter((product) => product !== undefined)
      } else if (filterCategory && filterCategory !== "Все") {
        filtered = products?.filter((item) =>
          item?.category?.includes(filterCategory)
        );
      }
    }

    if (searchQuery) {
      filtered = filtered?.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered || [];
  }, [products, filterCategory, favoriteDishes, restaurantId, searchQuery, queryClient]);

  const openModal = useCallback((product) => {
    if (!auth.currentUser) {
      messageApi.open({
        type: 'warning',
        content: 'Для добавления в корзину или просмотра товара, пожалуйста, зарегистрируйтесь',
      });
      return;
    }
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, [auth.currentUser, messageApi]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleAddToCart = useCallback((product) => {
    if (!auth.currentUser) {
      messageApi.open({
        type: 'warning',
        content: 'Для добавления в корзину или просмотра товара, пожалуйста, зарегистрируйтесь.',
      });
      return;
    }
    openModal(product);
  }, [auth.currentUser, messageApi, openModal]);

  const handleSaveProduct = useCallback(async (product) => {
    if (!auth.currentUser) {
      messageApi.open({
        type: 'warning',
        content: 'Для сохранения товара, пожалуйста, зарегистрируйтесь.',
      });
      return;
    }

    const isProductSaved = savedProducts[product.id];
    setSavedProducts((prev) => ({
      ...prev,
      [product.id]: !isProductSaved,
    }));

    try {
      await saveOrRemoveFavoriteDish(auth.currentUser.uid, product, isProductSaved, restaurantId);

      queryClient.setQueryData(['favoriteDishes', auth.currentUser.uid], (oldData) => {
        if (!oldData) return oldData;

        if (isProductSaved) {
          return oldData.filter((item) => item.id !== product.id);
        } else {
          return [...oldData, { ...product, restaurantId }];
        }
      });
    } catch (error) {
      setSavedProducts((prev) => ({
        ...prev,
        [product.id]: isProductSaved,
      }));
      messageApi.error("Ошибка при сохранении продукта:", error);
    }
  }, [auth.currentUser, messageApi, queryClient, savedProducts, restaurantId]);
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      {contextHolder}
      <>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
          : filteredProducts?.length > 0
            ? filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                isSaved={savedProducts[item.id]}
                onSaveProduct={handleSaveProduct}
                onAddToCart={handleAddToCart}
                onOpenModal={openModal}
              />
            ))
            : <>
              <div></div>
              <div className={main.notFound}>Не найдено</div>
              <div></div>
            </>}
      </>

      {isModalOpen && selectedProduct && (
        <ModalWindow product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default Cards;