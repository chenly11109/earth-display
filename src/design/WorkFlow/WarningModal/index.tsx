import "./index.css";
import Modal from "../Modal";

export default function WarningModal({
  showModal,
  children,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Modal style={{ height: "200px", width: "400px" }} showModal={showModal}>
      <div
        onClick={() => {
          showModal(false);
        }}
        className="warningModal_container"
      >
        <div>! Warning</div>

        <div className="warningModal_contents_container">{children}</div>
        <hr className="warningModal_hr" />
        <div onClick={() => showModal(false)}>Done</div>
      </div>
    </Modal>
  );
}
