import { ReactComponent as SaveLogo } from "../../../design/Dop/icons/save.svg";
import { ReactComponent as ShareLogo } from "../../../design/Dop/icons/share.svg";
import { animated, useSpring } from "@react-spring/web";
import "./index.css";
import { useEffect, useState } from "react";

const events = [
  {
    eventNo: 1,
    eventName: "Weekly Call",
    participants: "1.2k",
    accomplish:
      "A Participate in our weekly community call, usually at 8:00 UTC on Satuerday.",
  },
  {
    eventNo: 2,
    eventName: "Publicity Workflow",
    participants: "1k",
    accomplish:
      "  Invite friends to our DO! The more people you invite, the more tags you will get, and the greater the proportion of voting will be.      ",
  },
  {
    eventNo: 3,
    eventName: "Complete IR",
    participants: "1861",
    accomplish: " When Users S1-Financing1-Data:[Input Valu...",
    reward: "master",
  },
  {
    eventNo: 4,
    eventName: "Publicity DOP",
    participants: "1.2k",
    accomplish:
      "Share current Workflow to platforms , and been visited at least 100 time.",
  },
  {
    eventNo: 5,
    eventName: "Twitter",
    participants: "1k",
    accomplish:
      "  Create a Twitter thread using data about a specific topic related to Consectetur Protocol.",
  },
  {
    eventNo: 6,
    eventName: "Meme",
    participants: "1861",
    accomplish:
      " Meme is the soul of a community, we don't have our own meme yet, create your first meme!",
    reward: "reward",
  },
];

function EventTab({ event }: { event: any }) {
  const { eventNo, eventName, participants, accomplish, reward } = event;
  return (
    <div className="dopPage_event_container">
      <div>
        <span
          style={{
            color: "#E7B6FF",
          }}
        >
          Event{eventNo}
        </span>{" "}
        - {eventName}
      </div>
      <div>Accomplish Condition : {accomplish}</div>
      <div
        style={{
          color: "grey",
          position: "absolute",
          top: "5px",
          right: "15px",
          fontSize: "18px",
        }}
      >
        <span style={{ color: "#E7B6FF" }}>{participants}</span> Participants
      </div>
      {reward ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            left: "-10px",
          }}
        >
          <div className="icon_selected" />
          Reward:
          <span className="tagItem_tag">{reward}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const commonConfig = {
  mass: 1,
  tension: 60,
  friction: 14,
};

export default function EventsDisplay() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    setStart(true);
  }, []);
  const { trY, o } = useSpring({
    trY: start ? 0 : -1080,
    o: start ? 1 : 0,
    config: commonConfig,
  });
  return (
    <animated.div
      style={{
        transform: trY.to((ty) => `translateY(${ty}px)`),
        opacity: o,
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <div style={{ fontSize: "24px" }}>Workflow Name balabalab blah</div>
        <div>12 Events</div>
        <div style={{ position: "absolute", right: "0", top: "50px" }}>
          <div>
            <SaveLogo className="dopPage_user_save" />
            <ShareLogo className="dopPage_user_save" />
          </div>
        </div>
      </div>

      <div>
        {events.map((event: any, i) => (
          <EventTab event={event} key={i} />
        ))}
      </div>
    </animated.div>
  );
}
