import "./index.css";
import { useState } from "react";
import userImage from "./userImg.png";
import { ReactComponent as SaveLogo } from "../../../design/Dop/icons/save.svg";
import { ReactComponent as ShareLogo } from "../../../design/Dop/icons/share.svg";
import { ReactComponent as Border } from "./border.svg";
import { ReactComponent as BorderHover } from "./border_hover.svg";
import { Link } from "react-router-dom";
import DopIcon from "../../../design/Dop/icons/DopIcon";

export default function UserInformation() {
  const [hover, setHover] = useState(false);
  return (
    <div className="dopPage_userInformation_container">
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}
      >
        <img className="dopPage_userImage" src={userImage} alt="userImage" />
        <div>
          <div style={{ fontSize: "24px" }}> Consectetur Protocol</div>
          <div style={{ fontSize: "18px", color: "grey" }}>
            Created in 2021-07-06
          </div>
          <div
            style={{
              position: "relative",
              top: "20px",
            }}
          >
            <DopIcon type="DEFI" />
            <DopIcon type="CROSS_CHAIN" />
            <DopIcon type="PROTOCOL" />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "90px",
          }}
        >
          <SaveLogo className="dopPage_user_save" />
          <ShareLogo className="dopPage_user_save" />
        </div>
      </div>

      <div>
        <div style={{ fontSize: "20px" }}>Forum</div>
        <div className="dopPage_user_description">
          Consectetur is a decentralized cross-chain protocol that will provide
          a convenient and secure way to allow various blockchains such as
          Algorand, Ethereum, Polygon and other EVM blockchains to truly de ...
        </div>
        <div
          style={{
            fontSize: "18px",
            position: "relative",
            top: "10px",
          }}
        >
          {" "}
          <span style={{ color: " #E7B6FF" }}>13.2k</span> Discuss
        </div>
        <div className="dopPage_button">
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "70px",
              width: "150px",
              height: "80px",
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              setHover(true);
            }}
            onMouseOut={(e) => {
              e.stopPropagation();
              setHover(false);
            }}
          >
            {/* {hover ? (
              <BorderHover
                style={{
                  width: "150px",
                  height: "80px",
                }}
              />
            ) : ( */}
            <Border
              style={{
                width: "150px",
                height: "80px",
              }}
            />
            {/* )} */}
          </div>
          <Link to="/" state={"backToHome"}>
            <span
              style={{
                position: "absolute",
                right: "20px",
                top: "100px",
                fontSize: "20px",
              }}
            >
              Go to Forum
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
