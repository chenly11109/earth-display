import React, { useRef, useState } from 'react'
import './index.scss'
import {ReactComponent as SearchIcon} from './search.svg'
import {ReactComponent as ForkIcon} from './fork.svg'
import { useTransition, animated } from '@react-spring/web'
import cn from 'classnames'
import { QuickConfig } from '../../../config/animation'

export default function SearchInput({
  placeholder,
  value,
  handleChange,
  size,
  className,
  width
} : {
  placeholder: string,
  value: string,
  handleChange: (value: string)=>void,
  size: 'small' | 'large',
  width: number
  className?: string
}) {
  const [isFocus, setFocus] = useState(false)
  const [isClick, setClick] = useState(false)
  const inputEl = useRef<HTMLInputElement>(null)

  function onChange(e: React.ChangeEvent<HTMLInputElement>){
    handleChange(e.target.value)
  }

  // 1 => size1    2 => size2
  const focusTransitions1 = useTransition(isClick && isFocus, {
    from: { opacity: 0.5, width: `calc(${width + 40} / 1080 * 100vh)`, height: 'calc(56 / 1080 * 100vh)' },
    enter: { opacity: 1, width: `calc(${width} / 1080 * 100vh)`, height: 'calc(36 / 1080 * 100vh)' },
    leave: { opacity: 0 },
    config: QuickConfig
  });
  const focusTransitions2 = useTransition(isClick && isFocus, {
    from: { opacity: 0.5, width: `calc(${width + 20} / 1080 * 100vh)`, height: 'calc(60 / 1080 * 100vh)' },
    enter: { opacity: 1, width: `calc(${width} / 1080 * 100vh)`, height: 'calc(40 / 1080 * 100vh)' },
    leave: { opacity: 0 },
    config: QuickConfig
  });

  function handleForkClick(){
    handleChange('')
    inputEl.current?.focus()
  }

  // size2的样式
  const searchInputWrap__icon = {
    width: 'calc(19/1080*100vh)',
    height: 'calc(19/1080*100vh)'
  }
  const searchInputWrap__input = {
    height: 'calc(40/1080*100vh)',
    borderRadius: 'calc(5/1080*100vh)',
    padding: 'calc(7/1080*100vh) calc(39/1080*100vh) calc(9/1080*100vh)',
    fontSize: 'calc(24/1080*100vh)',
    width: `calc(${width}/1080*100vh)`
  }
  const searchInputWrap__fork = {
    width: 'calc(40/1080*100vh)',
    height: 'calc(40/1080*100vh)',
    borderRadius: '0 calc(8/1080*100vh) calc(8/1080*100vh) 0',
  }
  const searchInputWrap__fork__icon = {
    width: 'calc(11/1080*100vh)',
    height: 'calc(11/1080*100vh)'
  }


  return (
    <>
      {
        size === 'small' ? 
        <div className={className}>
          <div className='searchInputWrap'>
            <SearchIcon className='searchInputWrap__icon' />
            <input type="text" 
              className={cn(
                'searchInputWrap__input', 
                isFocus && 'searchInputWrap__input--active'
              )}
              placeholder={placeholder}
              value={value}
              ref={inputEl}
              onFocus={()=>setFocus(true)}
              onBlur={()=>setFocus(false)}
              onMouseDown={()=>setClick(true)}
              onChange={onChange}
              style={{width: `calc(${width}/1080*100vh)`}}
            />
            {/* focus动画 */}
            {
              focusTransitions1(
                (styles, item) => 
                item && (
                  <animated.div
                    style={styles}
                    className={cn("searchInputWrap__focus")}
                  ></animated.div>
                )
              )
            }
            {/* 叉 */}
            <div className={cn("searchInputWrap__fork", value && 'searchInputWrap__fork--active')}
              onClick={handleForkClick}
            >
              <ForkIcon className='searchInputWrap__fork__icon' />
            </div>
          </div>
        </div>
        : size === 'large' ?
        <div className={className}>
          <div className='searchInputWrap'>
            <SearchIcon className='searchInputWrap__icon' style={searchInputWrap__icon} />
            <input type="text" 
              className={cn(
                'searchInputWrap__input', 
                isFocus && 'searchInputWrap__input--active'
              )}
              style={searchInputWrap__input}
              placeholder={placeholder}
              value={value}
              ref={inputEl}
              onFocus={()=>setFocus(true)}
              onBlur={()=>setFocus(false)}
              onMouseDown={()=>setClick(true)}
              onChange={onChange}
            />
            {/* focus动画 */}
            {
              focusTransitions2(
                (styles, item) => 
                item && (
                  <animated.div
                    style={styles}
                    className={cn("searchInputWrap__focus")}
                  ></animated.div>
                )
              )
            }
            {/* 叉 */}
            <div className={cn("searchInputWrap__fork", value && 'searchInputWrap__fork--active')}
              onClick={handleForkClick}
              style={searchInputWrap__fork}
            >
              <ForkIcon className='searchInputWrap__fork__icon' style={searchInputWrap__fork__icon} />
            </div>
          </div>  
        </div>
        : null
      }
    </>
  )
}
