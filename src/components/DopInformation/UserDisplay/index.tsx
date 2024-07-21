import "./index.css";
import UserImage from "./userImage.png";
import Distribution from "../Distribution";

import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

const BasicInformation = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <img style={{ width: "200px", height: "200px" }} src={UserImage} alt="" />
      <div style={{ position: "relative", top: "30px", marginLeft: "2vw" }}>
        <div style={{ color: "greenyellow", fontSize: "28px" }}>Consec</div>
        <div className="dopPage_statistics_display">
          <div>
            <div className="dopPage_user_category">Price</div>
            <div className="dopPage_user_numContainer">
              <span className="dopPage_user_number">36,803.88</span>
              <span className="dopPage_user_number--small">0.25% ^</span>
            </div>
          </div>
          <div>
            <div className="dopPage_user_category">Market Capitalization</div>
            <div className="dopPage_user_number">12,563.25</div>
          </div>
          <div>
            <div className="dopPage_user_category">HFMC</div>
            <div className="dopPage_user_number">7895.87</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const commonConfig = {
  mass: 1,
  tension: 60,
  friction: 14,
};

export default function UserDisplay() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
    //   setTimeout(()=>setRotate(true),1000)
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
      <div className="dopPage_userDisplay_title_container">
        <span className="dopPage_userDisplay_title" style={{ color: "white" }}>
          Asset
        </span>{" "}
        | <span className="dopPage_userDisplay_title">Introduction</span> |{" "}
        <span className="dopPage_userDisplay_title">Initiator</span>
      </div>
      <BasicInformation />
      <Distribution />
      <div></div>
    </animated.div>
  );
}
