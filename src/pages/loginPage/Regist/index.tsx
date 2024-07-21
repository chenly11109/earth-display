import React, { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web';
import './index.scss'
import CircularHaloResponsiveButton from '../../../design/Login/circularHaloResponsiveButton';
import { useLoginStore } from '../../../state/login';
import LoginProcessTitleNameInput from '../../../design/Login/LoginProcessTitleNameInput/LoginProcessTitleNameInput';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames'
import { service } from '../../../api/service';
import ResponseModal from '../../../design/Orgnization/ModalResponse/ResponseModal';

export default function Regist({
  hideCloseButton
} : {
  hideCloseButton: ()=>void
}) {

  const { setContainerCls, setUserId, setUserName, setToken, userName, pk, sign } = useLoginStore()
  const backName = [...`#${userName.split('#')[1]}`.split('')]
  const navigate = useNavigate()

  const [step, setStep] = useState('welcome')

  function handleContinue(){
    setContainerCls('out_300ms')
    setTimeout(() => {  // 300ms是点击按钮之后组件消失的时间
      setStep('fillName')
    }, 300);
  }

  /**
   * 填写用户名
   */
  const [name,setName] = useState('')
  function handleChange(str: string){
    setName(str)
  }
  useEffect(()=>{
    const len = name.length
    if(len >= 6){
      setNameCorrect(true)
    } else {
      setNameCorrect(false)
    }
  }, [name])

  const [isNext,setNext] = useState(false)
  // 控制按钮出现/消失
  const [isNameCorrect, setNameCorrect] = useState(false)
  const buttonTransitions = useTransition(isNameCorrect && !isNext, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  // 反馈弹窗
  const [showLoading, setShowLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<'loading'|'success'|'failure'>('loading')

  function handleRegist(){
    setShowLoading(true)
    // 注册请求
    const registBody = {
      "address": pk,
      "sign": sign,
      "userName": name
    }
    service.post('/user/init/regis', registBody)
      .then(res => {
        // 得到数据之后，更新状态库，储存token
        const {token, userId, userName} = res.data.data
        setUserName(userName)
        setUserId(userId)
        setToken(token)
        localStorage.setItem('user_token', token)
        
        setShowLoading(false)
        hideCloseButton()
        setNext(true)
        setTimeout(() => {  // 1200ms是横线收起的时间
          setStep('registed')
        }, 1200);
      })
      .catch(err => {
        console.log(err)
        setShowLoading(false)
      })

  }

  // hover注册按钮
  const [hoverRegist, setHoverRegist] = useState(false)


  /**
   * 注册成功之后
   */
  const links = [
    {
      title: 'Tag System',
      intro: 'The Tag system is a trusted data formed based on the definition of the range value of blah blah...',
      to: '/home'
    },
    {
      title: 'Workflow',
      intro: 'The Tag system is a trusted data formed based on the definition of the range value of...',
      to: '/home'
    },
    {
      title: 'DOP',
      intro: 'The Tag system is a trusted data formed based on the definition of the range value of...',
      to: '/home'
    },
  ]

  function handleFinishRegist(){
    setContainerCls('out_400ms')
    setTimeout(() => {  // 400ms是页面内所有组件的消失时间
      navigate('/home')
    }, 400);
  }

  const [nameUp, setNameUp] = useState(false)
  const [showName1, setShowName1] = useState(false)
  const [showName2, setShowName2] = useState(false)
  const [showName3, setShowName3] = useState(false)
  const [showName4, setShowName4] = useState(false)
  
  /**
   * username的动画
   */
  //#region 
  function handleAnimationEnd(){  // 总时长1000ms，每个字符出现时间是200ms
    setNameUp(true)
    setTimeout(() => {
      setShowName1(true)
      setTimeout(() => {
        setShowName2(true)
        setTimeout(() => {
          setShowName3(true)
          setTimeout(() => {
            setShowName4(true)
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  }

  const backNameTransitions0 = useTransition(nameUp, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });
  const backNameTransitions1 = useTransition(showName1, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });
  const backNameTransitions2 = useTransition(showName2, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });
  const backNameTransitions3 = useTransition(showName3, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });
  const backNameTransitions4 = useTransition(showName4, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });
  //#endregion

  // hover完成按钮
  const [hoverFinish, setHoverFinish] = useState(false)

  return (
    <div className='registWrap'>

      {
        step === 'welcome' ? <>
            {/* 邀请语 */}
            <div className="inviteText">
              <div className="inviteText__top">Sorry, we can’t find your multi-chain identity.</div>
              <div className="inviteText__bottom">Let’s continue to create one.</div>
            </div>
            {/* 酷炫的按钮 */}
            <CircularHaloResponsiveButton
              text='CONTINUE'
              handleClick={handleContinue}
              className='haloButton'
            />
          </>
        : step === 'fillName' ? <>
              {/* 标题 */}
              <div 
                className={cn("question", hoverRegist && 'question--hover')}
              >
                What do you want people to call you ?
              </div>
              {/* 输入框 */}
              <LoginProcessTitleNameInput 
                value={name}
                handleChange={handleChange}
                isCompleted={isNext}
                hoverRegist={hoverRegist}
              />
              {/* 提示文字和按钮 */}
              {
                buttonTransitions(
                  (styles, item) => 
                    item && (
                      <animated.div style={styles}>
                        {/* 提示文字 */}
                        <div className={cn("warnText", hoverRegist && 'warnText--hover')}>
                          The username could not be modified once created
                        </div>
                        {/* 按钮 */}
                        <div 
                          onMouseOver={()=>setHoverRegist(true)}
                          onMouseLeave={()=>setHoverRegist(false)}
                        >
                          <CircularHaloResponsiveButton
                            text='I UNDERSTAND'
                            handleClick={handleRegist}
                            className='registButton'
                          />
                        </div>
                      </animated.div>
                    )
                )
              }
            </>
        : step === 'registed' ? <>

          {/* 用户名 */}
          <div 
            className={cn("username")} 
            onAnimationEnd={handleAnimationEnd}
          >

            <span className="username__front">
              {userName.split('#')[0]}
            </span>

            {
              backNameTransitions0(
                (styles, item) => 
                  item && (
                    <animated.span 
                      style={{...styles, color: 'rgba(255,255,255,0.5)'}}
                      className="username__back"
                    >
                        {backName[0]}
                    </animated.span>
                  )
              )
            }
            {
              backNameTransitions1(
                (styles, item) => 
                  item && (
                    <animated.span 
                      style={{...styles, color: 'rgba(255,255,255,0.5)'}}
                      className="username__back"
                    >                        
                      {backName[1]}
                    </animated.span>
                  )
              )
            }
            {
              backNameTransitions2(
                (styles, item) => 
                  item && (
                    <animated.span 
                      style={{...styles, color: 'rgba(255,255,255,0.5)'}}
                      className="username__back"
                    >
                      {backName[2]}
                    </animated.span>
                  )
              )
            }
            {
              backNameTransitions3(
                (styles, item) => 
                  item && (
                    <animated.span 
                      style={{...styles, color: 'rgba(255,255,255,0.5)'}}
                      className="username__back"
                    >
                      {backName[3]}
                    </animated.span>
                  )
              )
            }
            {
              backNameTransitions4(
                (styles, item) => 
                  item && (
                    <animated.span 
                      style={{...styles, color: 'rgba(255,255,255,0.5)'}}
                      className="username__back"
                    >
                      {backName[4]}
                    </animated.span>
                  )
              )
            }

          </div>

          {/* 说明文字 */}
          <div className={cn("registedCaptions", nameUp && 'registedCaptions--show')}>
            <div className="caption" style={{opacity: hoverFinish ? 0.3 : 1}}>
              We value your reputations. Your actions will be
            </div>
            <div className="caption" style={{opacity: hoverFinish ? 0.3 : 1}}>
              recorded on a public platform. Other users will decide upon whether
            </div>
            <div className="caption" style={{opacity: hoverFinish ? 0.3 : 1}}>
              to collaborate with you based on your record.
            </div>
          </div>

          {/* 按钮 */}
          <div 
            onMouseOver={()=>setHoverFinish(true)}
            onMouseLeave={()=>setHoverFinish(false)}
          >
            <CircularHaloResponsiveButton
              text='START YOUR JOURNEY'
              handleClick={handleFinishRegist}
              className={cn('finishButton', nameUp && 'finishButton--show')}
            />
          </div>

          {/* learn more */}
          <div style={{opacity: hoverFinish ? 0.2 : 0.4, transition: 'all 300ms ease-out'}}>
            <div className={cn("learnMoreText", nameUp && 'learnMoreText--show')}>learn more</div>
          </div>

          <div style={{opacity: hoverFinish ? 0.5 : 1, transition: 'all 300ms ease-out'}}>
            <div className={cn("links", nameUp && 'links--show')}>
              {
                links.map((link,index) => {
                  return (
                    <Link to={link.to} className="links__link" key={index}>
                      <div className="links__link__title">
                        {link.title}
                      </div>
                      <div className="links__link__intro">
                        {link.intro}
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>


        </>
        : null
      }
      
      {/* response modal */}
      <ResponseModal status={loadingStatus} open={showLoading} msg="Connecting" />
      
    </div>
  )
}
