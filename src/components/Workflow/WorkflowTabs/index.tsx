import {
  WorkflowTab,
  MyWorkflowTab,
} from "../../../design/WorkFlow/WorkflowTab";
import { useWorkflowTemps, useMyWorkflow } from "../../../api/workflow";
import { WorkflowTemp, MyWorkflow } from "../../../types/workflow";
import React, { useState } from "react";

export function WorkflowTabs({
  index,
  value,
}: {
  index: number;
  value: string;
}) {
  const { workflowTemps } = useWorkflowTemps(index);

  // const workflowTemps = [
  //   {
  //     engagementCount: 0,
  //     events: 0,
  //     favorite: true,
  //     lastTime: 0,
  //     published: 0,
  //     workflowId: "123",
  //     workflowName: "workflow",
  //   },
  // ];

  const workflowTempsAll = workflowTemps || [];
  const workflowTempsFilter = workflowTempsAll.filter(
    (workflow: WorkflowTemp) => workflow.workflowName.includes(value)
  );

  return (
    <>
      {workflowTempsFilter.map((workflow: WorkflowTemp) => (
        <div key={workflow.workflowId} className="workflowTab_container">
          <WorkflowTab workflow={workflow} />
        </div>
      ))}
    </>
  );
}

function DropdownMenu({ onChange }: { onChange: any }) {
  return (
    <div>
      <select
        className="inputs"
        style={{ width: "15%", float: "right" }}
        onChange={onChange}
      >
        <option value="all">All</option>
        <option value="unpublished">Unpublished</option>
        <option value="published">Published</option>
      </select>
    </div>
  );
}

export function MyWorkflowTabs({
  groupId,
  value,
}: {
  groupId: string;
  value: string;
}) {
  const { myWorkflows } = useMyWorkflow(groupId);
  const workflowTempsAll = myWorkflows || [];

  const [published, setPublished] = useState("all");
  const onChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPublished(e.target.value);
  };

  const workflowPublished = workflowTempsAll.filter((workflow: MyWorkflow) => {
    if (published === "all") return true;
    if (published === "published") return workflow.published;
    if (published === "unpublished") return !workflow.published;
  });

  const workflowTempsFilter = workflowPublished.filter((workflow: MyWorkflow) =>
    workflow.workflowName.includes(value)
  );

  return (
    <div style={{ width: "100%" }}>
      <DropdownMenu onChange={onChangeDropdown} />
      <div className="templates_container">
        {workflowTempsFilter.map((workflow: MyWorkflow) => (
          <div key={workflow.workflowId} className="workflowTab_container">
            <MyWorkflowTab workflow={workflow} />
          </div>
        ))}
      </div>
    </div>
  );
}
