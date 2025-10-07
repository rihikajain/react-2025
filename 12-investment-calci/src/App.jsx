import { Header } from "./componets/Header.jsx"
import Results from "./componets/Results.jsx"
import UserInput from "./componets/UserInput.jsx"
import React, { useState } from 'react'

function App() {
  const [userInput, setUserInput] = useState({
    initial: 10000,
    annual: 1200,
    expected: 6,
    duration: 10
  })
  const inputisValid = userInput.duration >= 1

  function handleInput(inputId, newValue) {
    setUserInput(prev => {
      return {
        ...prev,
        [inputId]: +newValue
      }
    })
  }



  return (
    <div>
      <Header />
      <UserInput userInput={userInput} setUserInput={setUserInput} handleInput={handleInput} />
      {!inputisValid && <p className="center">Please enter a duration greater than 0</p>}
      {inputisValid && <Results userInput={userInput} />}
    </div>


  )
}

export default App
