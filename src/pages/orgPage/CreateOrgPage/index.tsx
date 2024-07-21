import { useEffect, useState } from 'react';
import { useOrgPageStore } from '../../../state/OrgPageState';
import "./index.scss";
import { useSpring, useTransition, animated } from "@react-spring/web";
import { Quick2Config, SlowConfig, QuickConfig } from '../../../config/animation';
import { useNavigate } from "react-router-dom";

// 遮罩
import ReactDOM from 'react-dom'
import DarkMask from '../../../design/Orgnization/DarkMask';
// 1001组件
import ProcessTitleNameInput from '../../../design/Orgnization/ProcessTitleNameInput/ProcessTitleNameInput';
// 关闭按钮
import CloseButton from '../../../design/Orgnization/CloseButton';
import classNames from 'classnames';
// 1002组件
import ProcessContentTextInput from '../../../design/Orgnization/ProcessContentTextInput';
// 关闭时候的弹窗
import SecondConfirmationPopup from '../../../design/Orgnization/SecondConfirmationPopup';
// 图片不合规的弹窗
import NotificationPopup from '../../../design/Orgnization/NotificationPopup';
// 头像上传按钮
import AddImageButton from '../../../design/Orgnization/AddImageButton';
// logo背后呼吸灯
import { ReactComponent as LogoBreathe } from './svg/logoBreathe.svg';
// 短时间加载loading
import ShortTimeLoading from '../../../design/Orgnization/ShortTimeLoading';
// 打勾小组件
import SuccessStatusComponent from '../../../design/Orgnization/SuccessStatusComponent';

import useLoadingProcessing from './useLoadingProcessing';

const useCreateOrgPageStore = useOrgPageStore.getState().CreateOrgPageStore

