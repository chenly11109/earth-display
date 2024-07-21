import React, { useState, useEffect } from 'react'

export default function useLoadingProcessing(trigger: boolean) {

  const [processingText, setProcessingText] = useState('')
  // 文字乱码加载效果
  useEffect(()=>{
    if(trigger){
      let count = 0
      const timer = setInterval(()=>{  
        if(count < 12){
          if(count === 0){
            setProcessingText('$')
          }
          if(count === 1){
            setProcessingText('&c£')
          }
          if(count === 2){
            setProcessingText('&ce!X')
          }
          if(count === 3){
            setProcessingText('+-ces@')
          }
          if(count === 4){
            setProcessingText('£!oces>')
          }
          if(count === 5){
            setProcessingText('!*ocess/X')
          }
          if(count === 6){
            setProcessingText('%ocessi-£!')
          }
          if(count === 7){
            setProcessingText('-[ocessi!X')
          }
          if(count === 8){
            setProcessingText('>&rocessi@')
          }
          if(count === 9){
            setProcessingText('^rocessin)')
          }
          if(count === 10){
            setProcessingText('#rocessing')
          }
          if(count === 11){
            setProcessingText('Processing')
          }
          count++
        } else if(count >= 12){  // 清除定时器
          clearInterval(timer)
        }
      }, 50)
    } else {
      setProcessingText('')
    }
  }, [trigger])


  return processingText
}
