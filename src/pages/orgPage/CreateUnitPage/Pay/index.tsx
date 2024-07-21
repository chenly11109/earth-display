import React, { useEffect, useState } from 'react'
import './index.scss'
import DarkMask from '../../../../design/Orgnization/DarkMask'
import ReactDOM from 'react-dom'
import PayPending from './PayPending'
import PaySuccessfully from './PaySuccessfully'
import PayFailure from './PayFailure'
import { useOrgPageStore } from '../../../../state/OrgPageState'

const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

export default function Pay() {

  const root = document.getElementById('root')
  const { payState } = useCreateUnitPageStore()

  const [show, setShow] = useState(false)
  const [maskCompleted, setMaskCompleted] = useState(false)

  useEffect(()=>{
    setShow(true)
    setTimeout(() => {
      setMaskCompleted(true)
    }, 700);
  }, [])

  return (
    <div>
    {
      ReactDOM.createPortal(
        <DarkMask 
          isShow={show} 
          closeMask={()=>setShow(false)}
          renderChildren={(onClose)=> (
            <div className='pay'>

            {
              payState==='pending' ? 
              <PayPending maskCompleted={maskCompleted} />
              : payState==='success' ? 
              <PaySuccessfully />
              : payState==='failure' ? 
              <PayFailure /> 
              : null
            }

            </div>
          )}
        />,
        root as HTMLElement
      )
    }
    </div>
  )
}
