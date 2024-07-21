import React,{ useState } from 'react'
import './index.scss'
import ListItem from './ListItem'
import cn from 'classnames'
import { Member } from '../../../types/orgPage'

export default function CheckableList({
  list,
  selectedList,
  handleSelect,
  className,
  width,
  gap,
  liHeight
} : {
  list: Member[],
  selectedList: Member[],
  handleSelect: (u: Member)=>void,
  width: number
  gap: number
  liHeight: number
  className?: string
}) {
  const [isHover, setHover] = useState(false)

  return (
    <ul 
      className={cn(
        'checkableList', 
        className,
        isHover && list.length>10 && 'checkableList--scroll'
      )}
      style={{width: `calc(${isHover && list.length>10 ? (width+24) : width}/1080*100vh)`}}
      onMouseOver={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >
      {
        list.map((item,index) => {
          return (
            <ListItem 
              key={item.userId as string} 
              user={item}
              index={index} 
              selectedList={selectedList} 
              handleSelect={handleSelect} 
              gap={gap}
              liHeight={liHeight}
            />
          )
        })
      }
    </ul>
  )
}
