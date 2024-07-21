import { createPortal } from "react-dom";
import { BouncyConfig } from "../../../../config/animation";
import { useTransition, animated } from "@react-spring/web";
import {ReactComponent as Exclamation } from "../exclamation.svg";

import { useState } from "react";
import "./index.scss";

let modalRoot: any = document.getElementById("modal-1");

if (!modalRoot) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function ResponsePopup({
  open,
  handleClose,
  status,
}: {
  open: boolean;
  handleClose: () => void;
  status: "networkError" | "serverError";
}) {
  const [modal, setOpenModal] = useState(true);
  const transitions = useTransition(open && modal, {
    from: { bottom: -100 },
    enter: { bottom: 50 },
    leave: { bottom: -100 },
    config: BouncyConfig,
  });

  const element = (
    <div
      style={{
        position: "absolute",
        zIndex: "1000",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {transitions(
        (styles, item) =>
          item && (
            <animated.div className="response_popup_container top_modal" style={{ ...styles, position: "absolute" }}>
                <Exclamation style={{margin:"0px 15px"}}/>
                <div style={{marginRight:"40px",marginLeft:"20px"}}>
                {status === "networkError"
                  ? "Failed to establish protocol connection, please check your network."
                  : "Failed to establish connection."}
                </div>
                
                <div
                className="close"
                  onClick={() => {
                    setOpenModal(false);
                    setTimeout(() => {
                      handleClose();
                    }, 1000);
                  }}
                >
                    X
                </div>
                
            </animated.div>
          )
      )}
    </div>
  );
  return createPortal(element, modalRoot);
}
