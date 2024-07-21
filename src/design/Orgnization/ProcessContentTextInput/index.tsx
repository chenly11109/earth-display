import React, { ChangeEvent, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import { ReactComponent as Title } from './title.svg';

export default function ProcessContentTextInput({
  value,
  handleChange,
  watchContentTextarea,
  className
}:{
  value: string,
  handleChange: (value: string)=>void,
  watchContentTextarea: ()=>void,
  className?: string
}) {

  const [mouseOver, setOver] = useState(false)
  const [textareaActive, setActive] = useState(false)
  const [mouseLeave, setMouseLeave] = useState(false)
  const [isClicked, setClick] = useState(false)
  const [promptValue, setPromptValue] = useState(0)

  const shouldShowPrompt = value.length >= 100 && value.length <= 150

  function onChange(e:ChangeEvent<HTMLTextAreaElement>){
    if(e.target.value.length > 150){
      return
    } else {
      handleChange(e.target.value)
      setPromptValue(150 - e.target.value.length)
    }
  }

  return (
      <div className={classNames('processContentTextInput', className )}
           onMouseOver={()=>{setOver(true); setMouseLeave(false)}}
           onMouseLeave={()=>{setOver(false); setMouseLeave(true)}}
           onClick={()=>{setClick(true); watchContentTextarea()}}
      >
        <div 
          className={classNames({
            "processContentTextInput__titleWrap": !isClicked,
            'processContentTextInput--hover': mouseOver && !isClicked,
            "processContentTextInput__titleWrap--clicked": isClicked })
          }
        >
          <Title className={classNames( mouseOver && 'processContentTextInput--hover')}/>
        </div>

        <div className="processContentTextInput__textareaWrap">
            <textarea 
            className={
              classNames({
                'processContentTextInput__textareaWrap__textarea': true, 
                'processContentTextInput__textareaWrap__textarea--active': textareaActive,
                'processContentTextInput__textareaWrap__textarea--hover': mouseOver && !isClicked,
                'processContentTextInput__textareaWrap__textarea--leave': mouseLeave && !isClicked,
                'processContentTextInput__textareaWrap__textarea--clicked': isClicked
              })
            }
              onClick={()=>setActive(true)}
              onBlur={()=>setActive(false)}
              onChange={onChange}
              value={value}
            ></textarea>
          {
            shouldShowPrompt ? 
              <div className={classNames("processContentTextInput__textareaWrap__prompt")}>
                Character limit: {promptValue}
              </div>
            : null
          }
        </div>
      </div>
  )
}