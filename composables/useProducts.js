import * as mockProductsData from '@/mock_products_data.json';

const config = useRuntimeConfig();
const { lensesInAllScenes } = useScenes();
const { PRODUCT_CONSTANTS } = useConstants();
const { filterListByNamedValue } = useHelpers();

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

  const availableLensesForScenes = computed(() => {
    const parts = productsData?.value?.renegades?.parts ?? [];
    const lenses = parts?.find(part => part?.skuPrefix === PRODUCT_CONSTANTS.lenses)?.options;

    return lenses?.filter(product => lensesInAllScenes.value.includes(product?.sku));
  });

  const uniqueTechList = computed(() => {
    const techList = availableLensesForScenes?.value?.map(item => item?.optionTech);

    return filterListByNamedValue(techList, 'tech');
  });

  const uniqueSwatchList = computed(() => {
    const swatchList = availableLensesForScenes?.value?.map(item => item?.swatchStyle);

    return filterListByNamedValue(swatchList, 'id');
  });

  return {
    fetchProductsData,
    uniqueTechList,
    uniqueSwatchList,
    availableLensesForScenes,
    productsDataIsLoading,
    productsData
  };
};
