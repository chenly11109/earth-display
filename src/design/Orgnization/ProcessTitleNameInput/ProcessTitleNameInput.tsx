import React, {useState, useRef, useEffect} from 'react'
import './index.scss'
import classNames from 'classnames'
import { ReactComponent as Title } from './title.svg';

export default function ProcessTitleNameInput({
  isCompleted,
  handleChange,
  value,
  className
}: {
  isCompleted: boolean,
  value: string,
  handleChange: (value: string)=>void,
  className?: string
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
        console.log('输入不对')
        setCheckError(true)
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
    <>
      <div className={classNames({
        'ProcessTitleNameInput': true, 
        'ProcessTitleNameInput--clicked': clicked, 
        'ProcessTitleNameInput--hover': mouseOver && !clicked, 
        'ProcessTitleNameInput--next': isCompleted }, className)}
        onClick={()=>setClick(true)}
      >
        <Title className={classNames('ProcessTitleNameInput__svg', clicked && 'ProcessTitleNameInput__svg--clicked', mouseOver && !clicked && 'ProcessTitleNameInput--hover')}
          onMouseOver={()=>setOver(true)}
          onMouseLeave={()=>setOver(false)}
        />

        <input 
          className={classNames({
            'ProcessTitleNameInput__input': true, 
            'ProcessTitleNameInput__input--clicked': clicked,
            'ProcessTitleNameInput__input--next': isCompleted })} 
          value={value} 
          onMouseOver={()=>setOver(true)}
          onMouseLeave={()=>setOver(false)}
          onChange={change}
          disabled={isCompleted}
          onPaste={handlePaste}
          ref={inputEl}
          ></input>

        {/* 下划线 */}
        <div 
          style={{
            width: lineWidth,
            borderColor: checkError ? '#FF7474' : '#FFFFFF'
          }} 
          className={classNames({
            'ProcessTitleNameInput__line': true, 
            'ProcessTitleNameInput__line--clicked': clicked,
            'ProcessTitleNameInput__line--next': isCompleted,
          })}
          >
        </div>

        {/* check error 提示文字 */}
        <div 
          className="ProcessTitleNameInput__errorText"
          style={{
            opacity: checkError ? 1 : 0
          }}
        >
          Only letters(a-z), number(0-9), space are allowed
        </div>

      </div>
      
      
    </>
  )
}
