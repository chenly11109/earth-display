import React,{ useEffect, useState } from 'react'
import './index.scss'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import OrgLogo from '../../../../design/Orgnization/OrgLogo'
import TitleNameInput from '../../../../design/Orgnization/TitleNameInput'
import ContentTextWireInput from '../../../../design/Orgnization/ContentTextWireInput'
import { useTransition, animated } from '@react-spring/web'
import cn from 'classnames'
import { service } from '../../../../api/service'
import { useHandleResponse, HandleResponseComponent } from '../../../../design/Orgnization/ModalResponse/HandleResponse'

const organizationId_test = '326856169455685'

const useCreateOrgPageStore = useOrgPageStore.getState().CreateOrgPageStore

export default function Basic() {
  const { name, setName, intro, setIntro, logoSrc } = useCreateOrgPageStore()
  const {
    status,
    showModal,
    handleServerError,
    handleNetworkError,
    handleRequestError,
    handleSuccess,
    handleTimeout,
  } = useHandleResponse();


  /* title */ 
  const [title, setTitle] = useState(name)
  function handleTitleChange(value:string){
    setTitle(value)
  }
  const [isTitleError, setTitleError] = useState(false)
  function correctTitleError(){
    setTitleError(false)
  }

  /* content */
  const [content, setContent] = useState(intro)
  function handleContentChange(value:string){
    setContent(value)
  }

  /* 点击edit */
  function editInfo(){
    setTitle(name)
    setContent(intro)
    setMaskExist(false)
  }

  /* cancel */
  function handleCancel(){
    setMaskExist(true)
  }

  /* save */
  function handleSave(){
    if(title===''){
      setTitleError(true)
    } else {
      const data = {
        logoUrl: logoSrc,
        organizationId: organizationId_test,
        organizationName: title,
        organizationProfile: content
      }

      showModal(true)
      if(!navigator.onLine){
        handleNetworkError();
      } else {
        service.post('/community/organization/basic', data)
          .then((resData: any) => {
            if (resData.data.code === 200) {
              setName(title)
              setIntro(content)
              setMaskExist(true)
              handleSuccess();
            } else {
              handleRequestError(resData.data.msg);
            }
          })
          .catch((error:any) => {
            if (error.includes("timeout")) {
              handleTimeout();
            } else {
              handleServerError();
            }
          });
      }
    }
  }

  /* 点击edit自动聚焦第一个输入框 */
  const nameInputEl = document.querySelector('.titleNameInputWrap__titleNameInput') as HTMLInputElement
  useEffect(()=>{
    if(nameInputEl){
      nameInputEl.focus()
      nameInputEl.click()
    }
  }, [nameInputEl])


  /**
   * 蒙版
   */
  const [isMaskExist, setMaskExist] = useState(true)
  const maskTransitions = useTransition(isMaskExist, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 }
  });
  const contentTransitions = useTransition(isMaskExist, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 }
  });

  return (
    <div className='basic'>

      {/* 蒙版（展示用） */}
      {
        maskTransitions(
          (styles, item) => 
            item && (
              <animated.div
                style={styles}
              >
                <div className="basicMask">
                  {/* logo */}
                  <div className="basicMask__logo">
                    <img src={`https://reachplatform.s3.us-east-2.amazonaws.com/${logoSrc}`}
                      alt="pos_logo" 
                      style={{width: 'calc(80/1080*100vh)',height: 'calc(80/1080*100vh)'}}
                    />
                  </div>
                  {/* title */}
                  <div className="basicMask__title">
                    {name}
                  </div>
                  {/* content */}
                  <div className="basicMask__content">
                    {intro ? intro : 'No description'}
                  </div>
                  <div 
                    className='modalButton editInfoButton'
                    onClick={editInfo}
                  >Edit Information</div>
                </div>
              </animated.div>
            )
        )
      }

      {/* 可修改 */}
      {
        contentTransitions(
          (styles, item) => 
            !item && (
              <animated.div
                style={{
                  ...styles,
                  width:'calc(786/1080*100vh)',
                  height:'calc(540/1080*100vh)'
                }}
              >
                <OrgLogo className='basicOrgLogo' />
                
                <TitleNameInput 
                  value={title} 
                  handleChange={handleTitleChange} 
                  placeholder='Enter Data Name' 
                  isError={isTitleError}
                  correctError={correctTitleError}
                  className='titleInput'
                  width={586}
                  maxlength={40}
                  size='large'
                />

                <ContentTextWireInput 
                  value={content} 
                  handleChange={handleContentChange} 
                  className='contentWireInput'
                  width={706}
                  maxLength={150}
                  placeholder='Describe your organization'
                />

                <div 
                  className={cn(
                    'modalButton cancelButton',
                    isMaskExist && 'cancelButton--disappear'
                  )}
                  onClick={handleCancel}
                >Cancel</div>

                <div 
                  className={cn(
                    'modalButton saveButton',
                    isMaskExist && 'saveButton--disappear'
                  )}
                  onClick={handleSave}
                >Save</div>

              </animated.div>
            )
        )
      }

      {/* response modal */}
      <HandleResponseComponent status={status} successMsg="Updated successfully" failureMsg = "Update failed" loadingMsg="Loading" />


    </div>
  )
}
