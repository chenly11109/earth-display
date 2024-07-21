import React, { useState } from 'react'
import './index.scss'
import useLoadingProcessing from '../../../CreateOrgPage/useLoadingProcessing'
import { useTransition, animated } from '@react-spring/web'
import { QuickConfig } from '../../../../../config/animation'
import ShortTimeLoading from '../../../../../design/Orgnization/ShortTimeLoading'
import { useOrgPageStore } from '../../../../../state/OrgPageState'

const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

export default function PayPending({
  maskCompleted
} : {
  maskCompleted: boolean
}) {

  const { setPayState, setStepEnd } = useCreateUnitPageStore()
  const [status, setStatus] = useState('')  // 付费的状态，区别于payState，这个专门用来渐出组件

  // loading
  const shortTimeLoadingTransitions = useTransition(maskCompleted, { 
    from: { scale: 2.5, translateX: '-50%' },
    enter: { scale: 1, translateX: '-50%' },
    config: QuickConfig
  });

  // 文字乱码加载效果
  const processingText = useLoadingProcessing(maskCompleted)

  // pay
  function handlePay(){
    // todo 模拟1s后付费成功
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {  // 300ms等待组件渐出
        setPayState('success')
      }, 300);
    }, 1000);
  }


  return (
    <div>

      {/* loading */}
      {
        shortTimeLoadingTransitions(
          (styles, item) => 
            item && (
              <animated.div
                className='shortTimeLoadingWrap'
                style={{...styles, transition: 'opacity 200ms ease-in', opacity: status==='' ? 1 : 0}}
              >
                <ShortTimeLoading isShow={true} className='center' />
              </animated.div>
            )
        )
      }

      {/* 乱码加载文字 */}
      <div className="pay__processingText" style={{opacity: status==='' ? 1 : 0}}>
        {processingText}
      </div>

      {/* to design 支付窗口 */}
      <div 
        className="pay__payButton unitButton unitButton--show"
        onClick={handlePay}
      >
        Pay
      </div>

    </div>
  )
}
