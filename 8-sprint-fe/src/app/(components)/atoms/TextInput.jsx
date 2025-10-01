import React from 'react'

const TextInput = ({name, title}) => {
  return (
    <div>
      <label htmlFor={name}>{title}</label>
      <input type="text" name={name} />
    </div>
  )
}

export default TextInput