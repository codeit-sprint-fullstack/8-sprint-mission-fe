import { useState } from 'react'

export default function useValidation(initialValue, validateFn) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const val = e.target.value
    setValue(val)
    const err = validateFn(val)
    setError(err)
  }

  return { value, setValue, error, onChange }
}
