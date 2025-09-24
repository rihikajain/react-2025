import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserContext)
  function handleSubmit(e) {
    e.preventDefault()
    setUser({ username, password })
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text"
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input type="text" placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login