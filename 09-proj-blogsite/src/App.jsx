
import React, { useState, useEffect } from 'react'
import { Header, Footer } from "./components"
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authslice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }


      })
      .finally(() => { setLoading(false) })
  }, [])



  return loading ? null :
   ( <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>)
}

export default App
