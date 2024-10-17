import { useState } from 'react'

export const useField = (name,type, val='') => {
  const [value, setValue] = useState(val)

  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue('')

  return {
    name,
    value,
    reset,
    type,
    onChange,
    required: true
  }
}