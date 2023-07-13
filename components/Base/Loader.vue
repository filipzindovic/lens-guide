<template>
  <div class="BaseLoader h-w-full flex-center-hv text-center">
    <IconsSpinner class="BaseLoader__icon" />
  </div>
</template>

<style lang="scss" scoped>
.BaseLoader {
  &__icon {
    animation: loading-spinner 1s linear infinite;

    @keyframes loading-spinner {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
