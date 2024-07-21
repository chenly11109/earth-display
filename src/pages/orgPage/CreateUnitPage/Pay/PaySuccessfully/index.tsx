import React from 'react'
import './index.scss'
import ShortTimeLoading from '../../../../../design/Orgnization/ShortTimeLoading'
import { useNavigate } from 'react-router-dom'


export default function PaySuccessfully() {

  const navigate = useNavigate()

  function handleDone(){
    navigate(-1)
  }



  return (
    <div className='paySuccessfully'>

      <div className="paySuccessfully__title">
        Your transaction is pending
      </div>

      <ShortTimeLoading isShow={true} className='paySuccessfully__loading' />

      <div 
        className="paySuccessfully__doneButton fullscreenCenterButton"
        onClick={handleDone}
      >
        Done
      </div>

    </div>
  )
}
