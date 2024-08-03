<template>
  <div ref="editPopupTarget" class="relative">
    <BaseCard class="flex items-center justify-between gap-2 border bg-white px-4 pb-4 pt-6 hover:border-border" @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">
      <input class="flex-1 rounded-md border p-2 focus:outline-none" v-if="isEditing" v-model="newValue" />
      <span v-else class="truncate">
        {{ todoItem.title }}
      </span>
      <span class="absolute right-4 top-2.5 text-xs font-extralight text-secondary-200">{{ humanizedDuration }}</span>
      <PencilSquareIcon v-if="isHovering && !isEditing" class="size-4 shrink-0 text-zinc-900 hover:cursor-pointer hover:text-zinc-600"
        @click="isEditing = true" />
      <div v-else class="size-4"></div>
    </BaseCard>
    <!-- <EditPopup v-if="isEditing" @save="onSaveChanges" /> -->
  </div>
</template>


<script setup lang="ts">
const props = defineProps({
  todoItem: {
    type: Object as PropType<TodoItem>,
    required: true
  },
})

import type { TodoItem } from '@/providers/database';
import database from '@/providers/database';
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { onClickOutside } from '@vueuse/core';
import type { PropType } from 'vue';
import { computed, ref, toRefs } from 'vue';
import BaseCard from '../UI/BaseCard.vue';

const db = database()


const { todoItem } = toRefs(props);
const isHovering = ref(false)
const isEditing = ref(false)
const newValue = ref(todoItem.value.title)
const editPopupTarget = ref(null)
const humanizedDuration = computed(() => {
  const hours = Math.floor(todoItem.value.dueTime / 60) || 0
  const minutes = todoItem.value.dueTime % 60 || 0
  return `${hours}h ${minutes}m`
})

onClickOutside(editPopupTarget, () => isEditing.value = false)

function onSaveChanges() {
  db.editTodoItem(todoItem.value.id, { ...todoItem.value, title: newValue.value })
  todoItem.value.title = newValue.value
  isEditing.value = false
}

</script>