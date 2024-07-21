import React, { useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import "./index.scss";
import Draggable from "react-draggable";
import cn from "classnames";
import { useClickAway } from "react-use";
import { ReactComponent as ForkIcon } from "./fork.svg";
import { createPortal } from "react-dom";
import { GentleConfig } from '../../../config/animation'
let modalRoot: any = document.getElementById("modal-1");

if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export function SmallPopupInside({
  children,
  title,
  handleClose,
  height,
  width,
  top,
  closeButton,
  open
}: {
  children: React.ReactNode;
  title: string;
  height?: number;
  width?: number;
  top?: number;
  closeButton?: boolean;
  handleClose: () => void;
  open:boolean
}) {
  const element = (

  <div style={{position:"absolute", zIndex:"15"}}>
    <SmallPopupContent
      title={title}
      handleClose={handleClose}
      height={height}
      width={width}
      top={top}
      closeButton={closeButton}
      open={open}
    >
      {children}
    </SmallPopupContent>
    </div>
  );
  return createPortal(element, modalRoot);
}

export default function SmallPopupContent({
  children,
  title,
  handleClose,
  height,
  width,
  top,
  closeButton,
  open
}: {
  children: React.ReactNode;
  title: string;
  height?: number;
  width?: number;
  top?: number;
  closeButton?: boolean;
  handleClose: () => void;
  open:boolean
}) {
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: GentleConfig,
  });

  // 聚焦动画
  const ref = useRef(null);
  const [clickOutside, setClickouside] = useState(false);
  useClickAway(ref, () => {
   
    const refCompare = document.getElementsByClassName("top_modal");
    if(refCompare[refCompare.length-1] === ref.current)setClickouside(true);
  });

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <div className="smallPopupWrap top_modal">
                <Draggable handle=".drag-handler" bounds=".smallPopupWrap">
                  <div
                    onAnimationEnd={() => {
                      setClickouside(false);
                    }}
                    ref={ref}
                    className={cn(
                      "smallPopupWrap__popup",
                      clickOutside && "smallPopupWrap__popup--click"
                    )}
                    style={{
                      width: width && width + "px",
                      height: height && height + "px",
                      top: top && top + "px",
                    }}
                  >
                    <div
                      className={cn(
                        "smallPopupWrap__popup__titleBar",
                        "drag-handler",
                        clickOutside && "smallPopupWrap__popup__titleBar--click"
                      )}
                    >
                      {title}
                      {closeButton && (
                        <div
                          className="smallPopupWrap__popup__titleBar__iconWrap"
                          onClick={handleClose}
                        >
                          <ForkIcon className="smallPopupWrap__popup__titleBar__iconWrap__icon" />
                        </div>
                      )}
                    </div>
                    {children}
                  </div>
                </Draggable>
              </div>
            </animated.div>
          )
      )}
    </>
  );
}
