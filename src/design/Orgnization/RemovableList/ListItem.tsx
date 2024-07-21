import React, { useState } from 'react'
import IconDeleteButton from '../IconDeleteButton'
import cn from 'classnames'
import SecondConfirmationPopup from '../SecondConfirmationPopup'
import { Member } from '../../../types/orgPage'
import { service } from '../../../api/service'
import { useOrgPageStore } from '../../../state/OrgPageState'
import { useLocation } from 'react-router-dom'
const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore
import { useHandleResponse, HandleResponseComponent } from '../ModalResponse/HandleResponse'

const organizationId_test = '326856169455685'

export default function ListItem({
  item,
  index,
  handleDelete,
  gap,
  liHeight
} : {
  item: Member
  index: number
  handleDelete: (u: Member)=>void
  gap: number
  liHeight: number
}) {
  const location = useLocation()
  const { positionId } = location.state
  const { selectedMemberList, checkedMemberList, deleteSelectedMemberList }  = useOrgSettingPageStore()

  const [isHover,setHover] = useState(false)
  const [isModalShow, setShow] = useState(false)

  function handleDone(){
    const { userId } = selectedMemberList[index]
    const i = checkedMemberList.findIndex(p => p.userId === userId)
    console.log(selectedMemberList[index])
    deleteSelectedMemberList(selectedMemberList[index])
    setShow(false)
  }

  const uname = item.userName.split('#')[0]
  const randomString = `#${item.userName.split('#')[1]}`

  const {
    status,
    showModal,
    handleServerError,
    handleNetworkError,
    handleRequestError,
    handleSuccess,
    handleTimeout,
  } = useHandleResponse();


  return (
    <>
      <li className="movableList__li" key={index}
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        style={{
          marginBottom: `calc(${gap}/1080*100vh)`,
          height: `calc(${liHeight}/1080*100vh)`,
        }}
      >
        <div className="movableList__li__logo">
          <img src={`https://reachplatform.s3.us-east-2.amazonaws.com/${item.logo}`} alt="" />
        </div>
          <span style={{color: "#fff"}}>{uname}</span>
          <span style={{color: '#939393'}}>{randomString}</span>
        <IconDeleteButton 
          className={cn(
            'movableList__li__deleteButton', 
            isHover && 'movableList__li__deleteButton--active'
          )} 
          handleClick={()=>setShow(true)} 
        />
      </li>
      <SecondConfirmationPopup 
        content='Confirm whether to delete it'
        showModal={isModalShow}
        title='Warning'
        handleDone={handleDone}
        handleCancel={()=>setShow(false)}
      />

      <HandleResponseComponent status={status} successMsg="Deleted successfully" failureMsg = "Delete failed" loadingMsg="Loading" />

    </>
  )
}
