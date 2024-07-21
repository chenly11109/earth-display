import classNames from 'classnames'
import React from 'react'
import './index.scss'
import { ReactComponent as QuestionIcon } from './questionMark.svg'

export default function SmallPromptDescription({
  content,
  className,
  width,
  height
} : {
  content: React.ReactNode,
  className?: string
  width: number
  height: number
}) {
  return (
    <div className={className}>
      <div className="smallPromptDescriptionWrap">
        <div className='smallPromptDescriptionWrap__smallPromptDescription'>
          <QuestionIcon className='smallPromptDescriptionWrap__smallPromptDescription__questionIcon' />
        </div>
        <div 
          className="smallPromptDescriptionWrap__descriptionText"
          style={{width: `calc(${width + 2}/1080*100vh)`, height: `calc(${height}/1080*100vh)`}}
        >
          {content}
        </div>
      </div>
    </div>
  )
}
