import "./index.scss";
import { useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { QuickConfig } from "../../../config/animation";
import {useClickAway} from 'react-use';
import classNames from "classnames";
import { createPortal } from "react-dom";


let modalRoot: any = document.getElementById("modal-1");

if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function NotificationPopup({
  content,
  showModal,
  title,
  handleDone,
}: {
  content: string;
  showModal: boolean;
  title: string;
  handleDone: () => void;
}) {
  const transitions = useTransition(showModal, {
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    config: QuickConfig,
  });
  const ref = useRef(null);
  const [clickOutside, setClickouside] = useState(false)
  useClickAway(ref, () => {
    const refCompare = document.getElementsByClassName("top_modal");
    if (refCompare[refCompare.length - 1] === ref.current){ console.log("clickoutside");setClickouside(true);}
    
  });
  const popup = document.getElementsByClassName('notificationPopup__container')[0]
  if(popup){
    popup.addEventListener('animationend', ()=>{
      setClickouside(false)
    })
  }

  const element = transitions(
    ({ scale }, item) =>
      item && (
        <div className="notificationPopup">
          <animated.div
            ref={ref}
            className={classNames("notificationPopup__container","top_modal", clickOutside && "notificationPopup__container--click")}
            style={{ transform: scale.to((scale) => `scale(${scale})`) }}
          >
            <div className={classNames("notificationPopup__container__title", clickOutside && "notificationPopup__container__title--click")}>{title}</div>
            <div className="notificationPopup__container__contents">{content}</div>
            <div className="notificationPopup__container__button" onClick={handleDone}>
              Done
            </div>
          </animated.div>
        </div>
      )
  );

  

  return createPortal(element, modalRoot);
}
