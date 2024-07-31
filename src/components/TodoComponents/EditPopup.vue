<template>
  <div class="fixed inset-0 bg-primary-950/30 z-10"></div>
  <div class="absolute z-20 right-4 -mt-2">
    <button class="bg-primary-600 px-4 py-2 rounded-md text-white" @click="onSave">Save</button>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['save'])

function onSave() {
  emits('save')
}
</script>