import React,{ useEffect, useState } from 'react'
import './index.scss'
import AreaSelectionWithNotes from '../../../../design/CreateUnit/AreaSelectionWithNotes'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore

/**
 * 卡片的显示取决于 propsToAdd，点击每个卡片会改变 propsToAdd，
 * 点击back按钮时将propsToAdd同步到状态库properties，
 * 点击skip，清空properties，
 * 点击next，将propsToAdd同步到状态库properties
 */

export default function AddProperty() {

  const { setStep, setProperties, properties, setStepEnd } = useCreateUnitPageStore()

  const [propsToAdd, setPropsToAdd] = useState([] as string[])

  // 页面挂载的时候
  const [mount, setMount] = useState(false)
  useEffect(()=>{
    setMount(true)
    setStepEnd(false)
    setPropsToAdd([...properties])
  }, [])


  function ifHasTheProp(p: string){
    if(propsToAdd.findIndex(prop => prop===p) >= 0){
      return true
    } else {
      return false
    }
  }

  function checkProperty1(){
    const title = selections[0].title
    if(!ifHasTheProp(title)){
      setPropsToAdd([...propsToAdd, title])
    } else {
      const index = propsToAdd.findIndex(p => p===title)
      const t = [...propsToAdd]
      t.splice(index,1)
      setPropsToAdd([...t])
    }
  }
  function checkProperty2(){
    const title = selections[1].title
    if(!ifHasTheProp(title)){
      setPropsToAdd([...propsToAdd, title])
    } else {
      const index = propsToAdd.findIndex(p => p===title)
      const t = [...propsToAdd]
      t.splice(index,1)
      setPropsToAdd([...t])
    }
  }
  function checkProperty3(){
    const title = selections[2].title
    if(!ifHasTheProp(title)){
      setPropsToAdd([...propsToAdd, title])
    } else {
      const index = propsToAdd.findIndex(p => p===title)
      const t = [...propsToAdd]
      t.splice(index,1)
      setPropsToAdd([...t])
    }
  }
  function checkProperty4(){
    const title = selections[3].title
    if(!ifHasTheProp(title)){
      setPropsToAdd([...propsToAdd, title])
    } else {
      const index = propsToAdd.findIndex(p => p===title)
      const t = [...propsToAdd]
      t.splice(index,1)
      setPropsToAdd([...t])
    }
  }

  const selections = [
    {
      title: 'Burn - Personal',
      note: 'The owner of a Unit can burn a certain number of units in his possession at any time',
      handleCheck: checkProperty1,
    },
    {
      title: 'Burn - Macro-control',
      note: 'The controller of a Unit can burn a certain number of units of a certain owner at any time',
      handleCheck: checkProperty2,
    },
    {
      title: 'Mint - Macro-control',
      note: 'The controller of the Unit can mint the Unit to any organizations, applications and users at any time',
      handleCheck: checkProperty3,
    },
    {
      title: 'Freeze - Macro-control',
      note: 'The controller of the Unit can freeze all of the Unit for any user at any time',
      handleCheck: checkProperty4,
    },
  ]

  const titleStyle = {
    fontSize: 'calc(28/1080*100vh)',
    lineHeight: 'calc(28/1080*100vh)',
    paddingTop: 'calc(8/1080*100vh)'
  }
  const noteStyle = {
    fontSize: 'calc(22/1080*100vh)',
    lineHeight: 'calc(34/1080*100vh)'
  }

  // 点击按钮
  function handleBack(){
    // 保存选中的props到状态库
    setProperties([...propsToAdd])
    setStepEnd(true)
    setTimeout(() => {
      setStep('releaseAmount')
    }, 300);
  }
  function handleSkip(){
    // 清空properties
    setProperties([])
    setStepEnd(true)
    setTimeout(() => {
      setStep('confirmation')
    }, 300);
  }
  function handleNext(){
    // 保存选中的props到状态库
    setProperties([...propsToAdd])
    setStepEnd(true)
    setTimeout(() => {
      setStep('confirmation')
    }, 300);
  }
  console.log('properties',properties,'propsToAdd', propsToAdd)

  return (
    <div className='addProperty'>
      
      {/* title */}
      <div className="addProperty__title">
        <div className="addProperty__title__up">
          What property would you like this unit to have? 
        </div>
        <div className="addProperty__title__down">
          The decision is unchangeable and public to every user
        </div>
      </div>

      {/* properties */}
      <div className="addProperty__properties">

      {
        selections.map((s,index) => {
          return (
            <div key={index}>
              <AreaSelectionWithNotes
                title={s.title}
                note={s.note}
                status={ifHasTheProp(s.title) ? 'checked' : 'uncheck'}
                width={360}
                handleCheck={s.handleCheck}
                padding={28}
                titleStyle={titleStyle}
                noteStyle={noteStyle}
              />
            </div>
          )
        })
      }

      </div>

      {/* 按钮 */}
      <div 
        className={cn("addProperty__back unitButton", mount && 'unitButton--show')}
        onClick={handleBack}
      >
        Back
      </div>

      <div 
        className={cn("addProperty__skip unitButton", mount && 'unitButton--show')}
        onClick={handleSkip}
        style={{
          right: propsToAdd.length>=1 ? 'calc(306/1080*100vh)' : 'calc(120/1080*100vh)'
        }}
      >
        Skip
      </div>

      <div 
        className={cn("addProperty__next unitButton", propsToAdd.length>=1 && 'unitButton--show')}
        onClick={handleNext}
      >
        Next
      </div>

    </div>
  )
}
