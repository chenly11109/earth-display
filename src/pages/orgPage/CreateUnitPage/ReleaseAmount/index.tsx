import React, { useEffect, useState } from 'react'
import './index.scss'
import LargeAmountInput from '../../../../design/CreateUnit/LargeAmountInput'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

export default function ReleaseAmount() {

  const { abbr, releaseAmount, setRealeaseAmount, setStep, setStepEnd } = useCreateUnitPageStore()

  const [mount, setMount] = useState(false)
  useEffect(()=>{
    setMount(true)
    setStepEnd(false)
  }, [])

  // 点击按钮
  function handleBack(){
    setMount(false)
    setStepEnd(true)
    setTimeout(() => {
      setStep('uploadLogo')
    }, 300);
  }
  function handleNext(){
    setMount(false)
    setStepEnd(true)
    setTimeout(() => {
      setStep('addProperty')
    }, 300);
  }

  return (
    <div className='releaseAmount'>
      
      {/* title */}
      <div className="releaseAmount__title">
        Set the initial amount of <span className='releaseAmount__title__abbr'> {abbr} </span>
      </div>

      {/* 输入框 */}
      <LargeAmountInput
        value={releaseAmount}
        handleChange={setRealeaseAmount}
        maxLength={11}
        className='releaseAmount__input'
        minWidth={400}
      />

      {/* 按钮 */}
      <div 
        className={cn("releaseAmount__back unitButton", mount && 'unitButton--show')}
        onClick={handleBack}
      >
        Back
      </div>

      <div 
        className={cn("releaseAmount__next unitButton", releaseAmount && mount && 'unitButton--show')}
        onClick={handleNext}
      >
        Next
      </div>

    </div>
  )
}
