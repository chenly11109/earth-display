import React, { useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import { ReactComponent as TickIcon } from './tick.svg'
import { Member } from '../../../types/orgPage'

export default function ListItem({
  user,
  index,
  selectedList,
  handleSelect,
  gap,
  liHeight
} : {
  user: {
    logo: string
    positionId?: string
    userId: string
    userName: string
  }
  index: number,
  selectedList: Member[],
  handleSelect: (p: Member)=>void,
  gap: number,
  liHeight: number
}) {
  const [isHover, setHover] = useState(false)
  const uname = user.userName.split('#')[0]
  const randomString = `#${user.userName.split('#')[1]}`

  return (
    <li key={index}
      className='checkableList__li'
      onMouseOver={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      onMouseDown={()=>handleSelect(user)}
      style={{
        marginBottom: `calc(${gap}/1080*100vh)`,
        height: `calc(${liHeight}/1080*100vh)`,
      }}
    >
      {/* logo */}
      <div className="checkableList__li__logo">
        <img src={`https://reachplatform.s3.us-east-2.amazonaws.com/${user.logo}`} alt="" />
      </div>
      {/* username */}
      <span style={{color: "#fff"}}>{uname}</span>
      <span style={{color: '#939393'}}>{randomString}</span>
      {/* tick */}
      <TickIcon className={classNames(
        'checkableList__li__tick', 
        isHover && 'checkableList__li__tick--hover',
        selectedList.findIndex(u => u.userId===user.userId) >= 0 && 'checkableList__li__tick--active'
        )} 
      />
    </li>
  )
}
