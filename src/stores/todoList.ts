import type { TodoItem } from '@/providers/database'
import database from '@/providers/database'
import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'

export const useTodoListStore = defineStore('todoList', () => {
  const list = ref<TodoItem[]>([])
  const db = database()

  async function setInitialState() {
    list.value = await db.getTodoList()
  }

  function addItem(item: TodoItem) {
    list.value.push(item)
  }

  function getList() {
    return list.value
  }

  function editItem(id: number, item: Omit<TodoItem, 'id'>) {
    const newList = list.value.map((currentItem) => {
      if (currentItem.id === id) {
        return { ...item, id }
      }
      return currentItem
    })
    list.value = newList
  }

  function removeItem(id: number) {
    const newList = list.value.filter((item) => item.id !== id)
    list.value = newList
  }

  onBeforeMount(async () => await setInitialState())

  return { setInitialState, getList, addItem, editItem, removeItem }
})
