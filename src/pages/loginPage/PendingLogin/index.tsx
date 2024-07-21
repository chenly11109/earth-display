import React from 'react'
import './index.scss'
import ProviderSelectButton from '../../../design/Login/ProviderSelectButton'
import { ReactComponent as MetaMaskIcon } from '../../../svg/metamask.svg'

export default function PendingLogin({
  mockFailureLogin,
  mockSuccessLogin
} : {
  mockFailureLogin: ()=>void
  mockSuccessLogin: ()=>void
}) {
  return (
    <div>
      
        {/* 标题 */}
        <div className="title">Turn on, tune in.</div>
        {/* 副标题 */}
        <div className="subtitle">Choose a DID provider</div>
        {/* 选择钱包 */}
        <ProviderSelectButton 
          name='MetaMask'
          handleClick={mockFailureLogin}
          icon={<MetaMaskIcon className='metaMaskIcon' />}
          className='wallet1 wallet'
        />
        <ProviderSelectButton 
          name='WalletConnect'
          handleClick={mockSuccessLogin}
          className='wallet2 wallet'
        />
        <ProviderSelectButton 
          name='Coinbase'
          handleClick={mockSuccessLogin}
          className='wallet3 wallet'
        />
        <ProviderSelectButton 
          name='Trust'
          handleClick={mockSuccessLogin}
          className='wallet4 wallet'
        />
        {/* 说明文字 */}
        <div className="captions">
          <p className="captions__big">Need help connecting a DID provider? </p>
          <a href="#" className='captions__link'>Read our FAQ</a>

          <p>Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. </p>

          <p>Your access to the DID provider might be reliant on the External Provider being operational.</p>

        </div>

    </div>
  )
}
