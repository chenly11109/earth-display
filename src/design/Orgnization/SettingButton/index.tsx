import React,{ useState } from 'react'
import './index.scss'
import { ReactComponent as SettingIcon } from './setting_button.svg'
import classNames from 'classnames'

export default function SettingButton({
  handleClick,
  className
} : {
  handleClick: (e: React.MouseEvent)=>void
  className?: string
}) {
  const [isHover, setHover] = useState(false)
  const [isMouseDown, setMouseDown] = useState(false)

  return (
    <div className={className}>
      <div className='settingButtonWrap'>
        <div className="settingButton"
          onMouseOver={()=>setHover(true)}
          onMouseLeave={()=>{setHover(false); setMouseDown(false)}}
          onMouseDown={()=>setMouseDown(true)}
          onClick={handleClick}
        >
          <SettingIcon className='settingButton__icon' />
        </div>
        <div className={classNames(
          "settingButtonPrompt", 
          isHover && 'settingButtonPrompt--active',
          isMouseDown && 'settingButtonPrompt--fadeout'
          )}>Setting</div>
      </div>
    </div>
  )
}
