import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo } from '../features/todo/todoSlice'

export const Todos = () => {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  return (

    <>
      <div className='w-full bg-orange-500 text-white mt-10 font-bold text-20 flex justify-center p-3 '>To-Dos</div>
      {todos.map((todo) => (
        <li key={todo.id} className='bg-black text-white w-[600px] flex justify-between p-5 rounded-xl m-5 relative'>
          {todo.text}
          <button className='bg-blue-500 px-2 absolute right-6 bottom-2' onClick={() => dispatch(deleteTodo(todo.id))}>✏️</button>
          <button className='bg-red-500 px-2 absolute right-2 bottom-2' onClick={() => dispatch(deleteTodo(todo.id))}>X</button>

        </li>
      ))}
    </>

  )
}
