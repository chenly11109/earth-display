import React, { useRef, useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLeftBarStore } from "../../../state/leftBar";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as MinimizeIcon } from "../icons/minimize.svg";
import { ReactComponent as BackIcon } from '../icons/backButton.svg'
import { useTransition, animated } from "@react-spring/web";
import cn from 'classnames'
import {useClickAway} from 'react-use';
import SmallPopup from '../../Orgnization/SmallPopup'
import { useOrgPageStore } from "../../../state/OrgPageState";
import SelectorColor from "../../Orgnization/SelectorColor";
import "./index.scss";
import TitleNameInput from "../../Orgnization/TitleNameInput";
import SmallPromptDescription from "../../Orgnization/SmallPromptDescription";
import SecondConfirmationPopup from "../../Orgnization/SecondConfirmationPopup";
import SearchInput from "../../Orgnization/SearchInput";
import CheckableList from "../../Orgnization/CheckableList";
import { Member } from "../../../types/orgPage";
import { service } from "../../../api/service";
import NotificationPopup from "../../Orgnization/NotificationPopup";
import { HandleResponseComponent, useHandleResponse } from "../../Orgnization/ModalResponse/HandleResponse";
import { createPortal } from "react-dom";
import ResponseModal from "../../Orgnization/ModalResponse/ResponseModal";

const organizationId_test = '326856169455685'
const operatorId_test = '10001'

const useCreateOrgPageStore = useOrgPageStore.getState().CreateOrgPageStore
const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore

