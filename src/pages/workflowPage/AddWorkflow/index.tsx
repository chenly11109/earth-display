import { useEffect, useState, useRef } from "react";
import { useWorkflowStore } from "../../../state/workflow";
import EventCanvas from "../../../components/Workflow/EventCanvas";
import InformationTab from "../../../components/Workflow/TabInformation";
import PrerequisiteTab from "../../../components/Workflow/TabPrerequisite";
import AccomplishTab from "../../../components/Workflow/TabAccomplish";
import RewardsTab from "../../../components/Workflow/TabReward";

import WorkflowTitle from "../../../components/Workflow/WorkflowTitle";

import { ReactComponent as ClockLogo } from "../../../design/WorkFlow/Icons/clock.svg";

import "./index.css";
import StartWorkflow from "../../../components/Workflow/StartWorkflow";

type Detail = "information" | "prerequisite" | "accomplish" | "rewards";

const selectDetail = (detail: Detail) => {
  switch (detail) {
    case "prerequisite":
      return <PrerequisiteTab />;
    case "accomplish":
      return <AccomplishTab />;
    case "rewards":
      return <RewardsTab />;
    default:
      return <InformationTab />;
  }
};

export default function AddNewWorkflow() {
  const { detail, setDetail } = useWorkflowStore((state) => state);
  const detailSectionTab = selectDetail(detail as Detail);
  const [start, setStart] = useState(true);

  const setWorkflowFromSave = useWorkflowStore(
    (state) => state.workflowUtils.setWorkflowFromSave
  );

  useEffect(() => {
    const workflow = localStorage.getItem("workflow");
    if (workflow) {
      setWorkflowFromSave({ ...JSON.parse(workflow) });
    }
  }, [localStorage.getItem("workflow")]);

  return (
    <div className="workflow_page_container">
      <WorkflowTitle>
        <span
          style={{ fill: "grey", fontSize: "28px" }}
          onClick={() => setStart(true)}
        >
          <ClockLogo />
        </span>
      </WorkflowTitle>

      <StartWorkflow setStart={setStart} start={start} />

      <EventCanvas />

      <div className="sections_container">
        <div className="section_icons_container">
          <span className="section_icons_hr" />
          <span
            className={`${
              detail === "information" ? "section_icon--selected" : ""
            } section_icon`}
            onClick={() => {
              setDetail("information");
            }}
          >
            Information
          </span>
          <span className="section_icons_hr" />
          <span
            className={`${
              detail === "prerequisite" ? "section_icon--selected" : ""
            } section_icon`}
            onClick={() => {
              setDetail("prerequisite");
            }}
          >
            Prerequisite
          </span>
          <span className="section_icons_hr" />
          <span
            className={`${
              detail === "accomplish" ? "section_icon--selected" : ""
            } section_icon`}
            style={{ width: "110%" }}
            onClick={() => {
              setDetail("accomplish");
            }}
          >
            Accomplish Condition
          </span>
          <span className="section_icons_hr" />
          <span
            className={`${
              detail === "rewards" ? "section_icon--selected" : ""
            } section_icon`}
            onClick={() => {
              setDetail("rewards");
            }}
          >
            Reward
          </span>
          <span className="section_icons_hr" />
        </div>

        {detailSectionTab}
      </div>
    </div>
  );
}
