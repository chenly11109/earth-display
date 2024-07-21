import "./index.css";
import NewWorkflow from "../../../components/Workflow/WorkflowTemplates";
// import MyWorkflow from "../../../components/Workflow/MyWorkflow";
import { useState } from "react";

export default function WorkFlow() {
  const [newWorkflow, setNewWorkflow] = useState(true);
  // const onClickNew = () => {
  //   setNewWorkflow(!newWorkflow);
  // };

  return (
    <div className="workflow_page_container">
      <div className="workflow_title">
        <span className={"workflow_title--selected"}>
          Event Workflow Templates Library
        </span>
      </div>
      {/* <span
          className={newWorkflow ? "workflow_title--selected" : ""}
          onClick={onClickNew}
        >
          New Workflow
        </span>
        <span>&nbsp; | &nbsp;</span>
        <span
          className={` ${newWorkflow ? "" : "workflow_title--selected"}`}
          onClick={onClickNew}
        >
          My Workflow
        </span>
      {newWorkflow ? <NewWorkflow /> : <MyWorkflow />} */}

      <NewWorkflow />
    </div>
  );
}
