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
const selectedScene = ref(0);

const nakedEyeImage = computed(() => {
  return scenesData?.value?.[selectedScene.value]?.nakedEyeImage;
});

const lensSceneImage = computed(() => {
  return scenesData?.value?.[selectedScene.value]?.sceneImages?.[selectedLens?.value]?.image;
});

const mappedScenesData = computed(() => {
  return scenesData?.value?.map((scene, index) => {
    return {
      id: scene?.sceneName,
      value: index,
      nakedEyeImage: scene?.nakedEyeImage,
      sceneImages: scene?.sceneImages
    };
  });
});
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
      <div class="LensGuideModal__section LensGuideModal__section--lens-images h-w-full">
        <div class="h-w-full overflow-hidden">
          <BasePicture :image="nakedEyeImage?.responsiveImage" :focal-point="nakedEyeImage?.focalPoint" />
          <BasePicture
            :image="lensSceneImage?.responsiveImage"
            :focal-point="lensSceneImage?.focalPoint"
            :style="{
              position: 'absolute',
              top: 0
            }"
          />
        </div>
        <div class="LensGuideModal__footer flex-center-hv">
          <ActionsWrapper class="min-h-45" text="SCENE" is-opened>
            <RadioGroup v-model="selectedScene" class="flex gap-1" name="scene-group-1" :list="mappedScenesData">
              <template v-for="scene in mappedScenesData" :key="scene?.id" #[`radio(${scene?.id})`]="{ item, selected }">
                <div class="LensGuideModal__footer-image">
                  <BasePicture :image="item?.nakedEyeImage?.responsiveImage" />
                  <div
                    :class="[
                      'LensGuideModal__footer-overlay',
                      selected && 'LensGuideModal__footer-overlay--visible',
                      'h-w-full',
                      'absolute-top-left-0'
                    ]"
                  >
                    <IconsLandscape />
                  </div>
                </div>
              </template>
            </RadioGroup>
          </ActionsWrapper>
        </div>
      </div>
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

  &__footer {
    position: absolute;
    bottom: 0;
    padding: 2rem;
    width: inherit;

    &-image {
      height: 52px;
      width: 52px;
      border-radius: 0.25rem;
      overflow: hidden;
      position: relative;
    }

    &-overlay {
      color: white;
      display: none;
      z-index: 2;

      &--visible {
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(70deg,#5c0f99,#3449b8 60%,#1799e1);
        opacity: 0.7;
      }
    }
  }
}
</style>
