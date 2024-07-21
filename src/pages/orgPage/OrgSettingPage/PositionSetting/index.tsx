import React,{ useEffect, useState } from 'react'
import './index.scss'
import TitleNameInput from '../../../../design/Orgnization/TitleNameInput'
import SelectorColor from '../../../../design/Orgnization/SelectorColor'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import { ReactComponent as PlusIcon } from './plus.svg'
import SearchInput from '../../../../design/Orgnization/SearchInput'
import RemovableList from '../../../../design/Orgnization/RemovableList'
import { Member } from '../../../../types/orgPage'
import { useTransition, animated } from '@react-spring/web'
import { service } from '../../../../api/service'
import { useHandleResponse, HandleResponseComponent } from '../../../../design/Orgnization/ModalResponse/HandleResponse'
import ResponseModal from '../../../../design/Orgnization/ModalResponse/ResponseModal'

const organizationId_test = '326856169455685'
const operatorId_test = '10001'

const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore

export default function PositionSetting() {
  const { setExistingPosSetting, setDeletingPos, updatePosition,
    isManagingMember, setManagingMember, setAddingMembers, selectedMemberList,
    deleteSelectedMemberList, initMembers, setIdOfDeletingPosition,
    setSelectedMemberList, clearSelectedMemberList, membersToAdd,
    checkAgainList, clearMembersToAdd, checkedMemberList, setCheckedMemberList, 
    setCheckAgainList, isPosInfoModefied, setPosInfoModefied,
     }  = useOrgSettingPageStore()
    const location = useLocation()
    const navigate = useNavigate()

    const {
      status,
      showModal,
      handleServerError,
      handleNetworkError,
      handleRequestError,
      handleSuccess,
      handleTimeout,
    } = useHandleResponse();

  const [settingOpen, setSettingOpen] = useState(false)
  const [settingStatus, setSettingStatus] = useState<'loading'|'success'|'failure'>('loading')
  useEffect(()=>{
    clearMembersToAdd()
    setCheckAgainList([])
    // 获得初始数据，用于判断用户是否修改数据
    let initialMembers = [] as Member[]

    // get members
    setSettingOpen(true)
    if(!navigator.onLine){
      handleNetworkError();
      setSettingStatus('failure')
      setSettingOpen(false)
    } else {

      service.get(`/community/pos/members?organizationId=${organizationId_test}`)
        .then((resData: any) => {
          if (resData.data.code === 200) {
            resData.data.data.forEach(pos => {
              if(pos.positionId===positionId){
                clearSelectedMemberList()
                setSelectedMemberList(pos.members)
                setCheckedMemberList(pos.members)
                initialMembers = [...pos.members]
                // 初始化数据
                setInitialInfo([positionName, color, initialMembers])
              }
            })
          } else {
            setSettingStatus('failure')
            setSettingOpen(false)
          }
        })

        service.get(`/community/member/all?organizationId=${organizationId_test}`)
          .then((resData: any) => {
            if (resData.data.code === 200) {
              const allMembers = resData.data.data.pop().members
              initMembers(allMembers)
              setSettingStatus('success')
              setSettingOpen(false)
            } else {
              setSettingStatus('failure')
              setSettingOpen(false)
            }
          })

        .catch((error:any) => {
          setSettingStatus('failure')
          setSettingOpen(false)
        });
    }

  }, [])

  // 初始数据
  const [initialInfo, setInitialInfo] = useState([] as any[])

  type PosInfo = {
    index: number
    positionName: string
    color: string
    organizationId: string
    positionId: string
    members: [
      {
        userName: string
        userId: string
        logo: string
      }
    ]
  }
  const {positionName, color, positionId, index} = location.state as PosInfo
  const [posName, setPosName] = useState(positionName)
  function handlePositionNameChange(v:string){
    setPosName(v)
  }
  const [isPosNameError, setPosNameError] = useState(false)
  const [positionColor, setPositionColor] = useState(color)
  function handleColorSelect(c: string){
    setPositionColor(c)
  }

  function shallowEqual(object1: any, object2: any) {

    if(!object1 || !object2) return false
    return ( object1.userId === object2.userId || 
            object1.userName === object2.userName || 
            object1.positionId === object2.positionId || 
            object1.logo === object2.logo )
  
  }
  // 比较两个数组是否相等
  function compareArray(arr1: any[], arr2: any[]){
    const array1 = arr1.flat()
    const array2 = arr2.flat()
    for(let i=0; i<array1.length; i++){
      if(typeof(array1[i]) === 'object'){
        if(shallowEqual(array1[i], array2[i]) === false){
          return false
        }
      } else {
        if(array1[i] !== array2[i]){
          return false
        }
      }
    }

    return true
  }

  useEffect(()=>{
    const modifiedInfo = [posName, positionColor, checkedMemberList]
    // 比较 modifiedInfo 和 initialInfo
    setPosInfoModefied(!compareArray(modifiedInfo, initialInfo))
  }, [posName,positionColor,checkedMemberList,initialInfo])

  // 按钮的回调
  function cancelPosSetting(){
    console.log('isPosInfoModefied',isPosInfoModefied)
    // 比较 modifiedInfo 和 initialInfo
    if(!isPosInfoModefied){  // 如果没有修改
      setExistingPosSetting(false)
      navigate('/modal/organization/setting')
    } else {
      setExistingPosSetting(true)
    }
  }
  function handleDeletePos(){
    setIdOfDeletingPosition(positionId)
    setDeletingPos(true)
  }
  function handleManageMembers(){
    setManagingMember(true)
  }
  function savePosSetting(){
    if(posName === ''){
      setPosNameError(true)
      return
    }
    // 1.update position
    const updatePos = {
      color: positionColor,
      name: posName,
      positionId: positionId
    }
    // 2.add members to position
    type MembersInfos = {
      userName: string
      userId: string
    }
    let membersInfos = [] as MembersInfos[]
    membersToAdd.forEach(m => {
      membersInfos = [...membersInfos, {userId: m.userId, userName: m.userName}]
    })
    console.log('membersInfos',membersInfos)
    const addMembersToPos = {
      members: [...membersInfos],
      organizationId: organizationId_test,
      positionId: positionId,
      userId: operatorId_test
    }
    // 更新状态库
    const updatedPos = {
      color: positionColor,
      positionName: posName,
      positionId: positionId,
      organizationId: organizationId_test,
      members: checkedMemberList
    }
    updatePosition(index, updatedPos)

    // 连续三次请求 
      setType('update')
      showModal(true)
      if(!navigator.onLine){
        handleNetworkError();
      } else {
        // 1. update pos
        service.post('/community/pos/update', updatePos)
          .then((resData: any) => {
            // 2. add members
            service.post('/community/pos/members', addMembersToPos)
              .then((res: any) => {
                // 3. delete members
                if(checkAgainList.length){
                  checkAgainList.forEach(u => {
                    const delInfo = {
                      "organizationId": organizationId_test,
                      "positionId": positionId,
                      "userId": u.userId
                    }
                    service.delete('/community/pos/members', {data: delInfo})
                      .then(resData => {
                        handleSuccess();
                        setTimeout(() => {
                          navigate('/modal/organization/setting')
                        }, 1200);
                      })
                      .catch((error:any) => {
                        if (error.includes("timeout")) {
                          handleTimeout();
                        } else {
                          handleServerError();
                        }
                      });
                  })
                } else {
                  handleSuccess();
                  setTimeout(() => {
                    navigate('/modal/organization/setting')
                  }, 1200);
                }
              })
              .catch((error:any) => {
                if (error.includes("timeout")) {
                  handleTimeout();
                } else {
                  handleServerError();
                }
              });

          })
      }

  }


  /**
   * isManagingMembers
   */
  const [searchValue, setSearchValue] = useState('')
  function handleSearchChange(value: string){
    setSearchValue(value)
  }
  // 添加member
  function addMembers(){
    setAddingMembers(true)
  }

  // Back
  function handleManageBack(){
    setManagingMember(false)
  }
  // 删除member
  function handleDeleteMember(u: Member){
    deleteSelectedMemberList(u)
  }

  const [removableList, setRemovableList] = useState([] as Member[])
  useEffect(()=>{
    setRemovableList([...selectedMemberList])
  }, [selectedMemberList])
  useEffect(()=>{
    if(searchValue===''){
      setRemovableList(selectedMemberList)
    } else {

      const t = [] as Member[]
      selectedMemberList.forEach(m => {
        if(m.userName.indexOf(searchValue) >= 0){
          t.push(m)
        }
      })
      setRemovableList([...t])

    }
  }, [searchValue])

  /**
   * 动画
   */
  const settingTransitions = useTransition(isManagingMember, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  })
  const manageTransitions = useTransition(isManagingMember, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  })


  /**
   * 哪种弹窗
   */
  const [type, setType] = useState('load')


  return (
    <div className='pos_setting'>

      {
      positionName !== 'Captain' ? 
        settingTransitions(
          (styles, item) => 
            !item && (
              <animated.div
                style={styles}
              >

                <>
                  <span className="nameText">Name :</span>
                  <TitleNameInput 
                    placeholder="Enter Position Name"
                    value={posName}
                    handleChange={handlePositionNameChange}
                    width={363}
                    className='pos_setting__input'
                    isError={isPosNameError}
                    correctError={()=>setPosNameError(false)}
                    maxlength={20}
                  />
        
                  <span className="colorText">Represent color :</span>
                  <SelectorColor 
                    selectedColor={positionColor} 
                    handleSelect={handleColorSelect} 
                    className='pos_setting__colorSelector'
                  />
        
                  <span className="memberText">Member :</span>
                  <div 
                    className="modalButton pos_setting__memberButton"
                    onClick={handleManageMembers}
                  >Manage Members</div>
        
                  <div 
                    className="deleteButton pos_setting__deleteButton"
                    onClick={handleDeletePos}
                  >Delete</div>
                  <div 
                    className="modalButton pos_setting__cancelButton"
                    onClick={cancelPosSetting}
                  >Cancel</div>
                  <div 
                    className="modalButton pos_setting__saveButton"
                    onClick={savePosSetting}
                  >Save</div>
                </>

              </animated.div>
            )
        )
      : 
        <h2>Captain Detail Page</h2>
      }

      {
        manageTransitions(
          (styles, item) => 
            item && (
              <animated.div
                style={styles}
              >

                <>
                  <div className="pos_setting__title">Position Member</div>
                  {/* 搜索框 */}
                  <SearchInput 
                    placeholder='Search Position Member'
                    value={searchValue}
                    handleChange={handleSearchChange}
                    size= 'large'
                    width={666}
                    className='pos_setting__searchInput'
                  />

                  {
                    // 当selectedMemberList为空
                    selectedMemberList.length === 0 ? 
                    <div className="pos_setting__noMember">No Member</div>
                    : null
                  }
                  {/* member列表 */}
                  <RemovableList 
                    list={removableList} 
                    handleDelete={handleDeleteMember}
                    width={666}
                    gap={8}
                    liHeight={48}
                    className='pos_setting__removeList'
                  />

                  {/* back按钮 */}
                  <div 
                    className="modalButton pos_setting__backButton"
                    onClick={handleManageBack}
                  >Back</div>
                  {/* + members按钮 */}
                  <div 
                    className="modalButton pos_setting__addMembersButton"
                    onClick={addMembers}
                  >
                    <PlusIcon className='pos_setting__addMembersButton__plusIcon' />
                    New Members</div>
                </>

              </animated.div>
            )
        )
      }

      {/* response modal */}
      <HandleResponseComponent status={status} 
        successMsg={
          type==='load' ? "Loaded successfully" :
          'Updated successfully'
        }
        failureMsg = {
          type==='load' ? "Load failed" :
          'update failed'
        }
        loadingMsg="Loading" 
      />

      <ResponseModal
        open={settingOpen}
        msg='loading'
        status={settingStatus}
      />


    </div>
  )
}
