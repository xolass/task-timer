<template>
  <div class="fixed inset-0 z-10 bg-primary-950/30"></div>
  <div class="absolute right-4 z-20 -mt-2">
    <button class="rounded-md bg-primary-600 px-4 py-2 text-white" @click="onSave">Save</button>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['save'])

function onSave() {
  emits('save')
}
</script>