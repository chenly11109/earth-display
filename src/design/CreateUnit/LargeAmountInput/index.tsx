import React,{ useEffect, useRef, useState } from 'react'
import './index.scss'
import cn from 'classnames'

const regexp = /^[0-9]*$/

export default function LargeAmountInput({
  value,
  handleChange,
  minWidth=400,
  className,
  maxLength
} : {
  value: string
  handleChange: (v: string)=>void
  minWidth?: number
  className?: string
  maxLength?: number
}) {

  // 挂载的时候重新初始化长度
  useEffect(()=>{
    setWidth(span.current?.clientWidth + 100)
    setLineWidth(span.current?.clientWidth + 100)
  }, [])  

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    const value = e.target.value.replace(/,/g, '')
    if(maxLength){
      if(value.length > maxLength) return
    }
    if(regexp.test(value)){
      if(isError) setError(false)
      setProcessedValue(numberWithCommas(value))
      handleChange(value)
      setWidth(span.current?.clientWidth + 100)
      setTimeout(() => {
        setLineWidth(span.current?.clientWidth + 100)
      }, 500);
    } else {
      setError(true)
      if(timer){
        clearTimeout(timer)
      }
      setTimer(setTimeout(() => {  // 1800ms内无输入操作自动消失
        setError(false)
      }, 1800))
    }
  }

  // 处理：value加逗号，用于展示
  function numberWithCommas(x: string) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [processedValue,setProcessedValue] = useState(numberWithCommas(value))

  // 宽度响应式
  const span = useRef(null)
  const [width, setWidth] = useState(0)
  const [lineWidth, setLineWidth] = useState(0)

  // 报错文字
  const [isError, setError] = useState(false)
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null)


  return (
    <div className={className}>
      <div style={{position: 'relative', width: 'fit-content'}}>
        <textarea 
          className='largeAmountInput'
          style={{minWidth: `calc(${minWidth}/1080*100vh)`, width: `${width}px`}}
          value={processedValue}
          onChange={onChange}
        >
        </textarea>

        {/* 下划线 */}
        <div className="largeAmountInputLine" 
          style={{
            minWidth: `calc(${minWidth}/1080*100vh)`, 
            width: `${lineWidth}px`,
            borderColor: isError ? '#FF7474' : '#fff'
          }}></div>

        {/* 提示文字 */}
        <div className={cn("largeAmountInputMsg", isError && 'largeAmountInputMsg--active')}>
          Only number(0-9) are allowed
        </div>

        <span className='toGetTextWidth' ref={span}>
          {processedValue}
        </span>
      </div>
    </div>
  )
}
