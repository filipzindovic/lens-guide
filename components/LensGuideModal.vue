<script setup>
const { PRODUCT_CONSTANTS } = useConstants();
const { fetchScenesData, scenesDataIsLoading, scenesData } = useScenes();
const { fetchProductsData, productsDataIsLoading, productsData } = useProducts();

if (!scenesData?.value?.length) { fetchScenesData(); }
if (!productsData?.value?.renegades) { fetchProductsData(); }

const lensData = computed(() => {
  const parts = productsData?.value?.renegades?.parts ?? [];
  const lenses = parts?.find(part => part?.skuPrefix === PRODUCT_CONSTANTS.lenses);

  return lenses?.options ?? [];
});
const selectedLens = ref(lensData?.value?.[0]?.sku);
</script>

<template>
  <BaseModal class="LensGuideModal">
    <BaseLoader v-if="scenesDataIsLoading || productsDataIsLoading" />
    <div v-else class="LensGuideModal__container h-full flex-center-hv">
      <div class="h-w-full LensGuideModal__section LensGuideModal__section--products">
        <select id="products" v-model="selectedLens">
          <option v-for="lens in lensData" :key="lens?.id" :value="lens?.sku">
            {{ lens?.name }}
          </option>
        </select>
      </div>
      <div class="LensGuideModal__section LensGuideModal__section--lens-images h-w-full"></div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>

.LensGuideModal {
  &__container {
    @media screen and (max-width: $md-breakpoint) {
      flex-direction: column-reverse;
    }
  }

  &__section {
    position: relative;

    &--products {
      flex: 1 1 40%;
      padding: 1rem;
    }

    &--lens-images {
      flex: 1 1 60%;
    }

    @media screen and (max-width: $md-breakpoint) {
      flex: 1 1 50%;
      height: 50%
    }
  }
}
</style>
