<template>
  <div class="flex w-full items-center justify-center rounded-t-lg bg-primary-700 py-4 text-center">
    <span class="text-white">
      {{ title }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>