export default function CreateOrgPage() {
  const { step, setStep, name, setName, intro, setIntro, whyNotCompliant, setWhyNotCompliant, logo, setLogo, isSuccessDone, setSuccessDone, members, addMember, clear } = useCreateOrgPageStore()
  // 遮罩
  const [isMaskShow, setMaskShow] = useState(true)
  const root = document.getElementById('root')
  const navigate = useNavigate();
  // 点击关闭按钮的回调
  function handleClose(onClose: ()=>void){
    if(!name){
      onClose()
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 700);
    } else {
      setShowSecondConfirmationPopup(true)
    }
  }
  // 关闭遮罩的弹窗
  const [showSecondConfirmationPopup, setShowSecondConfirmationPopup] = useState(false);
  const handleModalDone = (onClose:()=>void) => {
    // 选择done，清空所填所有数据，并关闭遮罩
    clear()
    onClose()
    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 700);
  };
  const handleModalCancel = () => {
    // 选择cancel，不做任何事，并关闭弹窗
    setShowSecondConfirmationPopup(false);
  }
  const [isPaying, setPaying] = useState(false)
  function handleCreate(){
    setPaying(true)
    setPayButtonShow(true)
    // setElapsed(useRaf(600,700))
    // TODO 
    setTimeout(() => {
      setPaySuccessing(true)
    }, 1000);
    setTimeout(() => {
      setPayMaskCompleted(true)
    }, 700);
  }
  const [isPayMaskCompleted, setPayMaskCompleted] = useState(false)
  const shortTimeLoadingTransitions = useTransition(isPayMaskCompleted, {  // 上传按钮的动画
    from: { scale: 2.5, translateX: '-50%' },
    enter: { scale: 1, translateX: '-50%' },
    // leave: { opacity: 0, scale: 0, translateX: '-50%' },
    config: QuickConfig
  });
  const [isPayButtonShow, setPayButtonShow] = useState(false)
  function handlePay(){
    setPayButtonShow(false)
  }
  function handlePayCancel(onClose:()=>void){
    onClose()
    setPaying(false)
    setPayButtonShow(false)
    // setPayActive(false)
    setPayMaskCompleted(false)
    // TODO 
    setPaySuccessing(false)
  }

  const [paySuccessing, setPaySuccessing] = useState(false)
  // 文字乱码加载效果
  const processingText = useLoadingProcessing(isPayMaskCompleted)

  
  return (
    ReactDOM.createPortal(
      <>
        <DarkMask isShow={isMaskShow} 
          closeMask={()=>setMaskShow(false)}
          renderChildren={(onClose)=> (
            <>
              <CreateOrgStep setPaying={handleCreate} />
              {/* 关闭按钮 */}
              <CloseButton className='mask__closeButton' handleClose={()=>handleClose(onClose)} />
              {/* 关闭遮罩提示弹窗 */}
              <SecondConfirmationPopup
                showModal={showSecondConfirmationPopup}
                handleDone={()=>handleModalDone(onClose)}
                handleCancel={handleModalCancel}
                title="Warning"
                content="Your edits will not be saved, please make sure to exit"
              />
              {/* 图片不合规弹窗 */}
              {
                // <NotificationPopup
                //   showModal={whyNotCompliant!==''}
                //   handleDone={handleNotificationPopupDone}
                //   title="Error"
                //   content={whyNotCompliant}
                // />
              }
            </>
          )}
        />
        <DarkMask isShow={isPaying} 
        closeMask={()=>setPaying(false)}
        renderChildren={(onClose)=> (
          <>
            {
              shortTimeLoadingTransitions(
                (styles, item) => 
                  item && (
                    <animated.div
                      className='shortTimeLoadingWrap'
                      style={styles}
                    >
                      <ShortTimeLoading isShow={true} className={'center'} />
                    </animated.div>
                  )
              )
            }
            <p className='processingText'>
              { processingText }
            </p>
            <div 
              onClick={handlePay}
              className={classNames( 
                isPayButtonShow && 'fullscreenButton--active', 
                "fullscreenButton--right",
                )}
              >Pay</div>      
            <div 
              onClick={()=>handlePayCancel(onClose)}
              className={classNames( 
                "fullscreenButton--left", 
                'fullscreenButton--active'
                )}
            >Cancel</div>

            <div className="successIcon">
              <SuccessStatusComponent isShow={paySuccessing} />
            </div>
          </>
        )}
      />
    </>
      ,
      root as HTMLElement
    )
  )
}


