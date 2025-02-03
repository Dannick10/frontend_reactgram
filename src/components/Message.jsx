import React from 'react'
import './Message.css'

const Message = ({msg, type}) => {
    console.log({msg})
    console.log("ola")
  return (
    <div className={`message ${type}`}>
        <p>{msg}</p>
    </div>
  )
}

export default Message