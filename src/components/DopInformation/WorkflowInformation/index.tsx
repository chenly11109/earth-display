import "./index.css";
import { ReactComponent as TriLogo } from "../../../design/Dop/icons/tri.svg";

const numberDisplay = (num: number) => {
  return (num / 1000).toFixed(1);
};

const workflow = [
  {
    workflowName: "Creation",
    eventCount: 12,
    rewards: ["master"],
    participants: 78965,
    timeStart: "06/01/2021",
    timeEnd: "06/20/2021",
  },
  {
    workflowName: "Community",
    eventCount: 35,
    rewards: ["Ambassador", "Meta-ER"],
    participants: 178965,
    timeStart: "05/29/2021",
    timeEnd: "06/25/2021",
  },
  {
    workflowName: "Product",
    eventCount: 12,
    rewards: ["designer"],
    participants: 678965,
    timeStart: "05/21/2021",
    timeEnd: "06/20/2021",
  },
  {
    workflowName: "Creation",
    eventCount: 12,
    rewards: ["master"],
    participants: 78965,
    timeStart: "06/01/2021",
    timeEnd: "06/20/2021",
  },

  {
    workflowName: "Community",
    eventCount: 35,
    rewards: ["Ambassador", "Meta-ER"],
    participants: 178965,
    timeStart: "05/29/2021",
    timeEnd: "06/25/2021",
  },
  // {
  //   workflowName: "workflow No.5",
  //   eventCount: 12,
  //   rewards: ["millionaire", "nice", "reward"],
  //   participants: 78965,
  //   timeStart: "06/01/2021",
  //   timeEnd: "06/20/2021",
  // },
];

export function WorkflowTab({
  workflow,
  toggleShowEvents,
}: {
  toggleShowEvents?: any;
  workflow: {
    workflowName: string;
    eventCount: number;
    rewards: Array<string>;
    participants: number;
    timeStart: string;
    timeEnd: string;
  };
}) {
  const {
    workflowName,
    eventCount,
    rewards,
    participants,
    timeStart,
    timeEnd,
  } = workflow;
  return (
    <div
      className="dopPage_workflow_tab"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleShowEvents(true);
      }}
    >
      <div style={{ fontSize: "24px" }}>{workflowName}</div>
      <div style={{ display: "flex" }}>
        <div className="icon_selected" />
        <span style={{ fontSize: "20px" }}>Reward:</span>
        {rewards.map((reward, i) => (
          <span
            key={i}
            className="tagItem_tag"
            style={i === 1 ? { color: "#FFCC00", borderColor: "#FFCC00" } : {}}
          >
            {reward}
          </span>
        ))}
      </div>
      <div style={{ fontSize: "18px" }}>
        {numberDisplay(participants)}k participants
      </div>
      <div className="dopPage_workflow_eventCount">{eventCount} Events</div>
      <div className="dopPage_workflow_time">
        {timeStart} - {timeEnd}
      </div>
    </div>
  );
}

export default function WorkflowInformation({ toggleShowEvents }: any) {
  return (
    <div style={{ position: "relative", marginBottom: "30px" }}>
      <div>Workflow</div>
      <div className="dopPage_workflow_selection">
        ongoing{" "}
        <TriLogo
          style={{
            position: "relative",
            top: "5px",
            fill: "grey",
          }}
        />
      </div>
      <div className="dopPage_workflow_container">
        {workflow.map((workflow, i) => (
          <WorkflowTab
            workflow={workflow}
            key={i}
            toggleShowEvents={toggleShowEvents}
          />
        ))}
      </div>
    </div>
  );
}
