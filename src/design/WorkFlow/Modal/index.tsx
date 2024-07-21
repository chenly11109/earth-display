import "./index.css";
//React.HTMLAttributes<HTMLSpanElement>.style?: React.CSSProperties | undefined

export default function Modal({
  children,
  showModal,
  style,
}: {
  children: React.ReactNode;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  style: { width: string; height: string };
}) {
  return (
    <div className="modal_container">
      <div className="modal_background" />
      <div className="modal_box_container" style={style}>
        <span
          className="modal_close_button"
          onClick={(e) => {
            e.stopPropagation;
            showModal(false);
          }}
        >
          x
        </span>
        {children}
      </div>
    </div>
  );
}
