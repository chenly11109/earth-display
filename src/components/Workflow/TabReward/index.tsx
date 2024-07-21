import { useState } from "react";
import "./index.css";
import SearchBar from "../../../design/WorkFlow/SearchBar";
import { useWorkflowStore } from "../../../state/workflow";

import { ReactComponent as TrashLogo } from "../../../design/WorkFlow/Icons/trashCan.svg";
import Modal from "../../../design/WorkFlow/Modal";
import AddNewTag from "../AddNewTag";
import { Event_InfoDtoList, Event_tags } from "../../../types/workflow";

function SelectModal({
  showModal,
  showAddButton,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddButton: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //pre-defined tags, will be from back-end
  const tags = [
    { tagName: "millionaire#0000" },
    { tagName: "Perfectionist#1234" },
    { tagName: "Big Band Theory#1256" },
    { tagName: "Highway to Stars#153" },
    { tagName: "Ace Pair#45" },
    { tagName: "Perfectionist#1255" },
    { tagName: "Constellation Maker#1253" },
    { tagName: "Sweat & Score#1253" },
    { tagName: "Stylist#1253" },
    { tagName: "Highway to Stars#1253" },
    { tagName: "Ace Pair#1253" },
    { tagName: "Perfection#1253" },
    { tagName: "Constellation Maker#12332" },
    { tagName: "Sweat & Score#12336" },
  ];

  const [searchText, setSearchText] = useState("");
  const { addExistingReward } = useWorkflowStore((state) => state.utils);
  return (
    <Modal showModal={showModal} style={{ height: "500px", width: "400px" }}>
      <div>My Defined Tags</div>
      <div style={{ height: "80%" }}>
        <SearchBar
          onChange={(e) => setSearchText(e.target.value)}
          placeHolder="Search Tag Name"
        />

        <div className="modal_contents_container">
          {tags
            .filter((tag) =>
              tag.tagName.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((tag) => (
              <span
                style={{ color: "#C698DC" }}
                key={tag.tagName}
                onClick={() => {
                  addExistingReward(tag.tagName);
                  showModal(false);
                  showAddButton(true);
                }}
              >
                {tag.tagName.split("#")[0]}
                <span style={{ color: "grey" }}>
                  #{tag.tagName.split("#")[1]}
                </span>
              </span>
            ))}
        </div>
      </div>
    </Modal>
  );
}

function SelectDefined({
  showAddButton,
}: {
  showAddButton: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modal, showModal] = useState(false);

  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          showAddButton(true);
        }}
      >
        <TrashLogo />
      </span>
      The user can get
      <span
        className="details_addButton details_addButton--inline"
        onClick={() => {
          showModal(true);
        }}
      >
        Select my defined tags
      </span>
      {modal ? (
        <SelectModal showModal={showModal} showAddButton={showAddButton} />
      ) : (
        ""
      )}
    </div>
  );
}

function TagItem({ tag }: { tag: Event_tags }) {
  const { deleteReward } = useWorkflowStore((state) => state.utils);
  const [tagName, tagId] = tag.tagName.split("#");
  return (
    <div className="details_contents_item">
      <span
        className="trash_button"
        onClick={() => {
          deleteReward(tag.tagName);
        }}
      >
        <TrashLogo />
      </span>
      The user can get
      <span className="tagItem_tag">
        {tagName}
        {tagId ? <span style={{ color: "grey" }}>#{tagId}</span> : ""}
      </span>
    </div>
  );
}

export default function RewardsTab() {
  const [addButton, showAddButton] = useState(true);
  const [addTagState, toggleAddTagState] = useState(false);

  const currentEvent: Event_InfoDtoList = useWorkflowStore((state) =>
    state.currentEvent()
  );
  const rewards = currentEvent.tags;

  return (
    <div className="details_container">
      <div className="details_contents">
        {rewards.map((tag: Event_tags) => (
          <TagItem tag={tag} key={tag.tagName} />
        ))}

        {addButton ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "200px",
              height: "120px",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => {
                showAddButton(false);
              }}
              className="details_addButton"
            >
              + Existing Tag
            </span>
            <span
              onClick={() => {
                toggleAddTagState(true);
              }}
              className="details_addButton"
            >
              + New Tag
            </span>

            {addTagState ? (
              <AddNewTag toggleAddTagState={toggleAddTagState} />
            ) : (
              ""
            )}
          </div>
        ) : (
          <SelectDefined showAddButton={showAddButton} />
        )}
      </div>
    </div>
  );
}
