<script setup>
const displayModal = ref(false);
</script>

<template>
  <div>
    <button class="mt-2 ml-2 px-4 py-2 font-semibold bg-cyan-500 text-white rounded-full shadow-sm" @click="displayModal = true">
      Show Lens guide
    </button>
    <LensGuideModal v-if="displayModal" @close="displayModal = false" />
  </div>
</template>
