import React, { useEffect, useState } from 'react'
import './index.scss'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import SettingButton from '../../../../design/Orgnization/SettingButton'
import { ReactComponent as NumberIcon } from './numberIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlusIcon } from './plus.svg'
import cn from 'classnames'

const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore

export default function Position() {
  const { positions, setPositionCreating } = useOrgSettingPageStore()


  // name是 captain 时的文字样式
  const captainStyle = {
    fontWeight: 400,
    background: 'linear-gradient(90deg, #FFEF61 0%, #FFC061 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent'
  }

  const navigate = useNavigate()
  // 点击setting的回调
  function handleSetting(e: React.MouseEvent){
    const settings = document.querySelectorAll('.position__ul__li__setting')
    const index = [...settings].findIndex(node => node.contains(e.target as Node))
    const posInfo = positions[index]
    navigate('/modal/organization/setting/pos_setting', {state: {...posInfo, index: index}})
  }

  // addPosition
  function createPosition(){
    setPositionCreating(true)
  }

  // 控制滚动条的出现
  const [isHover, setHover] = useState(false)

  return (
    <div className='position'>

      {/* position列表 */}
      <ul className={cn('position__ul', isHover && positions.length > 5 && 'position__ul--scroll')}
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      >
        {
          positions.map((p,index) => {
            return (
              <li className='position__ul__li' key={index}>
                {/* name */}
                <span style={
                  p.positionName === 'Captain' ? captainStyle : {color: p.color}
                }>{p.positionName}</span>
                {/* number */}
                <NumberIcon className='position__ul__li__number__icon' />
                <span className='position__ul__li__number'>
                  {p.members.length}
                </span>
                {/* setting */}
                <SettingButton handleClick={handleSetting} className='position__ul__li__setting' />
              </li>
            )
          })
        }
      </ul>

      {/* 按钮 */}
      <div 
        className="position__addPosition"
        onClick={createPosition}
      >
        <PlusIcon className='position__addPosition__icon' />
         New Position
      </div>


    </div>
  )
}
