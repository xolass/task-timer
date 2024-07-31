<template>
  <main class="flex m-auto min-h-screen min-w-screen bg-primary-50">
    <div class="flex flex-col w-96 p-8 gap-12">
      <div class="flex flex-row justify-between h-fit gap-5">
        <input class="rounded-md border px-2 py-2 flex-1" v-model="newTodoItemTitle" placeholder="Add a todo" />
        <button @click="addTodoItem(newTodoItemTitle)" class="bg-primary-600 px-4 py-2 rounded-md text-white">Add</button>
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

import TodoList from '@/components/TodoComponents/TodoList.vue';
import database, { type TodoItem } from '@/providers/database';
import { onBeforeMount, ref } from 'vue';

const db = database()
const todoList = ref<TodoItem[]>([])

async function fetchTodoList() {
  todoList.value = await db.getTodoList()
}


const newTodoItemTitle = ref('')


async function addTodoItem(title: string) {
  const createdItem = await db.createTodoItem({ title })
  todoList.value.push(createdItem)
  newTodoItemTitle.value = ''
}

onBeforeMount(() => {
  fetchTodoList()
})

</script>
