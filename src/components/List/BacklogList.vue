<template>
  <div class="mt-10 flex flex-col gap-6 overflow-hidden">
    <ListHeader title="Backlog" />
    <Suspense>
      <template #default>
        <ul class="flex h-full flex-col gap-2 overflow-auto pr-2">
          <li v-for="todoItem in todoList" :key="todoItem.id">
            <TaskCard :todoItem="todoItem" />
          </li>
        </ul>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '@/providers/database';
import type { PropType } from 'vue';
import TaskCard from '../TodoComponents/TaskCard.vue';
import ListHeader from './ListHeader.vue';
defineProps({
  todoList: {
    type: Array as PropType<TodoItem[]>,
    required: true
  }
})
</script>