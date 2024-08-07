import React, { useRef } from 'react'

export default function Start({ setUsername }) {
  const inputRef = useRef()

  const startGame = () => {
    inputRef.current.value && setUsername(inputRef.current.value)

  }
  return (

    <div className="start">
      <input
        type="text"
        className='input-control usernameInput'
        ref={inputRef} onKeyDown={(e) => e.key === "Enter" ?
        setUsername(inputRef.current.value) : null}
        placeholder='Enter Your Name'
      />

      <button className="btn btn-primary btn-sm" onClick={startGame}>Start</button>
    </div>

  )
}
