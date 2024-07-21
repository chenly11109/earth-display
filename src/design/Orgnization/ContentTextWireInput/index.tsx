import React,{ useState } from 'react'
import cn from 'classnames'
import './index.scss'
import TextareaAutosize from 'react-textarea-autosize';

export default function ContentTextWireInput({
  value,
  handleChange,
  width,
  minRows=3,
  maxLength,
  className,
  placeholder
} : {
  value: string
  handleChange: (value: string)=>void
  width: number
  minRows?: number
  maxLength: number
  className?: string
  placeholder: string
}) {
  const [valueLength, setValueLength] = useState(value.length)
  const [isClicked, setClicked] = useState(false)  // 是否聚焦
  const [isClickOutside, setClickOutside] = useState(true)  // 是否点击外面

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    if(e.target.value.length > maxLength){
      return
    } else {
      handleChange(e.target.value)
      setValueLength(e.target.value.length)
    }
  }


  return (
    <div className={className}>
      <div className={cn('contentTextWireInputWrap', isClicked && !isClickOutside && 'contentTextWireInputWrap--active')}
        onBlur={()=>setClickOutside(true)}
        style={{width: `calc(${width}/1080*100vh)`}}
      >

        <TextareaAutosize 
          className='contentTextWireInputWrap__textarea' 
          value={value} 
          onChange={onChange}
          onClick={()=>{setClicked(true); setClickOutside(false)}}
          onBlur={()=>setClicked(false)}
          placeholder={placeholder}
          minRows={minRows}
        />

        <div 
          className={cn(
            "contentTextWireInputWrap__prompt",
            !isClickOutside && 'contentTextWireInputWrap__prompt--show'
          )}
          onClick={e=>e.preventDefault()}
          style={{
            color: valueLength===maxLength ? '#FF7D7D' : 'rgba(255, 255, 255, 0.7)'
          }}
        >
          {valueLength} / {maxLength}
        </div>
        
      </div>
    </div>
  )
}
