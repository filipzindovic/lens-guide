<script setup>
const { uniqueTechList, uniqueSwatchList } = useProducts();

const selectedLensChoice = ref(0);
const lensChoiceData = computed(() => {
  return [
    {
      id: 0,
      value: 0,
      text: 'LENS TYPE'
    },
    {
      id: 1,
      value: 1,
      text: 'LENS COLOUR'

    }
  ];
});

const selectedLensColour = useState('selectedLensColour', '');
const selectedLensType = useState('selectedLensType', '');
const selectedLens = useState('selectedLens', '');

const mappedUniqueTechList = computed(() => {
  return uniqueTechList?.value?.map(item => ({
    id: item?.tech,
    value: item?.tech
  }));
});

const mappedUniqueSwatchList = computed(() => {
  return uniqueSwatchList?.value?.map(item => ({
    id: item?.id,
    value: item?.id,
    styles: item?.styles
  }));
});

defineEmits(['tech']);
</script>

<template>
  <div class="LensGuideDetails">
    {{ selectedLens }}
    <RadioGroup
      v-model="selectedLensChoice"
      class="LensGuideModal__group LensGuideModal__group--lens-toggle"
      name="lens-choice-1"
      :list="lensChoiceData"
    >
      <template v-for="option in lensChoiceData" :key="option?.id" #[`radio(${option?.id})`]="{ item, selected }">
        <BaseButton class="w-full py-2" :type="selected ? 'primary' : ''">
          {{ item?.text }}
        </BaseButton>
      </template>
    </RadioGroup>

    <RadioGroup
      v-if="!selectedLensChoice"
      v-model="selectedLensType"
      class="LensGuideModal__group LensGuideModal__group--lens-type"
      name="lens-choice-1"
      :list="mappedUniqueTechList"
    >
      <template v-for="techItem in mappedUniqueTechList" :key="techItem?.id" #[`radio(${techItem?.id})`]="{ value, selected }">
        <BaseButton class="LensGuideModal__group-btn py-8" :type="selected ? 'primary' : 'secondary'">
          {{ value }}
        </BaseButton>
      </template>
    </RadioGroup>

    <RadioGroup
      v-else
      v-model="selectedLensColour"
      class="LensGuideModal__group LensGuideModal__group--lens-colour"
      name="lens-choice-1"
      :list="mappedUniqueSwatchList"
    >
      <template v-for="swatch in mappedUniqueSwatchList" :key="swatch?.id" #[`radio(${swatch?.id})`]="{ item, selected }">
        <BaseButton
          type="swatch"
          :style="item?.styles"
          :class="[
            selected && 'LensGuideModal__swatch--active'
          ]"
        />
      </template>
    </RadioGroup>
  </div>
</template>

<style lang="scss" scoped>
.LensGuideModal {

  &__group {
    display: grid;
    grid-auto-flow: column;

    &--lens-toggle {
      background: $grey-light;
      border-radius: 0.5rem;
      overflow: hidden;
      gap: 0.25rem;
      padding: 0.25rem;
    }

    &--lens-type {
      padding-top: 2rem;
      gap: 0.5rem;
    }

    &--lens-colour {
      padding-top: 2rem;
      gap: 0.5rem;
      grid-template-columns: repeat(6, 1fr);
      grid-auto-flow: row;
    }

    &-btn {
      width: 100%;
    }
  }

  &__swatch {
    &--active {
      outline: 2px solid $off-black-color;
      outline-offset: 2px;
    }
  }
}
</style>
