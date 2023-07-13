<script setup>
const displayModal = ref(false);
</script>

<template>
  <div>
    <BaseButton class="mt-2 ml-2 py-2 px-2" type="primary" @click="displayModal = true">
      Show Lens Guide
    </BaseButton>
    <LensGuideModal v-if="displayModal" @close="displayModal = false" />
  </div>
</template>
