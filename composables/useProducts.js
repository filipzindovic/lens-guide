import * as dummyData from '@/dummyData.json';

// const config = useRuntimeConfig();

export const useProducts = () => {
  const productsData = useState('productsData', () => ({}));
  const productsDataIsLoading = ref(false);
  const fetchProductsData = async () => {
    try {
      productsDataIsLoading.value = true;

      // const data = await $fetch(config.public.PRODUCTS_BASE_URL);
      const data = dummyData.default;

      if (data) {
        productsData.value = data;
      }

      productsDataIsLoading.value = false;
    } catch (error) {
      productsDataIsLoading.value = false;
      console.error(error);
    }
  };

  return {
    fetchProductsData,
    productsDataIsLoading,
    productsData
  };
};
