import ModalWrapper from "../ModalWrapper.tsx";
import "./index.scss";
import { ReactComponent as CorrectIcon } from "../correct.svg";
import { ReactComponent as WrongIcon } from "../wrong.svg";
import Spinning from "../Spinning";

function renderContent(status: string) {
  switch (status) {
    case "loading":
      return <Spinning height={32} width={32} />;

    case "failure":
      return <WrongIcon />;

    case "success":
    default:
      return <CorrectIcon />;
  }
}

export default function ResponseModal({
  open,
  status,
  msg,
}: {
  open: boolean;
  status: "loading" | "success" | "failure";
  msg: string;
}) {
  const content = renderContent(status);
  return (
    <ModalWrapper open={open}>
      <div className="response_modal_wrapper">
        <div className="container"  >
          <div className="icon">
          {content}
          </div>
          <div style={{whiteSpace:"nowrap"}}>{msg}</div>
        </div>
      </div>
    </ModalWrapper>
  );
}
