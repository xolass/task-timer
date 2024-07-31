<template>
  <div ref="editPopupTarget" class="relative">
    <BaseCard class="bg-white p-4 flex justify-between items-center border hover:border-border gap-8" @mouseenter="isHovering = true"
      @mouseleave="isHovering = false">
      <input class="rounded-md border px-2 py-2 flex-1 focus:outline-none" v-if="isEditing" v-model="newValue" />
      <span v-else class="overflow-ellipsis whitespace-nowrap overflow-hidden">
        {{ todoItem.title }}
      </span>
      <PencilSquareIcon v-if="isHovering && !isEditing" class="size-4 text-zinc-900 shrink-0 hover:cursor-pointer hover:text-zinc-600"
        @click="isEditing = true" />
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
import { ref, toRefs } from 'vue';
import BaseCard from '../BaseCard.vue';

const db = database()


const { todoItem } = toRefs(props);
const isHovering = ref(false)
const isEditing = ref(false)
const newValue = ref(todoItem.value.title)
const editPopupTarget = ref(null)

onClickOutside(editPopupTarget, () => isEditing.value = false)

function onSaveChanges() {
  db.editTodoItem(todoItem.value.id, { ...todoItem.value, title: newValue.value })
  todoItem.value.title = newValue.value
  isEditing.value = false
}

</script>