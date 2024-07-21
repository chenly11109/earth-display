import { useWorkflowStore } from "../../../state/workflow";
import "./index.css";
import { Event_InfoDtoList, Event_tags } from "../../../types/workflow";
import { useNavigate } from "react-router-dom";

function NewTag({ eventNo, tag }: { eventNo: number; tag: Event_tags }) {
  return (
    <div className="publish_item" key={tag.tagName}>
      <span className="tagItem_tag" style={{ fontSize: "30px" }}>
        {tag.tagName}
      </span>
      : Created by <span style={{ color: "#C698DC" }}>Event {eventNo}</span>
    </div>
  );
}

function ExistingTag({ eventNo, tag }: { eventNo: number; tag: Event_tags }) {
  return (
    <div className="publish_item" key={tag.tagName}>
      <span className="tagItem_tag" style={{ fontSize: "30px" }}>
        {tag.tagName.split("#")[0]}{" "}
        <span style={{ color: "grey" }}># {tag.tagName.split("#")[1]}</span>
      </span>
      :additional defination added by{" "}
      <span style={{ color: "#C698DC" }}>Event {eventNo}</span>
    </div>
  );
}

export default function PublishReport({
  setPublish,
  toggleReportNext,
}: {
  setPublish: React.Dispatch<React.SetStateAction<boolean>>;
  toggleReportNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const events = useWorkflowStore((state) => state.events);
  const navigate = useNavigate();
  const newEventTagsCount = events.reduce(
    (prev, event) =>
      prev + event.tags.filter((tag: Event_tags) => tag.ifNew).length,
    0
  );

  const existingEventTagsCount = events.reduce(
    (prev, event) =>
      prev + event.tags.filter((tag: Event_tags) => !tag.ifNew).length,
    0
  );

  return (
    <div className="fullPage_container">
      <div className="fullPage_background" />

      <div
        className="fullPage_contents_container"
        style={{ height: "600px", width: "1200px" }}
      >
        {newEventTagsCount + existingEventTagsCount > 0 ? (
          <>
            <div style={{ fontSize: "40px" }}>
              After publishing, you will create{" "}
              <span style={{ color: "greenyellow" }}>{newEventTagsCount}</span>{" "}
              Tag
              {newEventTagsCount > 1 ? "s" : ""} and add definition to{" "}
              <span style={{ color: "greenyellow" }}>
                {existingEventTagsCount}
              </span>{" "}
              Tag
              {existingEventTagsCount > 1 ? "s" : ""}
            </div>

            <div className="fullPage_contents">
              {events.map((event: Event_InfoDtoList) =>
                event.tags
                  .filter((tag) => tag.ifNew)
                  .map((tag) => (
                    <NewTag
                      eventNo={event.eventNo}
                      tag={tag}
                      key={tag.tagName}
                    />
                  ))
              )}
              {events.map((event: Event_InfoDtoList) =>
                event.tags
                  .filter((tag) => !tag.ifNew)
                  .map((tag) => (
                    <ExistingTag
                      eventNo={event.eventNo}
                      tag={tag}
                      key={tag.tagName}
                    />
                  ))
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              fontSize: "40px",
              textAlign: "center",
            }}
          >
            <p>
              No <span style={{ color: "#D7A9ED" }}>rewards</span> are set for
              the current Event-Workflow.
            </p>{" "}
            Please confirm before you publish this workflow.
          </div>
        )}

        <div style={{ position: "absolute", bottom: 0, right: 0 }}>
          <span
            className="details_button details_button--reverse"
            onClick={() => {
              setPublish(false);
              toggleReportNext(false);
            }}
          >
            Cancel
          </span>
          <span
            className="details_button"
            onClick={() => navigate("../")}
          >
            Publish
          </span>
        </div>
      </div>
    </div>
  );
}
