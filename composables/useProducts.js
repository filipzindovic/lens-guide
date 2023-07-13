import * as mockProductsData from '@/mock_products_data.json';

const config = useRuntimeConfig();

export const useProducts = () => {
  const productsData = useState('productsData', () => ({}));
  const productsDataIsLoading = ref(false);
  const fetchProductsData = async () => {
    try {
      productsDataIsLoading.value = true;

      const data = await $fetch(config.public.PRODUCTS_BASE_URL);

      if (data) {
        productsData.value = data;
      }

      productsDataIsLoading.value = false;
    } catch (error) {
      // CORS issues with api.. fallback to dummy data
      productsData.value = mockProductsData.default;
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
