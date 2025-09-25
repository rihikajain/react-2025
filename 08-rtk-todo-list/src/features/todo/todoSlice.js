import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
  todos: []
}


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload
      }
      state.todos.push(todo)
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo)
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    }
  }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer