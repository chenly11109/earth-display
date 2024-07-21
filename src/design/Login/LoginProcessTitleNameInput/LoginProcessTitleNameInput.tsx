import React, {useState, useRef, useEffect} from 'react'
import './index.scss'
import classNames from 'classnames'
import { ReactComponent as Title } from './enter_here.svg';
import SmallPromptDescription from '../SmallPromptDescriptionShallow';
import cn from 'classnames'

export default function LoginLoginProcessTitleNameInput({
  isCompleted,
  handleChange,
  value,
  className,
  hoverRegist
}: {
  isCompleted: boolean,
  value: string,
  handleChange: (value: string)=>void,
  className?: string
  hoverRegist: boolean
}) {
  const [clicked, setClick] = useState(false)
  const [mouseOver, setOver] = useState(false)
  const [lineWidth, setLine] = useState('calc(512 / 1080 * 100vh)')
  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    inputEl.current?.focus();
  }, [clicked])

  // format check动画相关
  const [checkError, setCheckError] = useState(false)
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null)

  function change(e: React.ChangeEvent<HTMLInputElement>){
    // 限制输入字符不超过40个，并符合正则表达式
    const textLength = e.target.value.length
    if(textLength <= 40){
      // 正则表达式
      const regexp = /^[{\p{Letter}{0-9}\s}]+$/u
      if(regexp.test(e.target.value) || e.target.value === ''){
        setCheckError(false)
        handleChange(e.target.value)
      } else {
        setCheckError(true)
        if(timer){
          clearTimeout(timer)
        }
        setTimer(setTimeout(() => {  // 1800ms无输入操作自动消失
          setCheckError(false)
        }, 1800))
      }
    }
    // 根据内容宽度调整下划线的长度
    const textWidth = getTextWidth(e.target.value)
    if(textWidth > 160 && textWidth < 476){
      setTimeout(() => {  // 500ms延时
        setLine(textWidth * 0.3 + 'vh')
      }, 500);
    } else if(textWidth <= 160){
      setTimeout(() => {  // 500ms延时
        setLine('calc(512/1080*100vh)')
      }, 500);
    }
  }
  /**获取input里字符串内容的宽度 */
  function getTextWidth(str: string) {
    const dom = document.createElement('span');
    dom.style.display = 'inline-block';
    dom.textContent = str;
    document.body.appendChild(dom);
    const width = dom.clientWidth;
    document.body.removeChild(dom);
    return width;
  }

  // 粘贴禁用
  function handlePaste(e: any){
    e.preventDefault();
  }

  return (
    <div className='LoginProcessTitleNameInputWrap'>
      <div className={classNames({
        'LoginProcessTitleNameInput': true, 
        'LoginProcessTitleNameInput--clicked': clicked, 
        'LoginProcessTitleNameInput--hover': mouseOver && !clicked, 
        'LoginProcessTitleNameInput--next': isCompleted }, className)}
        onClick={()=>setClick(true)}
      >
        <Title className={classNames('LoginProcessTitleNameInput__svg', clicked && 'LoginProcessTitleNameInput__svg--clicked', mouseOver && !clicked && 'LoginProcessTitleNameInput--hover')}
          onMouseOver={()=>setOver(true)}
          onMouseLeave={()=>setOver(false)}
        />

        <input 
          className={classNames({
            'LoginProcessTitleNameInput__input': true, 
            'LoginProcessTitleNameInput__input--clicked': clicked,
            'LoginProcessTitleNameInput__input--next': isCompleted })} 
          value={value} 
          onMouseOver={()=>setOver(true)}
          onMouseLeave={()=>setOver(false)}
          onChange={change}
          disabled={isCompleted}
          onPaste={handlePaste}
          ref={inputEl}
          ></input>

        {/* 下划线和小提示 */}
        <div className="LoginProcessTitleNameInput__lineWrap"
          style={{
            width: lineWidth,
            opacity: hoverRegist ? 0.1 : 1
          }}
        >
          <div 
            style={{
              width: lineWidth,
              borderColor: checkError ? '#FF7474' : '#FFFFFF'
            }} 
            className={classNames({
              'LoginProcessTitleNameInput__line': true, 
              'LoginProcessTitleNameInput__line--clicked': clicked,
              'LoginProcessTitleNameInput__line--next': isCompleted,
            })}
            >
          </div>
          {
            clicked ? 
            <SmallPromptDescription 
              width={384}
              height={124} 
              content={
                <>
                  <div>Decentralized collaboration practice</div>
                  <div>requires cryptography pseudonym.</div>
                  <div>Please avoid using your real information</div>
                  <div>anywhere on this platform.</div>
                </>
              }  
              className={cn('LoginProcessTitleNameInput__prompt', isCompleted && 'LoginProcessTitleNameInput__prompt--completed')}
            />
            : null
          }
        </div>

        {/* check error 提示文字 */}
        <div 
          className="LoginProcessTitleNameInput__errorText"
          style={{
            opacity: checkError ? 1 : 0,
            visibility: checkError ? 'visible' : 'hidden'
          }}
        >
          Only letters(a-z), number(0-9) are allowed
        </div>

      </div>
      
      
    </div>
  )
}
