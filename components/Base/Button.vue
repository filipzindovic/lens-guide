<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  }
});
const { validateValue } = useHelpers();

const validTypes = ['primary', 'secondary', 'swatch', 'no-style'];
const validatedType = computed(() => {
  return validateValue(validTypes, props.type);
});
</script>

<template>
  <button
    :class="[
      'BaseButton',
      validatedType && `BaseButton--${validatedType}`
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.BaseButton {
  font-size: inherit;
  cursor: pointer;
  color: inherit;

  &--primary {
    background-image: linear-gradient(70deg,#5c0f99,#3449b8 60%,#1799e1);
    color: white;
    font-weight: 500;
    border-radius: 0.25rem;
  }

  &--secondary {
    border: 1px solid $grey;
    border-radius: 0.5rem;
  }

  &--swatch {
    border-radius: 50%;
    height: 48px;
    width: 48px;
  }

  &--no-style {
    padding: 0;
    border: none;
    background-color: transparent;
  }
}
</style>
