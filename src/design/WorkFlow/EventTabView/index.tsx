import "./index.css";
import { Event } from "../../../types/workflow";
import { useNavigate } from "react-router-dom";

export default function EventTabView({ event }: { event: Event }) {
  const { positionX, positionY, prerequisite, eventNo, eventName } = event;
  const navigate = useNavigate();
  return (
    <div
      className="eventTabView_container"
      style={{
        transform: `translate(${(positionX - 1) * 300}px,${
          (positionY - 1) * 200
        }px)`,
      }}
      onClick={() => {
        navigate(`../eventView/${event.eventId}`,{state:"eventView"});
      }}
    >
      <div className="eventTabView_id">{eventNo}</div>
      <div className="eventTabView_name">{eventName}</div>
      <hr className="eventTabView_hr" />
      <div className="eventTabView_title">Prerequisite of event</div>
      <div className="eventTabView_prerequisite">{prerequisite}</div>
    </div>
  );
}
