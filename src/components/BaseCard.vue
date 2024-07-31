<script setup lang="ts">
  defineProps({
    className: String
  })
</script>

<template>
  <div class="rounded-md shadow-md" :class="className">
    <slot></slot>
  </div>
</template>