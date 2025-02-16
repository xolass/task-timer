export interface TodoItem {
  id: number
  title: string
  completedAt?: Date
  dueTime: number
}

export default function () {
  const TODO_LIST_KEY = 'todoList'
  const getCurrentTodoList = async () => JSON.parse(localStorage.getItem(TODO_LIST_KEY) ?? '[]')

  const createTodoItem = async (item: Omit<TodoItem, 'id'>) => {
    console.log({ item })
    const id = new Date().getTime()
    const currentTodoList = await getCurrentTodoList()
    const newItem = { ...item, id }

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify([...currentTodoList, newItem]))

    return newItem
  }

  const getTodoList = async (): Promise<Array<TodoItem>> => {
    return getCurrentTodoList()
  }

  const editTodoItem = async (id: number, item: Omit<TodoItem, 'id'>) => {
    const currentTodoList = await getCurrentTodoList()

    const newTodoList = currentTodoList.map((currentItem: TodoItem) => {
      if (currentItem.id === id) {
        return item
      }
      return currentItem
    })

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))

    return newTodoList
  }

  const deleteTodoItem = async (id: number) => {
    const currentTodoList = await getCurrentTodoList()

    const newTodoList = currentTodoList.filter((item: TodoItem) => item.id !== id)

    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))

    return newTodoList
  }

  const completeTodoItem = async (id: number) => {
    const currentTodoList = await getCurrentTodoList()

    const newTodoList = currentTodoList.map((item: TodoItem) => {
      if (item.id === id) {
        return { ...item, completedAt: new Date() }
      }
      return item
    })

    return localStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList))
  }

  return { createTodoItem, editTodoItem, getTodoList, deleteTodoItem, completeTodoItem }
}
