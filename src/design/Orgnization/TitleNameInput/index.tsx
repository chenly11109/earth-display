import React, { useEffect, useState } from 'react'
import './index.scss'
import { useTransition, animated } from '@react-spring/web'
import { QuickConfig, BouncyConfig } from '../../../config/animation'
import classNames from 'classnames'
import uuid from 'react-uuid'

export default function TitleNameInput({
  placeholder,
  handleChange,
  value,
  width,
  isError=false,
  correctError,
  maxlength,
  className,
  size='default'
} : {
  placeholder: string,
  value: string,
  handleChange: (value: string)=>void,
  width: number,
  isError?: boolean,
  correctError?: ()=>void,
  maxlength: number
  className?: string
  size?: 'default' | 'large'
}) {

  const [isClicked, setClicked] = useState(false)
console.log(size==='large')
  const focusTransitions = useTransition(isClicked, {
    from: { opacity: 0.5, width: `calc(${width + 20} / 1080 * 100vh)`, height: `calc(${size==='large' ? 60 : 56} / 1080 * 100vh)` },
    enter: { opacity: 1, width: `calc(${width} / 1080 * 100vh)`, height: `calc(${size==='large' ? 40 : 36} / 1080 * 100vh)` },
    leave: { opacity: 0, width: `calc(${width} / 1080 * 100vh)`, height: `calc(${size==='large' ? 40 : 36} / 1080 * 100vh)` },
    config: QuickConfig
  });
  const errorTransitions = useTransition(isError, {
    from: { width: `calc(${width + 20} / 1080 * 100vh)`, height: `calc(${size==='large' ? 72 : 68} / 1080 * 100vh)` },
    enter: { width: `calc(${width} / 1080 * 100vh)`, height: `calc(${size==='large' ? 40 : 36} / 1080 * 100vh)` },
    config: BouncyConfig
  });

  const [isTyping, setTyping] = useState(false)

  function change(e: React.ChangeEvent<HTMLInputElement>){
    // 限制输入字符不超过 maxlength ，并符合正则表达式
    const textLength = e.target.value.length
    if(textLength <= maxlength){
      // 正则表达式
      const regexp = /^[{\p{Letter}{0-9}\s}]+$/u
      if(regexp.test(e.target.value) || e.target.value === ''){
        if(isError){
          correctError && correctError()
          setTyping(true)
        }
        handleChange(e.target.value)
      }
    }
  }

  // uuid标识唯一输入框
  const id = uuid()
  
  // error的时候自动聚焦input
  useEffect(()=>{
    if(isError){
      const inputEl = document.getElementById(id)
      inputEl?.focus()
      setClicked(true)
    }
  }, [isError])

  return (
    <div className={classNames("titleNameInputWrap", className)}>
      <input type="text"
        id={id}
        className={classNames(
          'titleNameInputWrap__titleNameInput', 
          size==='large' && 'titleNameInputWrap__titleNameInput--large',
          (isClicked || isError) && 'titleNameInputWrap__titleNameInput--active',
          isTyping && 'titleNameInputWrap__titleNameInput--typing')}
        placeholder={placeholder}
        onClick={()=>setClicked(true)}
        onBlur={()=>setClicked(false)}
        value={value} 
        onChange={change}
        style={{width: `calc(${width}/1080*100vh)`, height: `${size==='large'? 40 : 36}/1080*100vh`}}
      />
      {
        focusTransitions(
          (styles, item) => 
          item && !isError && (
            <animated.div
              style={styles}
              className={classNames("titleNameInputWrap__focus")}
            ></animated.div>
          )
        )
      }
      {
        errorTransitions(
          (styles, item) => 
          item && (
            <animated.div
              style={styles}
              className={classNames("titleNameInputWrap__error", isError && 'titleNameInputWrap__error--flash')}
            ></animated.div>
          )
        )
      }
    </div>
  )
}
