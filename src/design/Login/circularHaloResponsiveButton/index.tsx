import React, { useState } from 'react'
import './index.scss'
import { ReactComponent as ButtonIcon } from './svg/button.svg'
import { ReactComponent as TickHaloIcon } from './svg/tick_halo.svg'
import { ReactComponent as TickIcon } from './svg/tick.svg'
import cn from 'classnames'

export default function CircularHaloResponsiveButton({
  text,
  handleClick,
  className
} : {
  text?: string
  handleClick: ()=>void
  className?: string
}) {
  const [isHover, setHover] = useState(false)
  const [isClick, setClick] = useState(false)

  return (
    <div className={className}>

        <div className="circularHaloResponsiveButtonWrap">

          <div 
            className='circularHaloResponsiveButton'
            onClick={handleClick}
            onMouseOver={()=>setHover(true)}
            onMouseLeave={()=>{setHover(false); setClick(false)}}
            onMouseDown={()=>setClick(true)}
            onMouseUp={()=>setClick(false)}
          >

            {/* 按钮 */}
            <ButtonIcon 
              className='circularHaloResponsiveButton__button' 
              style={{
                opacity: isHover ? 0 : 1
              }}
            />

            {/* 箭头 */}
            <TickIcon className='circularHaloResponsiveButton__tick' 
              style={{
                opacity: isClick ? 0.5 : 1
              }}
            />

            {/* 箭头光晕 */}
            <TickHaloIcon 
              className='circularHaloResponsiveButton__tickHalo' 
              style={{
                opacity: isHover ? 0 : 1
              }}
            />

            {/* 按钮光晕 */}
            <div 
              className={cn(
                "circularHaloResponsiveButton__halo", 
                isHover && 'circularHaloResponsiveButton__halo--hover',
                isClick && 'circularHaloResponsiveButton__halo--click'
              )}
            ></div>

          </div>

          {/* 文字 */}
          <div className={cn("circularHaloResponsiveButtonWrap__text", isHover && !isClick && 'circularHaloResponsiveButtonWrap__text--hover')}>
            {text}
          </div>

        </div>

    </div>
  )
}
