import React,{ useState, useEffect } from 'react'
import './index.scss'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import { ReactComponent as PointIcon } from './point.svg'
import { ReactComponent as BgIcon } from './logoBg.svg'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

export default function Confirmation() {

  const { name, abbr, setStep, properties, releaseAmount, setStepEnd,
    logoSrc } = useCreateUnitPageStore()

  const [mount, setMount] = useState(false)
  useEffect(()=>{
    setMount(true)
    setStepEnd(false)
  }, [])

  // 大金额数字加逗号，用于展示
  function numberWithCommas(x: string) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // hover publish按钮
  const [isHover, setHover] = useState(false)
  const [isAnimationEnd, setAnimationEnd] = useState(false)
  const publishPromptShow = isAnimationEnd && isHover

  // 按钮回调
  function handleBack(){
    setStepEnd(true)
    setMount(false)
    setTimeout(() => {
      setStep('addProperty')
    }, 300);
  }

  function handlePublish(){
    setStepEnd(true)
    setStep('pay')
  }


  return (
    <div className='confirmation'>

      <div className="confirmation__infosWrap">
        <div 
          className="confirmation__infos"
          style={{
            top: publishPromptShow ? 'calc(278/1080*100vh)' : 'calc(358/1080*100vh)'
          }}
        >

          {/* logo */}
          <div className="confirmation__infos__logoWrap">
            <BgIcon className='confirmation__infos__logoWrap__logoBg' />
            <img src={logoSrc} className='confirmation__infos__logoWrap__img' />
          </div>
        
          <div className="confirmation__infos--right">

            {/* name */}
            <div className="confirmation__infos__name">
              {`${abbr} - ${name}`}
            </div>

            {/* props */}
            <div className="confirmation__infos__propWrap">
            {
              properties.length === 0 ? 
              <span 
                className="confirmation__infos__prop"
                style={{padding: 0}}
              >
                No special properties
              </span>
              :
              properties.map((prop,i) => {
                return (
                  <span key={i} className='confirmation__infos__prop'>
                    <PointIcon className='confirmation__infos__prop__point' />
                    {
                      prop==='Burn - Personal' ? 'Burn - Personal' : 
                      prop==='Burn - Macro-control' ? 'Burn' :
                      prop==='Mint - Macro-control' ? 'Mint' : 
                      prop==='Freeze - Macro-control' ? 'Freeze' : null
                    }
                  </span>
                )
              })
            }
            </div>

            {/* initial amount */}
            <div className="confirmation__infos__initialText">
              Initial Amount
            </div>
            <div className="confirmation__infos__initialAmount" onAnimationEnd={()=>setAnimationEnd(true)}>
              {numberWithCommas(releaseAmount)}
            </div>

          </div>


        </div>
      </div>


      {/* 提示文字 */}
      <div 
        className="confirmation__prompt"
        style={{
          opacity: publishPromptShow ? 1 : 0,
          bottom: publishPromptShow ? 'calc(390/1080*100vh)' : 'calc(310/1080*100vh)'
        }}
      >
        All information could not be modified once published
      </div>


      {/* 按钮 */}
      <div 
        className={cn("confirmation__back unitButton", mount && 'unitButton--show')}
        onClick={handleBack}
      >
        Back
      </div>

      <div 
        className={cn("confirmation__publish unitButton", mount && 'unitButton--show')}
        onClick={handlePublish}
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
      >
        Publish
      </div>


    </div>
  )
}
