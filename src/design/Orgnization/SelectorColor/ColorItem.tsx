import React, { useState } from 'react'
import { ReactComponent as TickIcon } from './tick.svg'
import classNames from 'classnames'

export default function ColorItem({
  color,
  index,
  handleSelect,
  selectedColor,
  colors
} : {
  color: string,
  index: number,
  handleSelect: (color: string)=>void,
  selectedColor: string,
  colors: string[]
}) {
  const [isHover, setHover] = useState(false)
  const [isMouseDown, setMouseDown] = useState(false)
  function onSelect(index: number){
    handleSelect(colors[index])
  }
  return (
    <div 
      className="selectorColor__color" 
      key={index}
      style={{background: `${color}`}}
      onMouseDown={()=>onSelect(index)}
      onMouseOver={()=>setHover(true)}
      onMouseLeave={()=>{setHover(false); setMouseDown(false)}}
    >
      <TickIcon className={classNames('selectorColor__color__tick',selectedColor===color && 'selectorColor__color__tick--active' )} />
      <div 
        onMouseDown={()=>setMouseDown(true)}
        className={classNames(
          "selectorColor__color__circle", 
          isHover && !isMouseDown && 'selectorColor__color__circle--active'
          )}
      ></div>
    </div>
  )
}
