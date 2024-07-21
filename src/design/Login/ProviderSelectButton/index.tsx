import React from 'react'
import './index.scss'

export default function ProviderSelectButton({
  name,
  icon,
  handleClick,
  className,
  marginBottom
} : {
  name: string,
  icon?: React.ReactNode
  handleClick: ()=>void
  className?: string
  marginBottom?: number
}) {
  return (
    <div className={className}>

        <div 
          className='providerSelectButton' 
          style={{marginBottom: `calc(${marginBottom}/1080*100vh)`}}
          onClick={handleClick}
        >
          
          {/* 文字 */}
          <div className="providerSelectButton__name">
            {name}
          </div>

          {/* icon */}
          {
            icon ? icon : 
            <div className="providerSelectButton__fakeIcon"></div>
          }


        </div>

    </div>

  )
}