// 将modal挂载到root外，to 解决弹窗聚焦的bug
let modalRoot: any = document.getElementById("modal-1");
if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function Modal() {
  const { whyNotCompliant, setWhyNotCompliant, setName, setIntro,
    setLogoSrc } = useCreateOrgPageStore()
  const { isPositionCreating, addPosition, setPositionCreating, 
    isExistingPosSetting, setExistingPosSetting, isDeletingPos,
    setDeletingPos, delPosition, positions, members, isManagingMember, 
    setManagingMember, isAddingMembers, setAddingMembers,
    selectedMemberList, setSelectedMemberList, clearSelectedMemberList,
    orgSettingStep, modalWidth, modalHeight, setModalSize,
    idOfDeletingPosition, checkedMemberList, setCheckedMemberList,
    setMembersToAdd, checkAgainList, setCheckAgainList,
    updateSelectedMemberList, setOrgSettingStep, setPositions,
    isPosInfoModefied } = useOrgSettingPageStore()

  const location = useLocation();
  const {
    showModal,
    setShowModal,
    selectModalLink,
    closeModal,
    homePageLink,
    setHomePageLink,
    secondaryModal
  } = useLeftBarStore((state) => state);
  const openModal = useLeftBarStore((state) => state.modal.openModal);
  const selectedIndex = useLeftBarStore((state) => state.modal.selectedIndex);
  const currentModal = openModal.find((modal) => modal.index == selectedIndex);
  const currentSecondaryModal = secondaryModal.find(modal => modal.link === location.pathname.split('modal')[1])
  const navigate = useNavigate();
  


  /**
   * modal动画
   */
  //#region 

  
  const ref = useRef(null);
  const [clickOutside, setClickouside] = useState(false)
  useClickAway(ref, (e) => {
    const refCompare = document.getElementsByClassName("top_modal");
    if (refCompare[refCompare.length - 1] === ref.current){
      const leftBarEls = Array.from(document.getElementsByClassName('left_bar_container'))
      if(leftBarEls){
        let isLeftBar = false
        leftBarEls.forEach(el => {
          if(el.contains(e.target as Element)){
            isLeftBar = true
          }
        })
        if(!isLeftBar){
          setClickouside(true)
        }
      }
    }
  });

  const popupTransitions = useTransition(showModal || !homePageLink, {
    from: {
      opacity: 0,
      transform: "scale(0.2) translate(800px, 400px )",
    },
    enter: { opacity: 1, transform: "scale(1) translate(0px, 0px)"},
    leave: {
      opacity: 0,
      transform: "scale(0.2) translate(800px, 400px)",
    },
    config: { duration: 400 },
  });
  //#endregion

  // modal titlebar的回退
  function handleModalBack(){
    if(!(location.pathname==='/modal/organization/setting/pos_setting')){
      navigate("/modal" + currentSecondaryModal?.preLink)
    } else {  // pos_setting的步骤
      if(!isPosInfoModefied){  // 没有修改内容
        setExistingPosSetting(false)
        navigate('/modal/organization/setting')
      } else {
        setExistingPosSetting(true)
      }
    }
  }

  // 是否有回退按钮
  const noBackIconList = [ '/modal/organization/setting/pos_setting' ]
  const [secondaryButNoBackIcon, setSecondaryButNoBackIcon] = useState(false)
  useEffect(()=>{
    const p = location.pathname
    if(noBackIconList.indexOf(p) >= 0){
      setSecondaryButNoBackIcon(true)
    } else {
      setSecondaryButNoBackIcon(false)
    }
  }, [location.pathname])

  // modal大小响应式变化
  const numberOfSelected = selectedMemberList.length
  useEffect(() => {
    if(location.pathname === '/modal/organization/setting/pos_setting'){
      if(!isManagingMember){
        setModalSize(746,396)
      } else if(isManagingMember){
        if(numberOfSelected === 0){
          setModalSize(746,378)
        } else if(0 < numberOfSelected && numberOfSelected < 10){
          setModalSize(746,(854-(10-numberOfSelected)*56))
        } else {
          setModalSize(746,854)
        }
      }

    } else {
      setModalSize(1009,584)
    }
  }, [location.pathname, orgSettingStep, numberOfSelected, isManagingMember])


  /**
   * 上传图片不合规的modal
   */
  const handleNotificationPopupDone = () => {
    console.log('更新了why为空')
    setWhyNotCompliant('')
  };


  /**
   * create position
   */
  //#region 
  const [positionName, setPositionName] = useState('')
  function handlePositionNameChange(value:string){
    setPositionName(value)
  }
  const [positionColor, setPositionColor] = useState('#ffffff')
  function handleColorSelect(c: string){
    setPositionColor(c)
  }

  const [isPosNameError, setPosNameError] = useState(false)
  
  // create position 的按钮回调
  function cancelCreatePosition(){
    setPositionName('')
    setPositionColor('#ffffff')
    setPositionCreating(false)
  }
  function handleCreatePosition(){
    // 判断输入框是否为空
    if(positionName === ''){
      setPosNameError(true)
      return
    }
    const newPosition = {
      positionName: positionName,
      color: positionColor,
      members: []
    }
    const data = {
      members: [],
      name: positionName,
      organizationId: organizationId_test,
      representColor: positionColor,
      userId: operatorId_test
    }

    setType('create')
    showResponseModal(true)
    if(!navigator.onLine){
      handleNetworkError();
    } else {
      service.post('/community/pos/new', data)
        .then((resData: any) => {
          if (resData.data.code === 200) {
            addPosition(newPosition)
            setPositionName('')
            setPositionColor('#ffffff')
            setPositionCreating(false)
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
  //#endregion



  /**
   * position setting
   */
  //#region 
  // 确认退出position_settings
  function handleConfirmExist(){  // done
    setExistingPosSetting(false)
    setTimeout(() => {
      navigate('/modal/organization/setting')
    }, 600);
  }
  function handleCancelExist(){  // cancel
    setExistingPosSetting(false)
  }

  type PosInfo = {
    name: string
    number: number
    index: number
    color: string
  }
  // 确认删除position
  function handleConfirmDelete(){

      setType('delete')
      showResponseModal(true)
      if(!navigator.onLine){
        handleNetworkError();
      } else {
        service.get(`/community/pos/del?positionId=${idOfDeletingPosition}`)
          .then((resData: any) => {
            if (resData.data.code === 200) {
            // 更新state
            const {index} = location.state as PosInfo
            delPosition(index)
            setDeletingPos(false)
            setTimeout(() => {
              navigate('/modal/organization/setting')
            }, 600);
              handleSuccess();
            } else {
              handleRequestError(resData.data.msg);
            }
          })
          .catch((error:any) => {
            console.log('error', error)
            if (error.includes("timeout")) {
              handleTimeout();
            } else {
              handleServerError();
            }
          });
      }

  }
  function handleCancelDelete(){
    setDeletingPos(false)
  }
  //#endregion



  /**
   * add member
   */
  //#region 
  const [searchMemberValue, setSearchMember] = useState('')
  function handleSearchMemberChange(value: string){
    setSearchMember(value)
  }

  // checkableList
  const [checkableList, setCheckableList] = useState([] as Member[])

  // 初始化数据的反馈弹窗 status 和 open
  const [initStatus, setInitStatus] = useState<'loading'|'success'|'failure'>('loading')
  const [initOpen, setInitOpen] = useState(false)
  useEffect(()=>{
    // 定时器是为了modal展示完全之后，loading弹窗再出现
    setTimeout(() => {
      
      setInitOpen(true)
      if(!navigator.onLine){
        setInitStatus('failure')
        setInitOpen(false)
      } else {
        // GET Basic
        service.get(`/community/organization/basic?organizationId=${organizationId_test}`)
          .then((resData: any) => {
            if (resData.data.code === 200) {
              const {logoUrl, organizationName, organizationProfile} = resData.data.data
              setName(organizationName)
              setLogoSrc(logoUrl)
              setIntro(organizationProfile)
            } else {
              setInitStatus('failure')
              setInitOpen(false)
            }
            // GET Position
            service.get(`/community/pos/members?organizationId=${organizationId_test}`)
            .then((resData: any) => {
              if (resData.data.code === 200) {
                const poss = resData.data.data
                setPositions(poss)
                setInitStatus('success')
                setInitOpen(false)
              } else {
                setInitStatus('failure')
                setInitOpen(false)
              }
            })
          })
          .catch((error:any) => {
            setInitStatus('failure')
            setInitOpen(false)
          });
      }

    }, 600);
  }, [])

  useEffect(()=>{
    if(searchMemberValue===''){
      setCheckableList(members)
    } else {

      const t = [] as Member[]
      members.forEach(m => {
        if(m.userName.indexOf(searchMemberValue) >= 0){
          t.push(m)
        }
      })
      setCheckableList([...t])

    }
  }, [searchMemberValue, members])

  // 新一轮勾选的人员列表
  const [listOfThisTurn, setListOfThisTurn] = useState([] as Member[])
  function handleSelect(u: Member){
    // 选择的是在 selectedMemberList 里面的人  先存入checkAgainList
    // 之后 点击 cancel清空checkAgainList；点击done 去zustand删除checkAgainList里的人，清空checkAgainList
    if(selectedMemberList.findIndex(user => user.userId===u.userId) >= 0){
      if(checkAgainList.findIndex(user => user.userId===u.userId) >= 0){
        const temp = [...checkAgainList]
        const i = temp.findIndex(user => user.userId===u.userId)
        temp.splice(i, 1)
        setCheckAgainList([...temp])
        // checkedMemberList 把这个人加回来
        setCheckedMemberList([...checkedMemberList, u])
      } else {
        setCheckAgainList([...checkAgainList, u])
        // checkedMemberList 要delete这个人
        const index = checkedMemberList.findIndex(user => user.userId===u.userId)
        const tl = [...checkedMemberList]
        tl.splice(index, 1)
        setCheckedMemberList([...tl])
      }
    } else {
      if(checkedMemberList.findIndex(user => user.userId===u.userId)<0){
        setCheckedMemberList([...checkedMemberList, u])
      } else {
        const index = checkedMemberList.findIndex(user => user.userId===u.userId)
        const tmpList = [...checkedMemberList]
        tmpList.splice(index, 1)
        setCheckedMemberList([...tmpList])
      }
    }
  }
  
  // 弹窗的高度
  const numberOfMember = members.length
  const membersPopupHeight = numberOfMember >= 10 ? 
    806 : (806 - (10 - numberOfMember) * 56)

  // add members cancel
  function handleAddMembersCancel(){
    setListOfThisTurn([])
    setCheckAgainList([])
    setAddingMembers(false)
  }
  // add members done
  function handleAddMembersDone(){
    setMembersToAdd()
    updateSelectedMemberList([...checkedMemberList])
    setListOfThisTurn([])
    setAddingMembers(false)
  }

  //#endregion


  /**
   * response modal
   */
   const {
    status,
    showModal: showResponseModal,
    handleServerError,
    handleNetworkError,
    handleRequestError,
    handleSuccess,
    handleTimeout,
  } = useHandleResponse();

  /**
   * 反馈弹窗
   */
  const [type, setType] = useState('create')



  {/* modal */}
  const portalEl =  (
      popupTransitions(
        (styles, item) =>
          item && (
            <div className="mediumMountPopupBg">
              <animated.div 
                className={cn(
                  "mediumMountPopup top_modal", 
                  clickOutside && "mediumMountPopup--focusFlash",
                  openModal.length > 1 && 'mediumMountPopup--leftBarExist'
                )}
                style={{
                  ...styles,
                  width: `calc(${modalWidth}/1080*100vh`,
                  height: `calc(${modalHeight}/1080*100vh`
                }} 
                ref={ref} 
                onAnimationEnd={()=>{setClickouside(false)}} 
              >

                {/* 标题栏 */}
                <div className={cn("mediumMountPopup__titleBar", openModal.length > 1 && 'mediumMountPopup__titleBar--leftBarExist')}>
                  {/* 标题文字 */}
                  {
                    !location.pathname.split('/')[3] ?  // 由pathname判断是否是一级页面
                      <div 
                        className={cn(
                          "mediumMountPopup__titleBar__title", 
                          clickOutside && "mediumMountPopup__titleBar__title--focusFlash"
                        )}
                      >
                        {currentModal?.title}
                      </div>
                    : 
                    <div className="mediumMountPopup__titleBar__title--secondary">
                      {/* 返回按钮 */}
                      {
                        secondaryButNoBackIcon ? null : 
                        <div 
                          className="mediumMountPopup__titleBar__title--secondary__backButtonWrap"
                          onClick={handleModalBack}
                        >
                          <BackIcon className='mediumMountPopup__titleBar__title--secondary__backButtonWrap__icon' />
                        </div>
                      }

                      {/* title文字 */}
                      <div className="mediumMountPopup__titleBar__title--secondary__text"
                        style={{
                          left: secondaryButNoBackIcon ? 'calc(20 / 1080 *100vh)' : 'calc(40 / 1080 *100vh)'
                        }}
                      >
                        {currentSecondaryModal?.title}
                      </div>

                    </div>
                  }
                  {/* 收起按钮 */}
                  <div className={cn("mediumMountPopup__titleBar__minimizeIconWrap", clickOutside && "mediumMountPopup__titleBar__minimizeIconWrap--focusFlash")}
                    onClick={() => {
                      setShowModal(false);
                      setTimeout(() => { 
                        navigate(homePageLink || "/");
                        setHomePageLink("");
                      }, 300);
                    }}
                  >
                      <MinimizeIcon
                        className="mediumMountPopup__titleBar__minimizeIconWrap__minimizeIcon"
                      />
                  </div>
                  {/* 关闭按钮 */}
                  <div
                    className={cn("mediumMountPopup__titleBar__closeIconWrap", clickOutside && "mediumMountPopup__titleBar__closeIconWrap--focusFlash")}
                    onClick={() => {
                      closeModal();
                      if (openModal.length === 1 || openModal.length === 0) {
                        setTimeout(()=>{
                          navigate(homePageLink || "/");
                          setHomePageLink("");
                        },300)
                      }
                    }}
                  >
                    <CloseIcon
                      className="mediumMountPopup__titleBar__closeIconWrap__closeIcon"
                    />
                  </div>
                </div>

                {/* 侧边切换栏 */}
                  <div 
                    className={cn(
                      "mediumMountPopup__leftBar", 
                      clickOutside && "mediumMountPopup__leftBar--focusFlash" )}
                    style={{
                      height: `calc(${modalHeight}/1080*100vh)`,
                      width: openModal.length > 1 ? `calc(60/1080*100vh)` : '0',
                    }}
                  >
                    {openModal.map((modal) => (
                      <div
                        key={modal.index}
                        className='mediumMountPopup__leftBar__titleBg'
                        onClick={() => {
                          selectModalLink(
                            modal.index,
                            location.pathname.split("modal")[1]
                          );
                          navigate(
                            "/modal" +
                              openModal.find(
                                (openmodal) => openmodal.index === modal.index
                              )?.link || "/"
                          );
                        }}
                      >
                        <div className={cn("mediumMountPopup__leftBar__titleBg__title", modal.index === selectedIndex && 'mediumMountPopup__leftBar__titleBg__title--selected')}>
                          {modal.abbr}
                        </div>
                      </div>
                    ))}
                  </div>

                {/* container */}
                <div 
                  className="mediumMountPopup__container"
                  style={{height: `calc(${modalHeight-44}/1080*100vh)`}}
                >
                  <Outlet />
                </div>

              </animated.div>
            </div>
          )
      )
  )

  const otherEls = (
    <>
      {/* create position */}
      <SmallPopup 
        title='Create Position'
        style={{
          width: 'calc(746/1080*100vh)', 
          height: 'calc(330/1080*100vh)'
        }}
        hasCloseButton={false}
        animation='complex'
        showModal={isPositionCreating}
      >
        <div className="smallPopupContent">
          <span className="nameText">Name :</span>
          <TitleNameInput 
            placeholder="Enter Position Name"
            value={positionName}
            handleChange={handlePositionNameChange}
            width={344}
            className='smallPopupContent__input'
            isError={isPosNameError}
            correctError={()=>setPosNameError(false)}
            maxlength={20}
          />
          <SmallPromptDescription 
            content = {
              <>
                <div>1-20 characters</div>
                <div>Only letters, number, space</div>
                <div>Name can be changed</div>
              </>
            }
            width={270}
            height={96}
            className="smallPopupContent__prompt"
          />

          <span className="colorText">Represent color :</span>
          <SelectorColor 
            selectedColor={positionColor} 
            handleSelect={handleColorSelect} 
            className='smallPopupContent__colorSelector'
          />

          <div 
            className="modalButton smallPopupContent__cancelButton"
            onClick={cancelCreatePosition}
          >Cancel</div>

          <div 
            className="modalButton smallPopupContent__createButton"
            onClick={handleCreatePosition}
          >Create</div>

        </div>
      </SmallPopup>

      {/* 上传图片不合规的modal */}
      <NotificationPopup
        showModal={whyNotCompliant!==''}
        handleDone={handleNotificationPopupDone}
        title="Error"
        content={whyNotCompliant}
      />

      {/* 确认退出position_settings的弹窗 */}
      <SecondConfirmationPopup 
        content='Your edits will not be saved, please make sure to exit'
        showModal={isExistingPosSetting}
        title='Warning'
        handleDone={handleConfirmExist}
        handleCancel={handleCancelExist}
      />

      {/* 确认是否删除position的弹窗 */}
      <SecondConfirmationPopup 
        content='Please confirm whether to delete the position'
        showModal={isDeletingPos}
        title='Warning'
        handleDone={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      {/* Organization Members */}
      <SmallPopup
        title="Organization Members"
        style={{
          width: 'calc(686/1080*100vh)', 
          height: `calc(${membersPopupHeight}/1080*100vh)`
        }}
        hasCloseButton={false}
        animation='complex'
        showModal={isAddingMembers}
      >
        <div className="addMember">
          {/* 搜索框 */}
          <SearchInput 
            placeholder='Search Organization Member'
            value={searchMemberValue}
            handleChange={handleSearchMemberChange}
            size= 'large'
            width={606}
            className='addMember__searchInput'
          />
          {/* 人员列表 */}
          <CheckableList
            list={checkableList} 
            selectedList={checkedMemberList} 
            handleSelect={handleSelect}
            className='addMember__memberList'
            width={606}
            gap={8}
            liHeight={48}
          />
          {/* cancel按钮 */}
          <div 
            className="modalButton addMember__cancelButton"
            onClick={handleAddMembersCancel}
          >Cancel</div>
          {/* done按钮 */}
          {
            checkedMemberList.length > 0 || listOfThisTurn.length > 0 ? 
            <div 
              className="modalButton addMember__doneButton"
              onClick={handleAddMembersDone}
            >Done</div>
            : null
          }
        </div>
      </SmallPopup>

      {/* response modal */}
      <HandleResponseComponent status={status} 
        successMsg= {
          type==='create' ? "Created successfully" :
          type==='load' ? 'Loaded successfully' :
          'Deleted successfully'
        }
        failureMsg = {
          type==='create' ? "Create failed" :
          type==='load' ? 'Load failed' :
          'Delete failed'
        }
        loadingMsg="Loading" 
      />

      {/* loading modal */}
      <ResponseModal 
        status={initStatus}
        msg="loading"
        open={initOpen}
      />

    </>
  )

  // return createPortal(element, modalRoot);
  return (
    <>

      { createPortal(portalEl, modalRoot) }

      { otherEls }

    </>
  )

}
