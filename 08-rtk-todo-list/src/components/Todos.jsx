import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from '../features/todo/todoSlice'

export const Todos = () => {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState('');
  const [editId, setEditId] = useState(null);


  const handleEdit=(todo)=>{
    setInputText(todo.text)
    setEditId(todo.id)
  }
  
const handleUpdate=(e)=>{
  e.preventDefault()
  if(editId && inputText.trim()){
      dispatch(updateTodo({id:editId, text:inputText}))
      setEditId(null)
      setInputText('')
  }

}

  return (

    <>



      <div className='w-full bg-orange-500 text-white mt-10 font-bold text-20 flex justify-center mb-2 p-3'>To-Dos</div>
      {editId && (<form onSubmit={handleUpdate} className='flex items-center justify-center mt-5'>
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className='border p-2 rounded w-[400px] mr-2'
            placeholder="Edit your todo"
            autoFocus
          /><button
            type="button"
            className='bg-white text-orange-500 border-2 border-orange-500 px-4 py-1 rounded ml-2'
            onClick={() => { setEditId(null); setInputText(''); }}
          >
            Cancel
          </button>
          <button type="submit" className='bg-orange-500 ml-2  border-2 border-orange-500  text-white px-4 py-1 rounded'>Update</button>
          
        </form>)}

      {todos.map((todo) => (
        <li key={todo.id} className='bg-black text-white w-[600px] min-h-10 flex justify-between p-2 rounded m-2 relative '>
          {todo.text}
          <button className='bg-blue-500 rounded px-1 absolute right-8 bottom-2' onClick={() => handleEdit(todo)}>✏️</button>
          <button className='bg-red-500 px-2 rounded absolute right-2 bottom-2' onClick={() => dispatch(deleteTodo(todo.id))}>X</button>

        </li>
      ))}
    </>

  )
}
