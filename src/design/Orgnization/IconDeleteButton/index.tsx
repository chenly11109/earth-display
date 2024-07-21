import React, { useState } from 'react'
import './index.scss'
import { ReactComponent as TrashIcon } from './trash.svg'
import cn from 'classnames'

export default function IconDeleteButton({
  handleClick,
  className
} : {
  handleClick: ()=>void,
  className?: string
}) {
  const [isHover, setHover] = useState(false)
  const [isMouseDown, setMouseDown] = useState(false)

  return (
    <div className={cn("iconDeleteButtonWrap", className)}>
      <div className='iconDeleteButtonWrap__iconDeleteButton'
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>{setHover(false); setMouseDown(false)}}
        onMouseDown={()=>setMouseDown(true)}
        onClick={handleClick}
      >
        <TrashIcon className='iconDeleteButtonWrap__iconDeleteButton__icon' />
      </div>
      <div className={cn(
        "iconDeleteButtonWrap__prompt",
        isHover && 'iconDeleteButtonWrap__prompt--active',
        isMouseDown && 'iconDeleteButtonWrap__prompt--fadeout'
        )}>Delete</div>
    </div>
  )
}
