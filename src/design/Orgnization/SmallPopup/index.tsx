import React,{ useRef, useState } from 'react'
import './index.scss'
import Draggable from 'react-draggable';
import cn from 'classnames'
import {useClickAway} from 'react-use';
import { ReactComponent as ForkIcon } from './fork.svg'
import { animated, useTransition } from "@react-spring/web"
import { QuickConfig } from '../../../config/animation'
import { createPortal } from "react-dom";

let modalRoot: any = document.getElementById("modal-1");

if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function SmallPopup({
  children,
  title,
  handleClose,
  style,
  hasCloseButton,
  animation,
  showModal,
} : {
  children: React.ReactNode
  title: string
  handleClose?: ()=>void
  style: React.CSSProperties,
  hasCloseButton: boolean,
  animation: 'simple' | 'complex',
  showModal: boolean,
}) {
  // 聚焦动画
  const ref = useRef(null);
  const [clickOutside, setClickouside] = useState(false)
  useClickAway(ref, () => {
    const refCompare = document.getElementsByClassName("top_modal");
    if (refCompare[refCompare.length - 1] === ref.current){
      setClickouside(true)
    }
  });


  /**
   * 两种动画
   */
  const simpleTransitions = useTransition(showModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  })
  const complexTransitions = useTransition(showModal, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 1 },
    config: QuickConfig,
  })
  // complex时，background的出现消失控制
  const backgroundTransitions = useTransition(showModal, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  })


  const ele =  (
          animation==='simple' ? 
            simpleTransitions(
              (styles, item) => 
                item && (
                <animated.div style={styles}>
                  <div className='smallPopupWrap'>
                    <Draggable handle='.drag-handler' bounds='.smallPopupWrap' >
                    <div 
                        onAnimationEnd={()=>{setClickouside(false)}} 
                        ref={ref} 
                        className={cn(
                          "smallPopupWrap__popup top_modal", 
                          clickOutside && 'smallPopupWrap__popup--click'
                        )}
                        style={style}
                      >
                        <div className={cn(
                          "smallPopupWrap__popup__titleBar", 
                          "drag-handler",
                          clickOutside && "smallPopupWrap__popup__titleBar--click"  
                        )}>
                          {title}
                          {/* 关闭按钮 */}
                          {
                            hasCloseButton ? 
                            <div className="smallPopupWrap__popup__titleBar__iconWrap" onClick={handleClose}>
                              <ForkIcon className='smallPopupWrap__popup__titleBar__iconWrap__icon' />
                            </div>
                            : null
                          }
                        </div>
                        {
                          children
                        }
                      </div>
                    </Draggable>
                  </div>
                </animated.div>
                )
            )
          : 
          backgroundTransitions(
            (styles, item) => 
              item && (
                <animated.div style={styles}>
                  {
                    complexTransitions(
                      (styles, item) => 
                        item && (
                        <animated.div style={{...styles}} className='smallPopupWrap'>
                          <Draggable handle='.drag-handler' bounds='.smallPopupWrap' >
                            <div 
                              onAnimationEnd={()=>{setClickouside(false)}} 
                              ref={ref} 
                              className={cn(
                                "smallPopupWrap__popup top_modal", 
                                clickOutside && 'smallPopupWrap__popup--click'
                              )}
                              style={style}
                            >
                              <div className={cn(
                                "smallPopupWrap__popup__titleBar", 
                                "drag-handler",
                                clickOutside && "smallPopupWrap__popup__titleBar--click"  
                              )}>
                                {title}
                                {/* 关闭按钮 */}
                                {
                                  hasCloseButton ? 
                                  <div className="smallPopupWrap__popup__titleBar__iconWrap" onClick={handleClose}>
                                    <ForkIcon className='smallPopupWrap__popup__titleBar__iconWrap__icon' />
                                  </div>
                                  : null
                                }
                              </div>
                              {
                                children
                              }
                            </div>
                          </Draggable>
                        </animated.div>
                        )
                    )
                  }
                </animated.div>
              )
          )

  )

  return createPortal(ele, modalRoot);

}
