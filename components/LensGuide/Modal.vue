<script setup>
const { fetchScenesData, scenesDataIsLoading, scenesData } = useScenes();
const { fetchProductsData, productsDataIsLoading, productsData, availableLensesForScenes } = useProducts();

if (!scenesData?.value?.length) { fetchScenesData(); }
if (!productsData?.value?.renegades) { fetchProductsData(); }

const selectedLensColour = useState('selectedLensColour', '');
const selectedLensType = useState('selectedLensType', '');
const selectedScene = useState('selectedScene', () => 0);
const rangeValues = {
  min: 0,
  max: 100,
  allowedMin: 5,
  allowedMax: 95,
  default: 50,
  iconWidth: 56
};
const rangeValue = ref(rangeValues.default);
const isGrabbing = ref(false);

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

function handleRangeChange($event) {
  const value = $event?.target?.valueAsNumber ?? 0;

  if (value > rangeValues.allowedMax) {
    rangeValue.value = rangeValues.allowedMax;
    return rangeValues.allowedMax;
  }

  if (value < rangeValues.allowedMin) {
    rangeValue.value = rangeValues.allowedMin;
    return rangeValues.allowedMin;
  }

  rangeValue.value = value;
}

const selectedLens = computed(() => {
  const matchedLens = availableLensesForScenes?.value?.find(lens =>
    lens?.swatchStyle?.id === selectedLensColour.value && lens?.optionTech?.tech === selectedLensType.value
  );

  return matchedLens?.sku;
});

watch(() => availableLensesForScenes?.value, (value) => {
  if (value?.length) {
    selectedLensColour.value = availableLensesForScenes?.value?.[0]?.swatchStyle?.id;
    selectedLensType.value = availableLensesForScenes?.value?.[0]?.optionTech?.tech;
  }
});
</script>

<template>
  <BaseModal class="LensGuideModal">
    <BaseLoader v-if="scenesDataIsLoading || productsDataIsLoading" />
    <div v-else class="LensGuideModal__container h-full flex-center-hv">
      <div class="h-w-full LensGuideModal__section LensGuideModal__section--products">
        <LensGuideDetails />
      </div>
      <div class="LensGuideModal__section LensGuideModal__section--lens-images h-w-full">
        <div class="h-w-full overflow-hidden">
          <BasePicture :image="nakedEyeImage?.responsiveImage" :focal-point="nakedEyeImage?.focalPoint" />
          <BasePicture
            :image="lensSceneImage?.responsiveImage"
            :focal-point="lensSceneImage?.focalPoint"
            :style="{
              position: 'absolute',
              top: 0,
              clipPath: `polygon(${rangeValue}% 0px, 100% 0px, 100% 100%, ${rangeValue}% 100%)`
            }"
          />
          <div class="LensGuideModal__range h-w-full">
            <div class="LensGuideModal__range-icon" :style="{left: `calc(${rangeValue}% - ${rangeValues.iconWidth / 2}px)`}">
              <IconsGrab />
            </div>
            <input
              :class="[
                'LensGuideModal__range-input',
                isGrabbing && 'LensGuideModal__range-input--grabbing'
              ]"
              type="range"
              :value="rangeValue"
              :min="rangeValues.min"
              :max="rangeValues.max"
              @mousedown="isGrabbing = true"
              @mouseup="isGrabbing = false"
              @input="handleRangeChange"
            >
          </div>
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
$icon-width: 56px;

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

  &__range {
    position: absolute;
    top: 0;
    right: 0;

    &-input {
      width: inherit;
      height: inherit;
      cursor: grab;
      opacity: 0;

      &--grabbing {
        cursor: grabbing;
      }
    }

    &-icon {
      padding: 1rem;
      border-radius: 50%;
      background-color: rgba(white, 0.5);
      width: $icon-width;
      height: $icon-width;
      position: absolute;
      top: calc(50% - ($icon-width / 2));
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
