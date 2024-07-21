import "./index.css";
import { useState } from "react";
import { useWorkflowStore } from "../../../state/workflow";

export default function AddNewTag({
  toggleAddTagState,
}: {
  toggleAddTagState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [text, setText] = useState("");
  const { addNewReward } = useWorkflowStore((state) => state.utils);
  return (
    <div className="fullPage_container">
      <div className="fullPage_background" />
      <div className="fullPage_contents_container">
        <div>Tag Name</div>
        <input
          type="text"
          style={{ fontSize: "30px" }}
          className="inputs"
          placeholder="Insert Tag Name"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div style={{ position: "relative", left: "700px" }}>
          <span
            className="details_button  details_button--reverse"
            onClick={() => {
              toggleAddTagState(false);
            }}
          >
            Cancel
          </span>
          <span
            className={`details_button ${
              text ? "" : "details_button--disabled"
            }`}
            onClick={() => {
              if (text) {
                addNewReward(text);
                toggleAddTagState(false);
              }
            }}
          >
            Add
          </span>
        </div>
      </div>
    </div>
  );
}
