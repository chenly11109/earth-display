import { createPortal } from "react-dom";
import { GentleConfig } from "../../../../config/animation";
import {useTransition, animated} from "@react-spring/web"

let modalRoot: any = document.getElementById("modal-1");

if(!modalRoot){
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", "modal-1");
  document.body.appendChild(wrapperElement);
  modalRoot = wrapperElement;
}

export default function ModalWrapper({
  children,
  open
}: {
    open:boolean,
  children: React.ReactNode;
}) {
    const transitions = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: GentleConfig,
      });
  const element = (
  <div style={{position:"absolute", zIndex:"15", top:0, left:0}}>

     {transitions(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
                  {children}
            </animated.div>))}
    </div>
  );
  return createPortal(element, modalRoot);
}