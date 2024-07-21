import "./index.css";
import { useWorkflowStore } from "../../../state/workflow";
import { ReactComponent as EditLogo } from "../../../design/WorkFlow/Icons/edit.svg";
import { ReactComponent as EnterLogo } from "../../../design/WorkFlow/Icons/enter.svg";
import { ReactComponent as CloseLogo } from "../../../design/WorkFlow/Icons/close.svg";
import { useState } from "react";

function ClassificaitonSelection() {
  //will update with backend data, use the searchText to fetch data
  const options = [
    { topicName: "Balalalalalic1", topicId: "1", count: 3145 },
    { topicName: "Balalalethstopic2", topicId: "2", count: 2445 },
    { topicName: "Balalalteglbtopic3", topicId: "3", count: 1488 },
    { topicName: "Balgehioibtopic4", topicId: "4", count: 1326 },
    { topicName: "Balehiibwtopic5", topicId: "5", count: 1260 },
    { topicName: "Baljieoiwogwpntopic6", topicId: "6", count: 1170 },
    { topicName: "Balingeiwioibtopic7", topicId: "7", count: 1080 },
    { topicName: "Balgallalewtopic8", topicId: "8", count: 980 },
    { topicName: "Baligewibtopic9", topicId: "9", count: 459 },
    { topicName: "JOPonwewehtopic10", topicId: "10", count: 129 },
  ];

  const [showMenu, toggleShowMenu] = useState(false);
  const addClassification = useWorkflowStore(
    (state) => state.workflowUtils.addClassification
  );
  const classifications = useWorkflowStore((state) => state.workflow.classification);
  const [searchText, setSearchText] = useState("");
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: "200px",
      }}
    >
      <div className="searchBar">
        <input
          className="searchBar_input"
          placeholder="Add Topic to this Workflow"
          onFocus={() => toggleShowMenu(true)}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div
        className="select_menu_container"
        style={{
          display: showMenu ? "block" : "none",
          position: "relative",
          top: "0",
          left: "1%",
          width: "95%",
          height: options.length > 6 ? "250px" : "",
        }}
      >
        {options.map((option, i) => (
          <div
            key={option.topicId}
            className="select_option"
            style={{
              position: "relative",
              padding: "12px 24px",
              height: "24px",
            }}
            onClick={(e) => {
              if (classifications.length < 5) {
                e.stopPropagation();
                addClassification(option.topicName);
                toggleShowMenu(false);
              }
            }}
          >
            <div style={{ position: "absolute", left: "12px" }}>
              {option.topicName}
            </div>
            <div
              style={{
                position: "absolute",
                right: "12px",
                color: i === 0 || i === 1 ? "#FF7E7E" : "",
              }}
            >
              {option.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassificationText({ classification }: { classification: string }) {
  const [hover, onHover] = useState(false);
  const deleteClassification = useWorkflowStore(
    (state) => state.workflowUtils.deleteClassification
  );
  return (
    <span
      onMouseEnter={() => {
        onHover(true);
      }}
      onMouseLeave={() => {
        onHover(false);
      }}
      className="fullPage_classification_item"
    >
      #{classification}{" "}
      {hover ? (
        <CloseLogo
          onClick={() => {
            deleteClassification(classification);
          }}
        />
      ) : (
        ""
      )}
    </span>
  );
}

function ClassificationDisplay() {
  const classifications = useWorkflowStore((state) => state.workflow.classification);
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "100px",
        fontSize: "24px",
      }}
    >
      Topics:
      {classifications.map((classification: string, i: number) => (
        <ClassificationText key={i} classification={classification} />
      ))}
    </div>
  );
}

export default function Classification({ ...props }) {
  const [editName, toggleEdit] = useState(false);

  const workflowName = useWorkflowStore((state) => state.workflow.workflowName);
  const [nameText, setNameText] = useState(workflowName);

  const setWorkflowName = useWorkflowStore(
    (state) => state.workflowUtils.setWorkflowName
  );
  if (!workflowName) setWorkflowName("My Workflow 1");
  return (
    <div className="fullPage_container">
      <div className="fullPage_background" />
      <div
        className="fullPage_contents_container"
        style={{
          height: "600px",
          width: "1200px",
          textAlign: "center",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ fontSize: "32px", height: "150px" }}>
          {editName ? (
            <form
              onSubmit={() => {
                setWorkflowName(nameText);
                toggleEdit(false);
              }}
            >
              <input
                type="text"
                className="inputs"
                style={{
                  width: "500px",
                  textAlign: "center",
                  fontSize: "32px",
                }}
                value={nameText}
                onChange={(e) => {
                  setNameText(e.target.value);
                }}
              />
              <button className="enter_button">
                <EnterLogo />
              </button>
            </form>
          ) : (
            <div>
              {workflowName}
              <span
                style={{ fill: "grey", marginLeft: "35px" }}
                onClick={() => {
                  toggleEdit(true);
                }}
              >
                <EditLogo />
              </span>
            </div>
          )}
        </div>

        <ClassificationDisplay />

        <ClassificaitonSelection />

        <div style={{ position: "absolute", bottom: 0, right: 0 }}>
          <span
            className="details_button details_button--reverse"
            onClick={() => props.setPublish(false)}
          >
            Cancel
          </span>
          <span
            className="details_button"
            onClick={() => props.toggleReportNext(true)}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
}