/** 根据step渲染不同的组件 */
function CreateOrgStep({
  setPaying
} : {
  setPaying: ()=>void
}) {
  /**
   * 组件的状态：
   * isTitleCompleted  isContentCompleted  isContentBack  isContentTextarea  
   * isLogoCompleted
   */
  const { step, setStep, name, setName, intro, setIntro, logo, setLogo, logoSrc, members, addMember, clear } = useCreateOrgPageStore()
    // step0: Title
    const [titleValue, setTitleValue] = useState('')
    function handleTitleChange(value:string){
      setName(value)
      setTitleValue(value)
    }
    const [isTitleCompleted, setTitleCompleted] = useState(false)
    function handleTitleNext(){
      // 更改各组件状态
      setTitleCompleted(true)
      setContentCompleted(false)
      setContentBack(false)
      // setContentTextarea(false)
      // 更新公共状态
      setName(titleValue)
      // 转到第二步
      setStep(1)
    }
    // step1: Content
    const [contentValue, setContentValue] = useState('')
    function handleContentChange(newValue: string){
      setContentValue(newValue)
    }
    const [isContentCompleted, setContentCompleted] = useState(false)
    const [isContentBack, setContentBack] = useState(false)
    // 判断是提示文字形态，还是textarea形态
    const [isContentTextarea, setContentTextarea] = useState(false)
    function watchContentTextarea(){  //监听textarea的出现
      console.log('监听到组件被点击');
      setContentTextarea(true)
    }
    function handleContentSkip(){
      // 更改各组件状态
      setTitleCompleted(true)
      setContentCompleted(true)
      setContentBack(false)
      setLogoActive(true)
      setLogoBack(false)
      // setContentTextarea(false)
      // 更新公共状态
      setIntro('')
      // 转到第三步
      setStep(2)
    }
    function handleContentBack(){
      // 更改各组件状态
      setTitleCompleted(false)
      setContentCompleted(false)
      setContentBack(true)
      setLogoBack(false)
      // 更新公共状态（保存简介内容）
      setIntro(contentValue)
      // 转到第一步
      setStep(0)
    }
    function handleContentNext(){
      // 更改各组件状态
      setTitleCompleted(true)
      setContentCompleted(true)
      setContentBack(false)
      setLogoActive(true)
      setLogoBack(false)
      // setContentTextarea(true)
      // 更新公共状态
      setIntro(contentValue)
      // 转到第三步
      setStep(2)
    }
    // 传递给简介组件的className
    function getContentClassName(isTitleCompleted:boolean,isContentBack:boolean,isContentCompleted:boolean,isContentTextarea:boolean){
      if(isTitleCompleted && !isContentBack && !isContentCompleted && !isLogoBack){
        return 'contentText--active'
      }
      if((isContentBack || isContentCompleted) && !isContentTextarea){
        return 'contentText--active contentText--fadeout--unClicked'
      }
      if((isContentBack || isContentCompleted) && isContentTextarea){
        return 'contentText--active contentText--fadeout--clicked'
      }
      if(isTitleCompleted && !isContentBack && !isContentCompleted && isLogoBack){
        return 'contentText--immediateActive'
      }
    }
    // step2 上传logo
    const [isLogoActive, setLogoActive] = useState(false)  // 是否处在上传logo的阶段
    const [isLogoBack, setLogoBack] = useState(false)
    function handleLogoBack(){
      // 更改各组件状态
      if(step === 2){ 
        setContentCompleted(false)
        setContentBack(false)
        setLogoActive(false)
        setLogoCompleted(false)
        setLogoBack(true)
        setStep(step - 1)
      } else if(step === 3){
        setLogoCompleted(false)
        setLogoActive(true)
        setCreateActive(false)
        setStep(step - 1)
      }
    }
    const [isLogoCompleted, setLogoCompleted] = useState(false)
    function handleLogoNext(){
      // 更改各组件状态
      // setContentCompleted(true)
      // setContentBack(false)
      setLogoActive(false)
      setLogoCompleted(true)
      setCreateActive(true)
      setStep(3)
      // if(contentArr.length === 0){
        setContentArr(intro.split(' '))
      // }
    }
    const [uploadState, setUploadState] = useState('initial')
    // step3 创建与付费
    const [isCreateActive, setCreateActive] = useState(false)
    const logoTransitions = useTransition(isLogoActive || isCreateActive, {  // 上传按钮的动画
      from: { opacity: 0, scale: 0, translateX: '-50%' },
      enter: { opacity: 1, scale: 1, translateX: '-50%' },
      leave: { opacity: 0, scale: 0, translateX: '-50%' },
      config: Quick2Config
    });
    const logoCompletedTransitions = useTransition(isCreateActive, {  // logo的动画
      from: { scale: 1, borderRadius: '0vh' },
      enter: { scale: 1.16, borderRadius: `${16 / 1080 * 100}vh` },
      leave: { scale: 1, borderRadius: '0vh' },
      config: SlowConfig
    })
    const [isPayActive, setPayActive] = useState(false)
    function handleCreateNext(){
      setPayActive(true)
      setPaying()
    }
    // 简介展示的处理
    const [contentArr, setContentArr] = useState<string[]>([])
    const { o } = useSpring({
      from: {o: Math.random()},
      to: isCreateActive ? {o: 1} : {o: 0},
      config: {
        mass: 1,
        tension: 80,
        friction: 60
      }
    })
    // 定义几种文字出现
    const oInterpolate1 = o.to(
      [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0],
      [0,0.2,0.4,0.6,0.6,0.7,0.7,0.8,0.8,1,1],
    );
    const oInterpolate2 = o.to(
      [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0],
      [0,0,0,0,0.1,0.2,0.3,0.5,0.6,0.7,1],
    );
    const oInterpolate3 = o.to(
      [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0],
      [0,0.2,0.5,0.7,0.9,1,1,1,1,1,1],
    );
    const oInterpolate4 = o.to(
      [0.0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0],
      [0,0.2,0.3,0.4,0.5,0.5,0.5,0.6,0.8,1,1],
    );
    const oInterpolate = [oInterpolate1, oInterpolate2, oInterpolate3, oInterpolate4]
    
    const { whyNotCompliant, setWhyNotCompliant, isSuccessDone, setSuccessDone,
      setLogoSrc } = useCreateOrgPageStore()

    // 图片不合规的弹窗
    const handleNotificationPopupDone = () => {
      // if(isSuccessDone){
        console.log('更新了why为空')
        setWhyNotCompliant('')
        setSuccessDone(false)
      // } else {
      //   console.log('还没上传结束呢！')
      // }
    };
    // 自定义 onSuccess
    function customSuccess(file:File, src:string) {
      // 更新uploadState
      if(!whyNotCompliant){
        setUploadState('uploaded')
        setLogo(file)
        setLogoSrc(src)
      }
      setSuccessDone(true)
    }
    // 自定义请求成功的回调
    function handleRequsetSuccess(file: File, src: string){
      console.log('whyNotCompliant',whyNotCompliant)
      if(whyNotCompliant){
        throw whyNotCompliant
      } else {
        customSuccess(file, src);
      }
    }
    // addImageButton里的modal的props
    const showAddImageModal = (whyNotCompliant!=='')
    // 上传的图片错误时候的回调
    function handlePixelWrong(){
      setWhyNotCompliant('The uploaded image is less than 640px*640px')
    }
    function handleProportionWrong(){
      setWhyNotCompliant('The uploaded image is not in a 1:1 ratio')
    }

    return <>
    {/* 标题部分 */}
      <ProcessTitleNameInput
        isCompleted={isTitleCompleted}
        value={titleValue}
        handleChange={handleTitleChange}
        className={
          isCreateActive ? 'ProcessTitleNameInput--createStep'
        : ''
        }
      />
      {
        step === 0 || step === 1 ?
          <>
          {/* 右侧的next按钮 */}
            <div 
              onClick={handleTitleNext}
              className={classNames( 
                titleValue && !isTitleCompleted && 'fullscreenButton--active', 
                "fullscreenButton--right",
                isContentBack && 'fullscreenButton--fadein'  // 点击back后的渐入动画
                )}
              >Next</div>
          </>
        : null
      }
    {/* 简介部分 */}
      <ProcessContentTextInput 
        value={contentValue} 
        watchContentTextarea={watchContentTextarea}
        handleChange={handleContentChange}
        className={getContentClassName(isTitleCompleted,isContentBack,isContentCompleted,isContentTextarea)}
        />
      {/* 左侧的back按钮 */}
      {
        step === 0 || step === 1 ?
        <div 
          onClick={handleContentBack}
          className={classNames( 
            isTitleCompleted && 'fullscreenButton--active', 
            "fullscreenButton--left" 
            )}
          >Back</div>
        : null
      }
      {/* 右侧的skip按钮 */}
      <div 
        onClick={handleContentSkip}
        className={classNames( 
          "delayFullscreenButton--right" ,
          isTitleCompleted && !isContentBack && !isContentCompleted && 'delayFullscreenButton--active', 
          contentValue && 'delayFullscreenButton--moveLeft',
          isContentBack && 'delayFullscreenButton--fadeout',
          isContentCompleted && 'delayFullscreenButton--fadeout'
          )}
        >Skip</div>
      {/* 右侧的next按钮 */}
      <div 
        onClick={handleContentNext}
        className={classNames( 
          "fullscreenButton--right", 
          contentValue && !isContentBack && !isContentCompleted && 'fullscreenButton--active', 
          )}
        >Next</div>

    {/* 上传logo部分 */}
      {/* 上传按钮 */}
      {
        logoTransitions(
          (styles, item) =>
            item && (
              <animated.div
                className={classNames("addImageButtonWrap")}
                style={styles}
              >
                {/* 上传logo */}
                {
                  !isCreateActive ? 
                    <AddImageButton 
                      uploadState={uploadState as 'initial' | 'uploaded'} 
                      setUploadState={()=>setUploadState('uploaded')}
                      className={isCreateActive ? 'addImageButton--completed' : ''}
                      handleNotificationPopupDone={handleNotificationPopupDone}
                      customSuccess={customSuccess}
                      handleRequsetSuccess={handleRequsetSuccess}
                      showAddImageModal={showAddImageModal}
                      modalContent={whyNotCompliant}
                      imgSrc={logoSrc}
                      handlePixelWrong={handlePixelWrong}
                      handleProportionWrong={handleProportionWrong}
                    />
                  : null
                }
                {/* 上传完成之后 */}
                {
                  logoCompletedTransitions(
                    (styles, item) => 
                    item && (
                      <div 
                        className={classNames('addImageButtonWrap__imgMask', isPayActive && '')}
                      >
                        <animated.div
                          style={styles}
                          className='addImageButtonWrap__imgWrap'
                        >
                          <img className='addImageButtonWrap__imgWrap__img' src={logoSrc}></img>
                        </animated.div>
                      </div>
                    )
                  )
                }
                {/* {
                  isPayActive ? 
                    <div className='addImageButtonWrap__imgMask'></div>
                  : null
                } */}
                {/* logo背后呼吸灯 */}
                {
                  isCreateActive ? 
                    <div className="logoBreatheWrap">
                      <LogoBreathe />
                    </div>
                  : null
                }
              </animated.div>
            )
        )
      }
      {/* 提示文字 */}
      <div className={classNames("logoTips", isLogoActive && 'logoTips--active')}>
        <p className="logoTips__above">Upload the Organization Logo (JPG, JPEG, BMP, TIFF, WEBP)</p>
        <p className="logoTips__below">in 1:1 ratio and no less than 640px*640px</p>
      </div>
      {/* 左侧的back按钮 */}
      {
        step === 2 || step === 3 ?
          <div 
            onClick={handleLogoBack}
            className={classNames( 
              "fullscreenButton--left" 
              )}
            style={{bottom: 'calc(80 / 1080 * 100vh)', opacity: 1}}
            >Back</div>
        : null
      }
      {/* 右侧的next按钮 */}
      {
        [2,3].indexOf(step) >= 0 ? 
          <div 
            onClick={handleLogoNext}
            className={classNames( 
              "fullscreenButton--right", 
              logo && !isLogoCompleted && !isLogoBack && 'fullscreenButton--active', 
              )}
          >Next</div>
        : null
      }
    {/* 创建与付费 */}
      {/* 展示简介 */}
      <div className={classNames('createPageContent', !isCreateActive && 'createPageContent--fadeout')}>
        {
          contentArr ? 
            contentArr.map((word,index) => {
              const i = index % oInterpolate.length
              return (
                <animated.span
                key={index}
                style={{ opacity: oInterpolate[i] }}
                >
                  {word + ' '}
                </animated.span>
              )
            })
          : null
        }
      </div>
      {/* 右侧的create按钮 */}
      <div 
        onClick={handleCreateNext}
        className={classNames( 
          "fullscreenButton--right", 
          isCreateActive && 'fullscreenButton--active', 
          )}
      >Create</div>


    </>

}