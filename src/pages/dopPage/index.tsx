import { useState } from "react";
import UserInformation from "../../components/DopInformation/UserInformation";
import WorkflowInformation from "../../components/DopInformation/WorkflowInformation";
import Awards from "../../components/DopInformation/Awards";
import "./index.scss";
import UserDisplay from "../../components/DopInformation/UserDisplay";
import EventsDisplay from "../../components/DopInformation/EventsDisplay";

export default function DopPage() {
  const [showEvents, toggleShowEvents] = useState(false);
  return (
    <div className="dopPage_container">
      <div
        className="dopPage_left_container"
        onClick={(e) => {
          e.preventDefault();
          toggleShowEvents(false);
        }}
      >
        <UserInformation />
        <div style={{ position: "relative" }}>
          <hr className="dopPage_hr" />
          <WorkflowInformation toggleShowEvents={toggleShowEvents} />
        </div>
        <Awards />
      </div>
      <div className="dopPage_right_container">
        {showEvents ? <EventsDisplay /> : <UserDisplay />}
      </div>
    </div>
  );
}
