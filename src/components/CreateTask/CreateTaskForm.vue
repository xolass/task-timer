<template>
  <div class="flex flex-row justify-between gap-5">
    <input class="flex-1 rounded-md border p-2" v-model="newTodoItemTitle" placeholder="Add a todo" />
    <DueTimeInput v-model:hours="newTodoDueTimeHours" v-model:minutes="newTodoDueTimeMinutes" />
    <button @click="addTodoItem(newTodoItemTitle, dueTimeInMinutes)" class="rounded-md bg-primary-600 px-4 py-2 text-white">Add</button>
  </div>
</template>

<script setup lang="ts">
import DueTimeInput from '@/components/CreateTask/DueTimeInput.vue';
import { computed, ref } from 'vue';

const newTodoItemTitle = ref('')
const newTodoDueTimeHours = ref('')
const newTodoDueTimeMinutes = ref('')
const dueTimeInMinutes = computed(() => calculateDueTimeToMinutes(Number(newTodoDueTimeHours.value), Number(newTodoDueTimeMinutes.value)))

const emits = defineEmits(['create:todoItem'])

async function addTodoItem(title: string, dueTime: number) {
  emits('create:todoItem', title, dueTime)
  resetInputs()
}

function resetInputs() {
  newTodoItemTitle.value = ''
  newTodoDueTimeHours.value = ''
  newTodoDueTimeMinutes.value = ''
}

function calculateDueTimeToMinutes(hours: number, minutes: number) {
  const normalizedHours = hours ?? 0
  const normalizedMinutes = minutes ?? 0

  return normalizedHours * 60 + normalizedMinutes
}
</script>