import "./index.css";
import { useWorkflowStore } from "../../../state/workflow";
import { useState } from "react";
import { ReactComponent as EnterLogo } from "../../../design/WorkFlow/Icons/enter.svg";
import { checkEventName } from "../../../utils/workflow";
import { ReactComponent as EditLogo } from "../../../design/WorkFlow/Icons/edit.svg";

/////Information Tab
function NameInput({
  toggleName,
}: {
  toggleName: (showName: boolean) => void;
}) {
  const { setName } = useWorkflowStore((state) => state.utils);
  const currentEvent = useWorkflowStore((state) => state.currentEvent)();
  const [nameValue, setNameValue] = useState(currentEvent.eventName);
  const [nameError, setNameError] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (checkEventName(nameValue)) {
          setName(nameValue);
          toggleName(true);
        } else {
          setNameError(true);
        }
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", position: "relative" }}
      >
        <input
          type="text"
          placeholder="Insert Event Name "
          className={`inputs ${nameError ? "inputs--error" : ""}`}
          value={nameValue}
          onChange={(e) => {
            if (nameError) setNameError(false);
            setNameValue(e.target.value);
          }}
          style={{ width: "450px" }}
        />
        {nameError ? (
          <span
            style={{
              color: "#FF7D7D",
              position: "absolute",
              left: "500px",
              top: "5px",
              width: "300px",
            }}
          >
            No special characters or reach characters limit : 50
          </span>
        ) : (
          <button className="enter_button">
            <EnterLogo />
          </button>
        )}
      </div>
    </form>
  );
}

function DescriptionInput({
  toggleDescription,
}: {
  toggleDescription: (showName: boolean) => void;
}) {
  const currentEvent = useWorkflowStore((state) => state.currentEvent)();
  const description = currentEvent.eventDesc;
  const { setDescription } = useWorkflowStore((state) => state.utils);
  const [descriptionText, setDescriptionText] = useState(description);
  const [descError, setDescError] = useState(false);

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <label>Descriptions</label>
      <textarea
        placeholder="Insert Event Name "
        className="inputs inputs_textArea"
        style={{ height: "160px", marginTop: "18px" }}
        value={descriptionText}
        onChange={(e) => {
          if (descError) setDescError(false);
          setDescriptionText(e.target.value);
        }}
      />
      {descriptionText.length > 150 ? (
        <span style={{ position: "absolute", bottom: "60px", right: "0px" }}>
          Character limit : <span style={{ color: "#FF7D7D" }}>200</span>{" "}
        </span>
      ) : (
        ""
      )}

      {descError ? (
        <span style={{ color: "#FF7D7D" }}>Reach character limit : 200</span>
      ) : (
        ""
      )}

      <span
        className="enter_button"
        onClick={() => {
          if (descriptionText.length < 200) {
            setDescription(descriptionText);
            toggleDescription(true);
          } else {
            setDescError(true);
          }
        }}
      >
        <EnterLogo />
      </span>
    </div>
  );
}

export default function InformationTab() {
  const currentEvent = useWorkflowStore((state) => state.currentEvent)();
  const description = currentEvent.eventDesc;
  const name = currentEvent.eventName;

  const { showName, toggleName, showDescription, toggleDescription } = useWorkflowStore(
    (state) => state
  );

  return (
    <div className="details_container" style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>Event Name</div>
        {showName && name ? (
          <div style={{ fontSize: "24px", color: "white", marginTop: "13px" }}>
            {name}
            <span
              style={{ fill: "grey", marginLeft: "35px" }}
              onClick={() => toggleName(false)}
            >
              <EditLogo />
            </span>
          </div>
        ) : (
          <NameInput toggleName={toggleName} />
        )}

        {showDescription ? (
          description ? (
            <div>
              <div style={{ marginTop: "30px" }}>Descriptions</div>
              <div
                style={{
                  fontSize: "24px",
                  color: "white",
                  wordWrap: "break-word",
                  marginTop: "12px",
                }}
              >
                {description}
              </div>
              <div
                style={{ fill: "grey", fontSize: "24px", marginTop: "12px" }}
                onClick={() => toggleDescription(false)}
              >
                <EditLogo />
              </div>
            </div>
          ) : (
            <div
              className="details_addButton"
              style={{ width: "200px" }}
              onClick={() => toggleDescription(false)}
            >
              +Add Description
            </div>
          )
        ) : (
          <DescriptionInput toggleDescription={toggleDescription} />
        )}
      </div>
    </div>
  );
}
