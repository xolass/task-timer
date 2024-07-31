<template>
  <ul class="flex flex-col gap-2">
    <li v-for="todoItem in todoList" :key="todoItem.id">
      <TodoCard :todoItem="todoItem" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TodoCard from '@/components/TodoComponents/TodoCard.vue';
import type { TodoItem } from '@/providers/database';
import { type PropType } from 'vue';

defineProps({
  todoList: {
    type: Array as PropType<TodoItem[]>,
    required: true
  }
})

</script>