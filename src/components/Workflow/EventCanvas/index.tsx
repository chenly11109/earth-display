import { AddEventTab, EventTab } from "../../../design/WorkFlow/EventTab";
import "./index.css";
import { useWorkflowStore } from "../../../state/workflow";
import { Event_Position } from "../../../types/workflow";
import Draggable from "react-draggable";
import { useRef, useState } from "react";

function Box({
  i,
  events,
  addEvent,
}: {
  i: number;
  events?: Array<Event_Position>;
  addEvent?: true;
}) {
  const event = events?.find((event) => event.position === i);

  const box = event ? (
    <EventTab event={event} key={event.eventNo} />
  ) : addEvent ? (
    <AddEventTab />
  ) : (
    ""
  );

  const { currentEvent, selectedPosition } = useWorkflowStore(
    (state) => state.eventsLayout
  );

  const {
    changeSelectedPosition,
    changeCurrentEvent,
    moveEvent,
    removeEmptyColumn,
    insertColumn,
  } = useWorkflowStore((state) => state.eventsLayoutUtils);

  const nodeRef = useRef(null);
  const [onDrag, setOnDrag] = useState(false);
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      position={{ x: 0, y: 0 }}
      scale={1}
      bounds="parent"
      disabled={!event}
      nodeRef={nodeRef}
      onStart={() => {
        if (event) {
          changeSelectedPosition(i);
          changeCurrentEvent(event.eventNo);
        }
      }}
      onDrag={() => {
        setOnDrag(true);
      }}
      onStop={(e, data) => {
        setOnDrag(false);
        const xIndex = Math.round(data.x / 300);
        const yIndex = Math.round(data.y / 170);

        if (selectedPosition !== null) {
          const index = selectedPosition + 3 * xIndex + yIndex;
          const occupiedBox = events?.find((event) => event.position === index);
          const onSameColumn =
            Math.floor(selectedPosition / 3) === Math.floor(index / 3);
          //move the event to an existing column, make sure they are not of same column then push that column right
          if (occupiedBox && !onSameColumn) insertColumn(index);
          //move the event tab and make sure there are no empty spots left
          if (!onSameColumn || !occupiedBox) moveEvent(currentEvent, index);
          removeEmptyColumn();
        }
        changeSelectedPosition(null);
      }}
    >
      <div
        ref={nodeRef}
        className="box_container"
        style={{ opacity: onDrag ? "0.8" : "1", zIndex: onDrag ? "1" : "0" }}
      >
        {box}
      </div>
    </Draggable>
  );
}

function Button({ next }: { next?: true }) {
  const { page, eventsLength, selectedPosition } = useWorkflowStore(
    (state) => state.eventsLayout
  );

  const { nextPage, prevPage } = useWorkflowStore((state) => state.eventsLayoutUtils);
  const display = next
    ? page < eventsLength - 4
      ? "block"
      : "none"
    : page > 0
    ? "block"
    : "none";
  const movePage = next ? nextPage : prevPage;
  let timer: NodeJS.Timeout | null;
  return (
    <div
      className={`button_page ${
        next ? "button_canvas_next" : "button_canvas_prev"
      }`}
      style={{ display: display }}
      onClick={() => {
        movePage();
      }}
      //can move to next / prev page when hover on the button with an event pressed
      onMouseEnter={() => {
        timer = selectedPosition && setTimeout(() => movePage(), 500);
      }}
      onMouseLeave={() =>
        selectedPosition && clearTimeout(timer as NodeJS.Timeout)
      }
    >
      {next ? ">" : "<"}
    </div>
  );
}

export default function EventCanvas() {
  const { eventsLength, events, page } = useWorkflowStore(
    (state) => state.eventsLayout
  );
  const boxWidth = 300;

  const canvasWidth =
    (eventsLength + 1) * boxWidth > boxWidth * 5
      ? boxWidth * 5
      : (eventsLength + 1) * boxWidth;

  const boxes = [];
  for (let i = 0; i < 3 * eventsLength; i++) {
    boxes.push(<Box i={i} events={events} key={i} />);
  }
  boxes.push(<Box i={3 * eventsLength} key={3 * eventsLength} />);
  boxes.push(
    <div>
      <Box
        i={3 * eventsLength + 1}
        key={3 * eventsLength + 1}
        addEvent={true}
      />
    </div>
  );
  boxes.push(<Box i={3 * eventsLength + 2} key={3 * eventsLength + 2} />);

  return (
    <div className="event_canvas_container">
      <Button />
      <div style={{ width: canvasWidth }} className="event_canvas_viewport">
        <div
          style={{ transform: `translate(${-page * boxWidth}px)` }}
          className="event_canvas"
        >
          {boxes}
        </div>
      </div>
      <Button next />
    </div>
  );
}
