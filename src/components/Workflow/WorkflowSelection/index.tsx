import Modal from "../../../design/WorkFlow/Modal";
import "./index.css";
import { useWorkflowStore } from "../../../state/workflow";
import { useState } from "react";
import SearchBar from "../../../design/WorkFlow/SearchBar";
import WarningModal from "../../../design/WorkFlow/WarningModal";

type Workflow = {
  events: Array<{
    eventId?: string;
    eventName: string;
    eventNo: number;
  }>;
  workflowName: string;
  workflowId?: string;
};

function WorkflowDropDown({
  workflow,
  toggleShowModal,
  show,
}: {
  workflow: Workflow;
  toggleShowModal: (showModal: boolean) => void;
  show: boolean;
}) {
  const { addEventPrerequisite } = useWorkflowStore((state) => state.utils);
  const requisites = useWorkflowStore((state) => state.currentEvent)().prerequisites
    .events;
  const [showWarning, toggleShowWarning] = useState(false);

  const [showEvents, toggleShowEvents] = useState(show);
  return (
    <div style={{ padding: "10px", width: "90%" }}>
      <div
        className="selection_title"
        onClick={() => {
          toggleShowEvents(!showEvents);
        }}
      >
        <div
          style={{
            display: "inline-block",
            transform: showEvents ? "rotate(90deg)" : "",
            position: "relative",
            top: showEvents ? "5px" : "",
          }}
        >
          {">"}
        </div>{" "}
        {workflow.workflowName ? workflow.workflowName : "Current Workflow"}
      </div>
      <div style={{ position: "relative", left: "24px" }}>
        {workflow.events.map((event, i) => (
          <div
            key={i}
            onClick={() => {
              //add currentWorkflowEvent
              if (
                !requisites.some(
                  (someevent: {
                    eventId?: string;
                    eventName: string;
                    eventNo: number;
                  }) =>
                    someevent.eventId === event.eventId &&
                    someevent.eventNo === event.eventNo
                )
              ) {
                if (!workflow.workflowName) {
                  addEventPrerequisite(workflow.workflowName, event.eventNo);
                } else {
                  addEventPrerequisite(
                    workflow.workflowName,
                    event.eventNo,
                    workflow.workflowId,
                    false,
                    event.eventId
                  );
                }
                toggleShowModal(false);
              } else {
                toggleShowWarning(true);
              }
            }}
            style={{ display: `${showEvents ? "block" : "none"}` }}
          >
            Event {event.eventNo} :
            <span style={{ color: event.eventName ? "white" : "grey" }}>
              {event.eventName ? event.eventName : "Unnamed"}
            </span>
          </div>
        ))}
      </div>

      {showWarning ? (
        <WarningModal showModal={toggleShowWarning}>
          <div>The selected event already exists in current prerequisites</div>
        </WarningModal>
      ) : (
        ""
      )}
    </div>
  );
}

export default function WorkflowSelection({
  toggleShowModal,
}: {
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //will be updated with post request
  const workflows: Array<Workflow> = [
    {
      events: [
        {
          eventId: "0000",
          eventName: "event1",
          eventNo: 0,
        },
        {
          eventId: "0001",
          eventName: "event2",
          eventNo: 1,
        },
        {
          eventId: "0002",
          eventName: "event3",
          eventNo: 2,
        },
      ],
      workflowName: "workflow1",
      workflowId: "0000",
    },
    {
      events: [
        {
          eventId: "0003",
          eventName: "event1",
          eventNo: 0,
        },
        {
          eventId: "0004",
          eventName: "event2",
          eventNo: 1,
        },
        {
          eventId: "0005",
          eventName: "event3",
          eventNo: 2,
        },
      ],
      workflowName: "workflow2",
      workflowId: "0000",
    },
    {
      events: [
        {
          eventId: "0003",
          eventName: "event1",
          eventNo: 0,
        },
        {
          eventId: "0004",
          eventName: "event2",
          eventNo: 1,
        },
        {
          eventId: "0005",
          eventName: "event3",
          eventNo: 2,
        },
      ],
      workflowName: "workflow3",
      workflowId: "0000",
    },
  ];

  const currentEvent = useWorkflowStore((state) => state.currentEvent)();

  const currentWorkflowEvents = useWorkflowStore((state) => state.events)
    .map((event) => ({
      eventNo: event.eventNo,
      eventName: event.eventName,
    }))
    .filter((event) => event.eventNo !== currentEvent.eventNo);

  if (currentWorkflowEvents.length > 0) {
    workflows.unshift({
      workflowName: "",
      events: currentWorkflowEvents,
    });
  }

  const [searchText, setSearchText] = useState("");

  const workflowsDisplay = workflows.map((workflow) => ({
    ...workflow,
    events: workflow.events.filter((event) =>
      event.eventName.toLowerCase().includes(searchText.toLowerCase())
    ),
  }));

  return (
    <Modal
      showModal={toggleShowModal}
      style={{ height: "400px", width: "500px" }}
    >
      <div>Choose an Event</div>
      <div style={{ height: "80%" }}>
        <SearchBar
          onChange={(e) => setSearchText(e.target.value)}
          placeHolder="Search Tag Name"
        />

        <div className="modal_contents_container">
          {workflowsDisplay.map((workflow, i) => (
            <WorkflowDropDown
              key={i}
              workflow={workflow}
              toggleShowModal={toggleShowModal}
              show={i ? false : true}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
