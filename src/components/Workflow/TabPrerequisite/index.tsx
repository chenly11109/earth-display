import "./index.css";
import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";
import { useState } from "react";
import { useWorkflowStore } from "../../../state/workflow";
import TagItem from "../../../design/WorkFlow/TagItem";
import LogicSelection from "../../../design/WorkFlow/LogicSelection";
import WorkflowSelection from "../WorkflowSelection";

function EventPrerequisiteItem({
  event,
}: {
  event: {
    eventId?: string;
    workflowName: string;
    eventNo: number;
  };
}) {
  const { eventId, workflowName, eventNo } = event;
  const { deleteEventPrerequisite } = useWorkflowStore((state) => state.utils);
  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          deleteEventPrerequisite(eventNo, eventId);
        }}
      >
        <TrashLogo />
      </span>
      The user needs to complete &nbsp;
      <span style={{ color: "#C698DC" }}>
        {workflowName ? workflowName : "Current Workflow"}&nbsp;
      </span>
      &apos;s &nbsp;
      <span style={{ color: "#C698DC" }}>Event {eventNo}</span>
    </div>
  );
}

function NewButton() {
  const [option, setOption] = useState("add");
  return (
    <div className="details_contents">
      {option === "add" ? (
        <>
          <div
            className="details_addButton"
            style={{ width: "250px" }}
            onClick={() => {
              setOption("event");
            }}
          >
            + Event Dependency
          </div>
          <div
            className="details_addButton"
            style={{ width: "250px" }}
            onClick={() => {
              setOption("tag");
            }}
          >
            + Tag Dependency
          </div>{" "}
        </>
      ) : (
        ""
      )}

      {option === "event" ? <AddEvent setOption={setOption} /> : ""}
      {option === "tag" ? <AddTag setOption={setOption} /> : ""}
    </div>
  );
}

function AddEvent({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [showModal, toggleShowModal] = useState(false);
  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          setOption("add");
        }}
      >
        <TrashLogo />
      </span>
      <span>The user needs to complete </span>

      <span
        className="details_addButton details_addButton--inline"
        onClick={() => {
          toggleShowModal(true);
        }}
      >
        Select an Event
      </span>
      {showModal ? <WorkflowSelection toggleShowModal={toggleShowModal} /> : ""}
    </div>
  );
}

function AddTag({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  //searchTag data will be updated from server side

  const addTag = useWorkflowStore((state) => state.utils.addTagPrerequisite);
  const [value, setValue] = useState("");
  const [menu, showMenu] = useState(false);

  //mock data will be updated
  const tagData = { userName: "Username1#1234", tagName: "tagName1#1234" };

  const [tagName, tagId] = [...tagData.tagName.split("#")];
  const [userName, userId] = [...tagData.userName.split("#")];

  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          setOption("add");
        }}
      >
        <TrashLogo />
      </span>
      The user needs to have{" "}
      <div className="searchTag_container">
        <input
          className="searchTag_value"
          placeholder="TagName#12345"
          onChange={(e) => {
            setValue(e.target.value);
            if (menu) showMenu(false);
          }}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value) {
              showMenu(true);
            }
          }}
        />
        <div
          className="searchTag_menu_container"
          style={{ display: menu ? "" : "none" }}
          onClick={() => {
            addTag(tagData.tagName);
            showMenu(false);
          }}
        >
          {tagData ? (
            <div>
              <div style={{ fontSize: "22px" }}>
                {tagName}
                <span style={{ color: "gray" }}>#{tagId}</span>
              </div>
              <div style={{ fontSize: "18px" }}>
                Creator:{userName}
                <span style={{ color: "gray" }}>#{userId}</span>
              </div>
            </div>
          ) : (
            "tag not found"
          )}
        </div>
      </div>
    </div>
  );
}

export default function PrerequisiteTab() {
  const currentEvent = useWorkflowStore((state) => state.currentEvent)();

  const prerequisiteEvents = currentEvent.prerequisites.events;
  const prerequisiteTags = currentEvent.prerequisites.tags;
  const logicType = currentEvent.prerequisites.logicType;

  const editLogicType = useWorkflowStore(
    (state) => state.utils.editPrerequisiteLogicType
  );

  return (
    <div className="details_container">
      {prerequisiteEvents.length + prerequisiteTags.length > 1 ? (
        <LogicSelection logicType={logicType} select={editLogicType} />
      ) : (
        ""
      )}

      <div className="details_contents">
        {prerequisiteEvents
          ? prerequisiteEvents.map(
              (event: {
                ifNew: boolean;
                eventId: string;
                workflowName: string;
                eventNo: number;
              }) => (
                <EventPrerequisiteItem
                  event={event}
                  key={event.ifNew ? event.eventNo : event.eventId}
                />
              )
            )
          : ""}

        {prerequisiteTags
          ? prerequisiteTags.map((tag: { tagName: string }) => (
              <TagItem tag={tag} key={tag.tagName} />
            ))
          : ""}
      </div>
      <NewButton />
    </div>
  );
}
