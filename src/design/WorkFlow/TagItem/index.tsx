import { useWorkflowStore } from "../../../state/workflow";
import { ReactComponent as TrashLogo } from "../Icons/trashCan.svg";
import { useState } from "react";
import "./index.css";

function TagDetails(tagId) {
  //will be get from server with tag Id
  const details =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ";
  return <div style={{ position: "absolute" }}>{details}</div>;
}

function Tag({ tag }: { tag: { tagId: string; tagName: string } }) {
  const { tagId, tagName } = tag;
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <span
        onClick={() => {
          setShowDetails(!showDetails);
        }}
        className="tagItem_tag"
      >
        {tagName}
      </span>
      {showDetails ? <TagDetails tagId={tagId} /> : ""}
    </div>
  );
}

export default function TagItem({
  tag,
}: {
  tag: {
    tagName: string;
  };
}) {
  const { deleteTagPrerequisite } = useWorkflowStore((state) => state.utils);
  const [tagName, tagId] = [...tag.tagName.split("#")];

  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          deleteTagPrerequisite(tag.tagName);
        }}
      >
        <TrashLogo />
      </span>
      The user needs to own &nbsp;
      <span onClick={() => {}} className="tagItem_tag">
        {tagName}
        <span style={{ color: "grey" }}>#{tagId}</span>
      </span>
    </div>
  );
}
