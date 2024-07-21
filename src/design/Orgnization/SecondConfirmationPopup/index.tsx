import "./index.scss";
import { useTransition, animated } from "@react-spring/web";
import { QuickConfig } from "../../../config/animation";
import {useClickAway} from 'react-use';
import { useRef, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

let modalRoot: any = document.getElementById("modal-1");

if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function SecondConfirmationPopup({
  content,
  showModal,
  title,
  handleDone,
  handleCancel
}: {
  content: string;
  showModal: boolean;
  title: string;
  handleDone: () => void;
  handleCancel: ()=>void
}) {
  const transitions = useTransition(showModal, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: QuickConfig
  });
  const ref = useRef(null);
  const [clickOutside, setClickouside] = useState(false)
  useClickAway(ref, () => {
    const refCompare = document.getElementsByClassName("top_modal");
    if (refCompare[refCompare.length - 1] === ref.current){
      setClickouside(true)
    }
  });

  const popup = document.getElementsByClassName('secondConfirmationPopup__container')[0]
  if(popup){
    popup.addEventListener('animationend', ()=>{
      setClickouside(false)
    })
  }

  
  const el = transitions(
    ({ scale }, item) =>
      item && (
        <div className="secondConfirmationPopup" >
          <animated.div
            ref={ref}
            className={classNames("secondConfirmationPopup__container top_modal", clickOutside && 'secondConfirmationPopup__container--click')}
            style={{ transform: scale.to((scale) => `scale(${scale})`) }}
          >
            <div className={classNames("secondConfirmationPopup__title", clickOutside && 'secondConfirmationPopup__title--click')}>
              {title}
            </div>

            <div className="secondConfirmationPopup__contents">
              {content}
              </div>
            <div className="secondConfirmationPopup__buttonWrap">
              <div className="buttonWrap__button--done" onClick={handleDone}>
                Done
              </div>
              <div className="buttonWrap__button--cancel" onClick={handleCancel}>
                Cancel
              </div>
            </div>
          </animated.div>
        </div>
      )
  );

  return createPortal(el, modalRoot)
}
