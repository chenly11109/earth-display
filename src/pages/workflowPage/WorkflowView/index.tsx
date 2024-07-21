import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { BackButton } from "../../../design/WorkFlow/BackButton";
import EventTabView from "../../../design/WorkFlow/EventTabView";

import { useWorkflowView } from "../../../api/workflow";
import { Event } from "../../../types/workflow";
import CreateButton from "../../../design/WorkFlow/CreateButton";
import { ReactComponent as StarLogo } from "../../../design/WorkFlow/Icons/star.svg";

function Button({
  next,
  deltaX,
  eventsLength,
  setViewX,
}: {
  next?: true;
  deltaX: number;
  setViewX: any;
  eventsLength: number;
}) {
  const display = next
    ? deltaX < 300 * eventsLength - 1500
      ? "block"
      : "none"
    : deltaX > 0
    ? "block"
    : "none";

  return (
    <div
      className={`button_view ${next ? "button_next" : "button_prev"}`}
      style={{ display: display }}
      onClick={
        next
          ? () =>
              setViewX(
                deltaX + 1500 > eventsLength * 300 - 1500
                  ? eventsLength * 300 - 1500
                  : deltaX + 1500
              )
          : () => {
              setViewX(deltaX - 1500 < 0 ? 0 : deltaX - 1500);
            }
      }
    >
      {next ? ">" : "<"}
    </div>
  );
}
export default function WorkflowView() {
  // const { workflowId } = useParams();
  // let { workflowView } = useWorkflowView(workflowId as string);

  // const { events, workflowName, engagementCount, eventsLength } =
  //   workflowView || {};

  const eventsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const events = eventsArray.map((positionX) => ({
    eventId: "4",
    eventName: "event 4",
    eventNo: String(positionX),
    positionX: positionX,
    positionY: 2,
    prerequisite: "Event6 or Event5",
  }));

  events.push(
    {
      eventId: "4",
      eventName: "event 4",
      eventNo: "13",
      positionX: 3,
      positionY: 1,
      prerequisite: "No Event",
    },
    {
      eventId: "4",
      eventName: "event 4",
      eventNo: "15",
      positionX: 3,
      positionY: 3,
      prerequisite: "No Event",
    }
  );
  const [workflowName, engagementCount, eventsLength, savedCounts] = [
    "workflowName",
    800,
    eventsArray.length,
    1000,
  ];

  ////use some mock data to test the performance

  const viewLength = eventsLength - 5;

  const [viewX, setViewX] = useState(0);

  const onWheelView = (e: React.WheelEvent<HTMLElement>) => {
    let deltaX = viewX + e.deltaY;
    if (deltaX > viewLength * 300) deltaX = viewLength * 300;
    if (deltaX < 0) deltaX = 0;
    setViewX(deltaX);
  };

  return (
    <div className="workflow_page_container">
      <BackButton history="../" />

      <Button deltaX={viewX} setViewX={setViewX} eventsLength={eventsLength} />
      <div className="view_page_container">
        <div className="view_title">{workflowName}</div>
        <div>Engagement Count : {engagementCount}</div>
        <div
          style={{
            position: "absolute",
            fill: "white",
            fontSize: "36px",
            top: "0px",
            right: "0px",
          }}
        >
          {savedCounts}
          <StarLogo />
        </div>

        <div
          className="view_container"
          onWheel={onWheelView}
          style={{
            transform: `translate(${-viewX}px,0)`,
            width: `${300 * eventsLength}px`,
          }}
        >
          {events?.map((event: Event) => (
            <EventTabView event={event} key={event.eventId} />
          ))}
        </div>

        <div style={{ position: "absolute", bottom: "0", right: "0" }}>
          <CreateButton />
        </div>
      </div>
      <Button
        deltaX={viewX}
        setViewX={setViewX}
        next
        eventsLength={eventsLength}
      />
    </div>
  );
}
