import React, { useState } from 'react'
import './index.scss'
import ReactDOM from 'react-dom'
import DarkMask from '../../../design/Orgnization/DarkMask'
import CloseButton from '../../../design/Orgnization/CloseButton'
import { useNavigate } from 'react-router-dom'
import { useOrgPageStore } from '../../../state/OrgPageState'
import FillName from './FillName'
import UploadLogo from './UploadLogo'
import ReleaseAmount from './ReleaseAmount'
import AddProperty from './AddProperty'
import Confirmation from './Confirmation'
import Pay from './Pay'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

export default function CreateUnitPage() {

  const { step, stepEnd } = useCreateUnitPageStore()

  // 展开/关闭大遮罩
  const [show, setShow] = useState(true)
  const root = document.getElementById('root')

  const navigate = useNavigate()
  function handleClose(){
    setShow(false)
    setTimeout(() => {
      navigate('/home')
    }, 1000);
  }



  return (
    <div>
    {
      ReactDOM.createPortal(
        <DarkMask 
          isShow={show} 
          closeMask={()=>setShow(false)}
          renderChildren={(onClose)=> (
            <>
              {/* 关闭按钮 */}
              <CloseButton handleClose={handleClose} />

              <div className={cn(stepEnd && 'unitStepEnd')}>
              {

                // 第一步 fillName
                step==='fillName' ? 

                <FillName /> :

                step==='uploadLogo' ? 

                <UploadLogo /> :

                step==='releaseAmount' ? 
                
                <ReleaseAmount /> :

                step==='addProperty' ? 
                <AddProperty /> : 
                step==='confirmation' ? 
                <Confirmation /> : 
                step==='pay' ? 
                <Pay /> : 

                null

              }
            </div>

            </>

          )}
        />,
        root as HTMLElement
      )
    }
    </div>
  )
}
