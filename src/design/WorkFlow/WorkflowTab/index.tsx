import "./index.css";
import { ReactComponent as StarLogo } from "../Icons/star.svg";
import { WorkflowTemp, MyWorkflow } from "../../../types/workflow";
import { useNavigate } from "react-router-dom";

export function WorkflowTab({ workflow }: { workflow: WorkflowTemp }) {
  const { workflowId, workflowName, events, engagementCount, favorite } =
    workflow;

  const navigate = useNavigate();
  const onClickExpand = () => {
    navigate(`../workflowView/${workflowId}`);
  };

  const onClickSave = () => {};

  return (
    <div className="template_tab" onClick={onClickExpand}>
      <div className="template_tab_name">{workflowName}</div>
      <div>{events} Events</div>
      <div className="bottom">Engagement Count: {engagementCount}</div>

      <div
        className={`save_logo ${favorite ? "save_logo--saved" : ""}`}
        onClick={onClickSave}
      >
        <StarLogo />
      </div>
    </div>
  );
}

export function MyWorkflowTab({ workflow }: { workflow: MyWorkflow }) {
  const { workflowId, workflowName, events, lastTime, published } = workflow;

  const lastTimeString = new Date(lastTime).toString();
  const navigate = useNavigate();
  const onClickExpand = () => {
    navigate("../addNewWorkflow");
  };

  return (
    <div className="template_tab" onClick={onClickExpand}>
      <div className="template_tab_name">{workflowName}</div>
      {published ? <div>Published</div> : <div>{events} Events</div>}
      <div className="bottom">Last edited on{lastTimeString}</div>
    </div>
  );
}
