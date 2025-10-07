

const UserInput = ({ userInput, setUserInput,handleInput }) => {
  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label>Initial Investment</label>
          <input type="number" required name="" value={userInput.initial} id="" onChange={(e) => { handleInput("initial", e.target.value) }} />
        </p>
        <p>
          <label> Annual Investment</label>
          <input type="number" required name="" id="" value={userInput.annual} onChange={(e) => { handleInput("annual", e.target.value) }} />
        </p>
      </div>
      <div className='input-group'>
        <p>
          <label>Expected Investment</label>
          <input type="number" onChange={(e) => { handleInput("expected", e.target.value) }} required name="" id=""
            value={userInput.expected} />
        </p>
        <p>
          <label>Duration</label>
          <input type="number" onChange={(e) => { handleInput("duration", e.target.value) }} required name="" id="" value={userInput.duration} />
        </p>
      </div>
    </section>
  )
}

export default UserInput