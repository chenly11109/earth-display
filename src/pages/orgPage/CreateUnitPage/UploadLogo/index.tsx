import React, { useEffect, useState } from 'react'
import './index.scss'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import AddImageButton from '../../../../design/Orgnization/AddImageButton'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore


export default function UploadLogo() {

  const { abbr, setStep, setStepEnd, whyNotCompliant, setWhyNotCompliant,
    setLogo, setLogoSrc, logoSrc } = useCreateUnitPageStore()

  // 页面挂载
  const [mount, setMount] = useState(false)
  useEffect(()=>{
    setMount(true)
    setStepEnd(false)
  }, [])

  // 上传logo
  const [uploadState, setUploadState] = useState<'initial' | 'uploaded'>('initial')

  // 点击按钮
  function handleBack(){
    setMount(false)
    setStepEnd(true)
    setTimeout(() => {
      setStep('fillName')
    }, 300);
  }
  function handleNext(){
    setMount(false)
    setStepEnd(true)
    setTimeout(() => {
      setStep('releaseAmount')
    }, 300);
  }

  /**
   * addImageButton props
   */
  const handleNotificationPopupDone = () => {
    setWhyNotCompliant('')
  };
  // 自定义 onSuccess
  function customSuccess(file:File, src:string) {
    // 更新uploadState
    if(!whyNotCompliant){
      setUploadState('uploaded')
      setLogo(file)
      setLogoSrc(src)
    }
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


  return (
    <div className='uploadLogo'>
      
      {/* title */}
      <div className="uploadLogo__title">
        Logo of <span className='uploadLogo__title__abbr'>{abbr}</span>
      </div>

      {/* add image button */}
      <AddImageButton 
        uploadState={uploadState as 'initial' | 'uploaded'} 
        setUploadState={()=>setUploadState('uploaded')}
        shape='circle'
        className='uploadLogo__addImage'
        handleNotificationPopupDone={handleNotificationPopupDone}
        customSuccess={customSuccess}
        handleRequsetSuccess={handleRequsetSuccess}
        showAddImageModal={showAddImageModal}
        modalContent={whyNotCompliant}
        imgSrc={logoSrc}
        handlePixelWrong={handlePixelWrong}
        handleProportionWrong={handleProportionWrong}
      />

      {/* 提示文字 */}
      <div className={cn("uploadLogo__tips")}>
        <p className="uploadLogo__tips__above">
          Upload the Unit Logo (JPG, JPEG, BMP, TIFF, WEBP)
        </p>
        <p className="uploadLogo__tips__below">
          in 1:1 ratio and no less than 640px*640px
        </p>
      </div>

      {/* back按钮 */}
      <div 
        className={cn("uploadLogo__back unitButton", mount && 'unitButton--show')}
        onClick={handleBack}
      >
        Back
      </div>
      
      {/* next按钮 */}
      <div 
        className={cn("uploadLogo__next unitButton", mount && logoSrc && 'unitButton--show')}
        onClick={handleNext}
      >
        Next
      </div>

    </div>
  )
}
