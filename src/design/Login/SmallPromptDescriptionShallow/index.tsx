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
      <div className="smallPromptDescriptionWrapShallow">
        <div className='smallPromptDescriptionWrapShallow__smallPromptDescription'>
          <QuestionIcon className='smallPromptDescriptionWrapShallow__smallPromptDescription__questionIcon' />
        </div>
        <div 
          className="smallPromptDescriptionWrapShallow__descriptionText"
          style={{width: `calc(${width}/1080*100vh)`, height: `calc(${height}/1080*100vh)`}}
        >
          {content}
        </div>
      </div>
    </div>
  )
}
