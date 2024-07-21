import React, {useEffect, useState} from 'react'
import './index.scss'
import CloseButton from '../../design/Orgnization/CloseButton'
import { useNavigate } from 'react-router-dom'
import ResponseModal from '../../design/Orgnization/ModalResponse/ResponseModal'
import PendingLogin from './PendingLogin'
import Regist from './Regist'
import { animated, useTransition } from '@react-spring/web';
import cn from 'classnames'
import { useLoginStore } from '../../state/login'
import { service } from '../../api/service'
import uuid from 'react-uuid'  // uuid来模拟pk不存在的情况

const mock_registed_pk = 'testPK'
const mock_registed_sk = 'testSIGN'

export default function LoginPage() {

  const { containerCls, setContainerCls, setPk, setSign, 
    setUserId, setUserName, setToken } = useLoginStore()
  const navigate = useNavigate()

  // 挂载的时候
  useEffect(()=>{
    setContainerCls('')
  }, [])

  // 登录状态
  const [loginStatus, setLoginStatus] = useState<'pending'|'success'|'failure'>('pending')

  function handleClose(){
    setContainerCls('out_400ms')
    setTimeout(() => {  // 400ms是页面内所有组件的消失时间
      navigate('/home')
    }, 400);
  }

  const [showLoading, setShowLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<'loading'|'success'|'failure'>('loading')

  /**
   * 点击钱包登陆 
   */
  // 需要注册的情况
  function mockFailureLogin(){
    setShowLoading(true)
    // 模拟从钱包获取 pk 和 sign
    const mock_unregisted_pk = uuid()
    const mock_unregisted_sign = uuid()
    setPk(mock_unregisted_pk)
    setSign(mock_unregisted_sign)

    const loginBody = {
      pk: mock_unregisted_pk,
      sign: mock_unregisted_sign
    }
    service.post('/user/init/login', loginBody)
      .then(res => {
        // The public key is Wrong or NOT Exist 需要注册
        if(res.data.code === 1000){
          setShowLoading(false)
          setLoginStatus('failure')
          setContainerCls('out_400ms')
        }
      })
      .catch(err => {
        console.log('err', err)
        setShowLoading(false)
      })
  }

  // 直接登陆成功的情况
  function mockSuccessLogin(){
    setShowLoading(true)
    const loginBody = {
      pk: mock_registed_pk,
      sign: mock_registed_sk
    }
    service.post('/user/init/login', loginBody)
      .then(res => {
        console.log(res.data.data)
        const {token, userId, userName} = res.data.data
        // 更新状态库，埋token
        setUserId(userId)
        setUserName(userName)
        setToken(token)
        localStorage.setItem('user_token', token)

        setShowLoading(false)
        // 页面上所有组件消失
        setContainerCls('out_400ms_forwards')
        // 跳转到home
        setTimeout(() => {  // 400ms是组件消失的时间
          navigate('/home')
        }, 400);
      })
      .catch(err => {
        console.log('err', err)
        setShowLoading(false)
      })
  }



  // 隐藏关闭按钮
  const [showCloseButton, setShowCloseButton] = useState(true)
  function hideCloseButton(){
    setShowCloseButton(false)
  }
  const closeButtonTransitions = useTransition(showCloseButton, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });


  return (
  <>

      <div className='loginWrap'>

        {/* 关闭按钮 */}
        {
          closeButtonTransitions(
            (styles, item) => 
              item && (
                <animated.div style={styles}>
                  <CloseButton 
                    handleClose={handleClose}
                  />
                </animated.div>
              )
          )
        }

        <div className={cn("container", containerCls)}>

          {
            loginStatus === 'pending' ? 

              <PendingLogin mockFailureLogin={mockFailureLogin} mockSuccessLogin={mockSuccessLogin} />

            : loginStatus === 'failure' ? 

              <Regist hideCloseButton={hideCloseButton} />

            : <h1 style={{color: 'white'}}>WRONG</h1>
          }

        </div>

      </div>

      {/* response modal */}
      <ResponseModal status={loadingStatus} open={showLoading} msg="Connecting" />

  </>
  )
}
