import "./index.css";
import SearchBar from "../../../design/WorkFlow/SearchBar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { WorkflowTabs } from "../WorkflowTabs";
import { EVENT_TYPES, useWorkflowStore } from "../../../state/workflow";

const workFlowFeature = ["Hot", "Favorite", ...EVENT_TYPES];

export default function NewworkFlow() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const onChangeText = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const resetWorkflow = useWorkflowStore((state) => state.workflowUtils.resetWorkflow);
  return (
    <div className="newWorkflow_container">
      <SearchBar onChange={onChangeText} placeHolder="Search Tag Names" />
      <div className="contents_container">
        <div className="leftBar_container">
          {workFlowFeature.map((feature, i) => (
            <span
              key={i}
              className={`leftBar_icon ${
                selectedFeature === i ? "leftBar_icon--selected" : ""
              }`}
              onClick={() => {
                setSelectedFeature(i);
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="templates_container">
          <div
            className="workflowTab_container"
            onClick={() => {
              localStorage.removeItem("workflow");
              resetWorkflow();
            }}
          >
            <Link className="start_link" to="../addNewWorkflow" >
              <span>+</span>
              <span>Start from Blank</span>
            </Link>
          </div>
          <WorkflowTabs index={selectedFeature} value={searchValue} />
        </div>
      </div>
    </div>
  );
}
