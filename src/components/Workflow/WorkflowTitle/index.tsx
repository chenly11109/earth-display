import "./index.css";
import { BackButton } from "../../../design/WorkFlow/BackButton";
import { useWorkflowStore } from "../../../state/workflow";
import React, { useState, useEffect, useRef } from "react";
import WarningModal from "../../../design/WorkFlow/WarningModal";
import PublishReport from "../PublishReport";
import Classification from "../Classification";

export default function WorkflowTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  const publishState = useWorkflowStore(
    (state) => state.workflowUtils.checkPublishState
  )();
  const [publish, setPublish] = useState(false);
  const [reportNext, toggleReportNext] = useState(false);
  const [saving, setSaving] = useState(false);

  const workflowName = useWorkflowStore((state) => state.workflow.workflowName);
  const setWorkflowName = useWorkflowStore(
    (state) => state.workflowUtils.setWorkflowName
  );

  const getWorkflow = useWorkflowStore((state) => state.currentWorkflow);

  //setTimer to save every 10min
  // const timer = useRef<NodeJS.Timeout | null>(null);
  // useEffect(() => {
  //   timer.current = setInterval(() => {
  //     setSaving(true);
  //     localStorage.setItem("workflow", JSON.stringify(getWorkflow()));
  //     setTimeout(() => {
  //       setSaving(false);
  //     }, 1000);
  //   }, 600000);
  //   return () => {
  //     if (timer.current) clearInterval(timer.current);
  //   };
  // }, [getWorkflow()]);

  return (
    <div className="addWorkflow_title_container">
      <BackButton history="../" />
      <input
        type="text"
        placeholder="My Workflow 1"
        className="addWorkflow_title"
        value={workflowName}
        onChange={(e) => {
          setWorkflowName(e.target.value);
        }}
      />
      <div className="addWorkflow_title_button">
        {children}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSaving(true);
            localStorage.setItem("workflow", JSON.stringify(getWorkflow()));
            setTimeout(() => {
              setSaving(false);
            }, 1000);
          }}
        >
          {saving ? "Saving..." : "Save"}
        </span>
        <span
          style={{ color: "greenyellow" }}
          onClick={() => {
            setPublish(!publish);
          }}
        >
          Publish
        </span>
      </div>

      {publish ? (
        publishState ? (
          <WarningModal showModal={setPublish}>
            <div>
              <span style={{ color: "#C698DC" }}>{publishState} </span>must have
              <span style={{ color: "#C698DC" }}>
                &nbsp;event name&nbsp;
              </span>{" "}
              and at least one{" "}
              <span style={{ color: "#C698DC" }}>accomplish condition </span>
              before publishing
            </div>
          </WarningModal>
        ) : reportNext ? (
          <PublishReport
            setPublish={setPublish}
            toggleReportNext={toggleReportNext}
          />
        ) : (
          <Classification
            setPublish={setPublish}
            toggleReportNext={toggleReportNext}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}
