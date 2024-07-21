import { useNavigate, Outlet, useLocation} from "react-router-dom";

import { useTransition, animated } from "@react-spring/web";
import { useLeftBarStore } from "../../../state/leftBar";
import "./index.scss";
import { useWindowDimensions } from "../../../utils/public";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as MinimizeIcon } from "../icons/minimize.svg";

export default function () {
  const navigate = useNavigate();
  const homePageLink = useLeftBarStore(state=>state.homePageLink);
  const location = useLocation();
  const link = location.pathname.split("fullscreen")[1];
  const selectedIndex = useLeftBarStore(
    (state) => state.fullscreenApps.selectedIndex
  );
  const showModal = (selectedIndex !== -1) || (!homePageLink);
  const startIndex = useLeftBarStore((state) => state.startIndex);

  const transitions = useTransition(showModal, {
    from: {
      opacity: 0,
      transform: "scale(0)",
      top: `${startIndex * 80 - 540}px`,
      left: "-960px",
    },
    enter: { opacity: 1, transform: "scale(1)", top: "0px", left: "70px" },
    leave: {
      opacity: 0,
      transform: "scale(0)",
      top: `${startIndex * 80 - 540}px`,
      left: "-960px",
    },
    config: { duration: 600 },
  });

  const { height, width } = useWindowDimensions();
  const { closeFullscreen, minimizeFullscreen, setHomePageLink } = useLeftBarStore(
    (state) => state
  );

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={{ ...styles, height: height + "px", width: width - 70 + "px" }}
          className="fullscreen"
        >
          <Outlet />
           <div className="icon">
           {homePageLink&& <MinimizeIcon
              onClick={() => {
                minimizeFullscreen(link);
                setTimeout(()=>{
                  navigate(homePageLink||"/");
                  setHomePageLink("");
                },1000)
              }}
            />}
            <CloseIcon onClick={
              () => {
                closeFullscreen();
                setTimeout(()=>{
                  navigate(homePageLink||"/");
                  setHomePageLink("");
                },1000)
              }
            } />
          </div>
        </animated.div>
      )
  );
}
