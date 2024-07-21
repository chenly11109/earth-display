import React,{ useEffect, useState } from 'react'
import './index.scss'
import LargeShortTextInput from '../../../../design/CreateUnit/LargeShortTextInput'
import { useOrgPageStore } from '../../../../state/OrgPageState'
import SmallPromptDescription from '../../../../design/Orgnization/SmallPromptDescription'
import cn from 'classnames'


const useCreateUnitPageStore = useOrgPageStore.getState().CreateUnitPageStore


export default function FillName() {

  const { name, setName, abbr, setAbbr, setStep, setStepEnd } = useCreateUnitPageStore()

  const [mount, setMount] = useState(true)
  useEffect(()=>{
    setStepEnd(false)
  }, [])

  function handleNameChange(name: string){
    if(nameLess) setNameLess(false)
    setName(name)
  }
  function handleAbbrChange(abbr: string){
    if(abbrLess) setAbbrLess(false)
    setAbbr(abbr)
  }

  // next按钮出现
  const [showNext, setShowNext] = useState(false)
  if(name && abbr){
    if(showNext===false) setShowNext(true)
  } else {
    if(showNext===true) setShowNext(false)
  }

  // 判断name和abbr字数是否够多
  const [nameLess, setNameLess] = useState(false)
  const [abbrLess, setAbbrLess] = useState(false)
  function handleNext(){
    // 点击next判断字数，合格才能继续
    if(name.length < 6){
      setNameLess(true)
    } else if(abbr.length < 3){
      setAbbrLess(true)
    } else {
      setMount(false)
      setStepEnd(true)
      setTimeout(() => {
        setStep('uploadLogo')
      }, 300);
    }
  }

  return (
    <div className='fillName'>

      {/* title */}
      <div className="fillName__title">
        What is the name of the Unit ?
      </div>

      <div className="fillName__form">

        <div className="fillName__form__nameWrap">
          {/* Name */}
          <span className="fillName__form__nameWrap__name">Name :</span>
          <LargeShortTextInput
            value={name}
            handleChange={handleNameChange}
            maxlength={20}
            regexp={/^[{\p{Letter}{0-9}\s}]+$/u}
            className='fillName__form__nameWrap__nameInput'
            placeholder='Enter 6-20 letters & numbers'
          />
          <SmallPromptDescription
            content={
              <>
                <div>6-20 characters</div>
                <div>Only letters, numbers are allowed</div>
                <div>Name could not be modified once created</div>
              </>
            }
            width={399}
            height={96}
            className='fillName__form__nameWrap__namePrompt'
          />
          <div className="fillName__form__nameWrap__nameError" style={{opacity: nameLess ? 1 : 0}}>
            Unit name must be between 6-20 characters long
          </div>
        </div>

        <div className="fillName__form__abbrWrap">
          {/* ABBR */}
          <span className="fillName__form__abbrWrap__abbr">Abbreviation :</span>
          <LargeShortTextInput
            value={abbr}
            handleChange={handleAbbrChange}
            maxlength={6}
            regexp={/^[A-Z]+$/}
            className='fillName__form__abbrWrap__abbrInput'
            placeholder='Enter 3-6 uppercase letters'
          />
          <SmallPromptDescription
            content={
              <>
                <div>3-6 characters</div>
                <div>Only capital letters are allowed</div>
                <div>Name could not be modified once created</div>
              </>
            }
            width={399}
            height={96}
            className='fillName__form__abbrWrap__abbrPrompt'
          />
          <div className="fillName__form__abbrWrap__abbrError" style={{opacity: abbrLess ? 1 : 0}}>
            Unit abbreviation must be between 3-6 characters long
          </div>
        </div>


      </div>

      {/* next按钮 */}
      <div 
        className={cn(
          "fillName__nextButton unitButton",
          showNext && mount && 'unitButton--show'
        )}
        onClick={handleNext}
      >
          Next
      </div>

    </div>
  )
}
