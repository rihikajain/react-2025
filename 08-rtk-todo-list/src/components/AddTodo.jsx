import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

export const AddTodo = () => {

  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  function addTodoHandler(e) {
    e.preventDefault()
    dispatch(addTodo(input))
    setInput('')
    console.log(input)
  }

  return (
    <div>
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <input
          type="text"
          placeholder="Write Todo..."
          className="bg-black rounded-xl border border-gray-700 focus:border-orange-200 focus:ring-2 focus:ring-orange-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="rounded-xl px-3 py-1 bg-orange-500 text-white shrink-0">
          Add
        </button>
      </form>
    </div>
  )
}
