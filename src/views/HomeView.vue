<template>
  <main class="m-auto flex min-h-dvh overflow-hidden bg-primary-50">
    <div class="flex max-h-dvh max-w-lg flex-col p-8">
      <CreateTaskForm @create:todoItem="addTodoItem" />
      <BacklogList :todoList="todoList" />
    </div>
  </main>
</template>


<script setup lang="ts">
import CreateTaskForm from '@/components/CreateTask/CreateTaskForm.vue';
import BacklogList from '@/components/List/BacklogList.vue';
import database, { type TodoItem } from '@/providers/database';
import { onBeforeMount, ref } from 'vue';

const db = database()


const todoList = ref<TodoItem[]>([])

async function fetchTodoList() {
  todoList.value = await db.getTodoList()
}


async function addTodoItem(title: string, dueTime: number) {
  const createdItem = await db.createTodoItem({ title, dueTime })
  todoList.value.push(createdItem)
}

onBeforeMount(() => {
  fetchTodoList()
})

</script>
