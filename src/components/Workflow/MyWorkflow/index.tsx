import "./index.css";
import SearchBar from "../../../design/WorkFlow/SearchBar";
import { useState } from "react";
import useSWR from "swr";
import { getMyWorkflowGroup } from "../../../api/workflow";
import { MyWorkflowTabs } from "../WorkflowTabs";

export default function MyWorkflow() {
  const [groupId, setGroup] = useState("-1");
  const { data } = useSWR(`/community/workflow/group`, getMyWorkflowGroup);
  const groups = data ? data : [];

  const [searchValue, setSearchValue] = useState("");
  const onChangeText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="workflow_contents_container">
      <SearchBar
        onChange={onChangeText}
        placeHolder="Search Workflow Templates"
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="leftBar_container">
          <span
            key={"-1"}
            className={`leftBar_icon ${
              groupId === "-1" ? "leftBar_icon--selected" : ""
            }`}
            onClick={() => {
              setGroup("-1");
            }}
          >
            All
          </span>

          {groups.map((group: { groupId: string; groupName: string }) => (
            <span
              key={group.groupId}
              className={`leftBar_icon ${
                groupId === group.groupId ? "leftBar_icon--selected" : ""
              }`}
              onClick={() => {
                setGroup(group.groupId);
              }}
            >
              {group.groupName}
            </span>
          ))}

          <span className="leftBar_icon" style={{ color: "yellowgreen" }}>
            +New Group
          </span>
        </div>

        <MyWorkflowTabs groupId={groupId} value={searchValue} />
      </div>
    </div>
  );
}
