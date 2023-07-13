<script setup>
defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  image: {
    type: Object,
    default: () => ({})
  },
  focalPoint: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
});

const objectPosition = computed(() => {
  if (typeof props?.focalPoint?.x === 'number' && typeof props?.focalPoint?.x === 'number') {
    return `${props.focalPoint?.x * 100}% ${props.focalPoint?.y * 100}%`;
  }

  return '50% 50%';
});
</script>

<template>
  <picture>
    <source
      :srcset="image?.srcSet"
      :sizes="image?.sizes"
    >
    <img
      class="BasePicture h-w-full"
      :src="image?.src"
      :alt="image?.alt"
      :style="{
        aspectRatio: image?.aspectRatio,
        objectPosition: `${objectPosition}`,
        width: `${width}`,
        height: `${height}`,
      }"
      v-bind="$attrs"
    >
  </picture>
</template>

<style lang="scss" scoped>
.BasePicture {
  object-fit: cover;
}
</style>
