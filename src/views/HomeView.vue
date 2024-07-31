<template>
  <main class="m-auto flex min-h-dvh bg-primary-50">
    <div class="flex w-96 flex-col gap-12 p-8">
      <div class="flex h-fit flex-row justify-between gap-5">
        <input class="flex-1 rounded-md border p-2" v-model="newTodoItemTitle" placeholder="Add a todo" />
        <DueTimeInput v-model:hours="newTodoDueTimeHours" v-model:minutes="newTodoDueTimeMinutes" />
        <button @click="addTodoItem(newTodoItemTitle, dueTimeInMinutes)" class="rounded-md bg-primary-600 px-4 py-2 text-white">Add</button>
      </div>
      <Suspense>
        <template #default>
          <TodoList :todoList="todoList" />
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </main>
</template>


<script setup lang="ts">

import DueTimeInput from '@/components/DueTimeInput.vue';
import TodoList from '@/components/TodoComponents/List.vue';
import database, { type TodoItem } from '@/providers/database';
import { computed, onBeforeMount, ref } from 'vue';

const db = database()


const todoList = ref<TodoItem[]>([])
const newTodoItemTitle = ref('')
const newTodoDueTimeHours = ref('')
const newTodoDueTimeMinutes = ref('')
const dueTimeInMinutes = computed(() => calculateDueTimeToMinutes(Number(newTodoDueTimeHours.value), Number(newTodoDueTimeMinutes.value)))

async function fetchTodoList() {
  todoList.value = await db.getTodoList()
}

async function addTodoItem(title: string, dueTime: number) {
  const createdItem = await db.createTodoItem({ title, dueTime })
  todoList.value.push(createdItem)
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

onBeforeMount(() => {
  fetchTodoList()
})

</script>
