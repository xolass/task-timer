<template>
  <div class="flex items-start rounded-md border bg-white p-2">
    <input max="99" class="w-6 border-none text-center align-baseline font-medium outline-none" type="number" :value="hours"
      @input="updateHours($event as HtmlInputEvent)" placeholder="00" />
    <span class="flex items-start font-medium">:</span>
    <input max="60" class="w-7 border-none text-center font-medium outline-none" type="number" :value="minutes" @input="updateMinutes($event as HtmlInputEvent)"
      placeholder="00" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  hours: {
    type: String,
  },
  minutes: {
    type: String,
  }
})

const emits = defineEmits(['update:hours', 'update:minutes']);

const updateHours = (e: HtmlInputEvent) => {
  emits('update:hours', e.target?.value);
};

const updateMinutes = (e: HtmlInputEvent) => {
  emits('update:minutes', e.target?.value);
};


const { hours, minutes } = toRefs(props)
</script>