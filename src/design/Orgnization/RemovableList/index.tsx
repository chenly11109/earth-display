import React, { useRef, useState } from 'react'
import './index.scss'
import ListItem from './ListItem'
import cn from 'classnames'
import { Member } from '../../../types/orgPage'

export default function RemovableList({
  list,
  handleDelete,
  className,
  width,
  gap,
  liHeight
} : {
  list: Member[]
  handleDelete: (u : Member)=>void
  width: number
  gap: number
  liHeight: number
  className?: string
}) {
  const [isHover, setHover] = useState(false)

  // 解决最上面的member被遮挡的bug
  const ul = document.querySelector('.movableList')
  if(ul){
    if(list.length === 10){
      ul.scrollTop = 0
    }
  }

  return (
    <ul 
      className={cn(
        "movableList", 
        className,
        (isHover && list.length > 10) && "movableList--scroll"
      )}
      style={{
        width: `calc(${isHover && list.length > 10  ? (width+24) : width}/1080*100vh)`,
      }}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >
      {
        list.map((item,index) => {
          return (
            <ListItem 
              key={item.userId as string} 
              item={item} 
              index={index} 
              handleDelete={handleDelete} 
              gap={gap}
              liHeight={liHeight}
            />
          )
        })
      }
    </ul>
  )
}
