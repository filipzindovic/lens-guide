<script setup>
defineProps({
  hasClose: {
    type: Boolean,
    default: true
  }
});

defineOptions({
  inheritAttrs: false
});

defineEmits([
  'close'
]);
</script>

<template>
  <Teleport to="body">
    <div class="BaseModal h-w-full" v-bind="$attrs">
      <div class="BaseModal__container h-w-full">
        <button v-if="hasClose" class="BaseModal__close" @click="hasClose && $emit('close')">
          <span class="BaseModal__close-text">Close</span>
          <IconsExit class="BaseModal__close-icon" />
        </button>
        <div class="BaseModal__content">
          <slot />
        </div>
      </div>
      <div class="BaseModal__overlay h-w-full absolute-top-left-0" @click="hasClose && $emit('close')" />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.BaseModal {
  position: fixed;
  top: 0;
  z-index: 2;
  padding: $modal-top-spacing-default $modal-spacing-default $modal-spacing-default;

  @media screen and (max-width: $md-breakpoint) {
    padding: 0;
  }

  &__container {
    max-width: 1408px;
    margin: 0 auto;
  }

  &__content {
    position: relative;
    z-index: 2;
    background-color: $white;
    height: calc(100% - ($modal-spacing-default + $modal-top-spacing-default));
    overflow: auto;
    border-radius: 0.5rem;
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media screen and (max-width: $md-breakpoint) {
      height: 100%;
      border-radius: 0;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__close {
    position: relative;
    z-index: 3;
    display: block;
    margin-left: auto;
    margin-bottom: 0.75rem;
    color: $white;

    &-text {
      text-decoration: underline;
      text-underline-offset: 8px;
      text-decoration-color: rgba($off-black-color, 0.3);

      @media screen and (max-width: $md-breakpoint) {
        display: none;
      }
    }

    &-icon {
      display: none;

      @media screen and (max-width: $md-breakpoint) {
        display: block;
      }
    }

    @media screen and (max-width: $md-breakpoint) {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
    }
  }

  &__overlay {
    background-color: rgba($off-black-color, 0.81);
    z-index: 1;
  }
}
</style>
