<script setup>
const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
});

const isOpened = ref(props.isOpened);

function handleClick() {
  isOpened.value = !isOpened.value;
}
</script>

<template>
  <div class="ActionsWrapper flex">
    <button v-if="!isOpened" class="ActionsWrapper__button flex-center-hv" @click="handleClick">
      <span>
        <IconsLandscape />
      </span>
      <span>
        {{ text }}
      </span>
    </button>
    <div v-else class="flex">
      <slot />
      <button class="ActionsWrapper__button flex-center-hv" @click="handleClick">
        <IconsExit class="ActionsWrapper__button--icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ActionsWrapper {
  background-color: $white;
  border-radius: 0.5rem;
  padding: 0.25rem;

  &__button {
    gap: 0.5rem;
    color: $off-black-color;
    font-size: 0.75rem;
    padding: 0.5rem;

    &--icon {
      transform: scale(0.75);
    }
  }
}
</style>
