<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  list: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [Number, String],
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

function handleSelection(value) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="RadioGroup">
    <label v-for="item in list" :key="item?.id" class="RadioGroup__label" :for="item?.id">
      <input
        :id="item?.id"
        class="RadioGroup__input"
        type="radio"
        :name="name"
        :value="item?.value"
        @change="handleSelection(item?.value)"
      >
      <slot
        :name="`radio(${item?.id})`"
        :selected="item?.value === modelValue"
        :value="item?.value"
        :item="item"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
.RadioGroup {
  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  &__label {
    cursor: pointer;

    :deep(button) {
      pointer-events: none;
    }
  }
}
</style>
