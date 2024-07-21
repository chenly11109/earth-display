import { useWorkflowStore } from "../../../state/workflow";
import "./index.css";
import { Event_Position } from "../../../types/workflow";
import { useState } from "react";
import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";

export function AddEventTab() {
  const { addEvent, addPage } = useWorkflowStore((state) => state.eventsLayoutUtils);

  return (
    <div
      className="eventTab_container eventTab_Add"
      style={{
        border: "dashed grey 2px",
        display: "flex",
        justifyContent: "center",
      }}
      onClick={() => {
        addEvent();
        addPage();
      }}
    >
      <div style={{ fontSize: "72px", position: "relative", top: "15px" }}>
        +
      </div>
    </div>
  );
}

export function EventTab({ event }: { event: Event_Position }) {
  const { eventNo } = event;

  const { currentEvent } = useWorkflowStore((state) => state.eventsLayout);
  const [showDelete, toggleShowDelete] = useState(false);

  const {
    changeCurrentEvent,
    removeEmptyColumn,
    changeSelectedPosition,
    deleteEvent,
  } = useWorkflowStore((state) => state.eventsLayoutUtils);

  const { setDetail, toggleName, toggleDescription } = useWorkflowStore(
    (state) => state
  );
  const events = useWorkflowStore((state) => state.events);
  const eventCurrent = events.find((event) => event.eventNo === eventNo);
  const currentName = eventCurrent?.eventName;
  const name =
    currentName && currentName.length > 20
      ? currentName.substring(0, 20) + "..."
      : currentName;

  const prerequisite = eventCurrent?.prerequisites.events;
  const reqCurWorkflow = prerequisite?.filter(
    (event: { ifNew: boolean }) => event.ifNew
  );

  const logicType = eventCurrent?.prerequisites.logicType;

  const reqElems: string[] = [];
  if (reqCurWorkflow && reqCurWorkflow.length > 0)
    reqCurWorkflow.forEach((event: { eventNo: number }) => {
      reqElems.push("Event" + event.eventNo);
    });

  if (prerequisite && prerequisite.length === 0) reqElems.push("No event");
  if (
    prerequisite &&
    reqCurWorkflow &&
    prerequisite.length - reqCurWorkflow.length > 0
  )
    reqElems.push("Event from other workflow");

  const displayText = reqElems.join(logicType ? " or " : " & ");

  return (
    <div
      className={`eventTab_container ${
        currentEvent === eventNo ? "eventTab--selected" : ""
      }`}
      onMouseEnter={() => {
        if (currentEvent !== eventNo && eventNo !== 0) toggleShowDelete(true);
      }}
      onMouseLeave={() => {
        toggleShowDelete(false);
      }}
      onClick={(e) => {
        e.preventDefault();

        //select current event
        if (e.detail === 1) {
          changeCurrentEvent(eventNo);
          //change default tab to "information"
          setDetail("information");
          //make sure the information tab is updated
          toggleName(true);
          toggleDescription(true);
        }
        changeSelectedPosition(null);
      }}
    >
      <div className="eventTab_id">{eventNo}</div>
      {showDelete ? (
        <span
          className="trash_button"
          style={{
            position: "absolute",
            right: "0",
            fill: "white",
            fontSize: "18px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            changeCurrentEvent(0);
            deleteEvent(eventNo);
            removeEmptyColumn();
          }}
        >
          <TrashLogo />
        </span>
      ) : (
        ""
      )}
      <div className="eventTab_name" style={{ color: name ? "white" : "grey" }}>
        {name ? name : `Event ${eventNo}`}
      </div>
      <div className="eventTab_hr" />
      <div className="eventTab_title">Event Prerequisite</div>
      <div className="eventTab_contents">{displayText}</div>
    </div>
  );
}
