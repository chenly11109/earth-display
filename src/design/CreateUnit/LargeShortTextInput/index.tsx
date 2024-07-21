import React, { useState } from 'react'
import './index.scss'
import cn from 'classnames'


export default function LargeShortTextInput({
  value,
  handleChange,
  width=600,
  height=48,
  className,
  maxlength,
  placeholder,
  regexp
} : {
  value: string
  handleChange: (value: string)=>void
  maxlength: number
  width?: number
  height?: number
  className?: string
  placeholder?: string
  regexp: RegExp
}) {
  const [isActive, setActive] = useState(false)
  const [isError, setError] = useState(false)
  const [timer, setTimer] = useState<undefined | NodeJS.Timeout>()

  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value
    if(value.length > maxlength) return

    if(regexp.test(value) || value === ''){
      handleChange(value)
      if(isError){
        setError(false)
      }
    } else {
      setError(true)
      clearTimeout(timer)
      setTimer(setTimeout(() => {
        setError(false)
      }, 1200))
    }
  }

  return (
    <div className={className}>
      <input type="text" 
        className={cn(
          'largeShortTextInput', 
          isActive && 'largeShortTextInput--active',
          isError && 'largeShortTextInput--error'
        )}
        style={{
          width: `calc(${width}/1080*100vh)`,
          height: `calc(${height}/1080*100vh)`
        }}
        placeholder={placeholder}
        onMouseDown={()=>setActive(true)}
        onBlur={()=>setActive(false)}
        value={value}
        onChange={onChange}
        onPaste={e => e.preventDefault()}
      />
    </div>
  )
}
