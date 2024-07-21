import { Link, useLocation } from "react-router-dom";
import { useLeftBarStore } from "../../../state/leftBar";
import { useEarthStore } from "../../../state/earthMode";
import { ReactComponent as LoginIcon } from '../../../svg/login.svg'
import PageStorage from "../PageStorage";

import "./index.scss";

export default function LeftBar() {
  const location = useLocation();
  const items = useLeftBarStore((state) => state.leftBarLinks);
  const openItems = useLeftBarStore((state) => state.fullscreenApps.openApps);
  const selectedOpenApp = useLeftBarStore(
    (state) => state.fullscreenApps.selectedIndex
  );
  const {
    selectFullscreen,
    openFullscreen,
    setStartIndex,
    setHomePageLink,
    homePageLink,
    fullscreenApps,
    showModal,
    openModal
  } = useLeftBarStore((state) => state);

  const changeStatus = useEarthStore(state=>state.changeStatus);
  return (
    <>
      <div className="left_bar_container">

        {/* HomePage */}
        <Link to="/home" className="item home">
          H
        </Link>

      
      {/*所有现在app里有的应用*/}
        {items.map((item) => (
          <Link
            className="item"
            to={`/${item.type}${item.link}`}
            key={item.index + "default"}
            onClick={() => {
              if (fullscreenApps.selectedIndex === -1 && !showModal)
                setHomePageLink(location.pathname);

              if (item.type === "modal") openModal(item);

              if (item.type === "fullscreen") {
                if (
                  !openItems.find((openItem) => item.index === openItem.index)
                ) {
                  openFullscreen(item);
                } else if (
                  openItems.find((openItem) => item.index === openItem.index)
                ) {
                  selectFullscreen(item.index, false);
                }
              }

              setStartIndex(item.index, false);
            }}
          >
            {/*这一部分可以单独抽取出来做成模板组件，demo版本里有一些*/}
            {item.url?<img src={item.url}/>:<span>{item.title[0]}</span>}
          </Link>
        ))}

    
      {/*所有现在app里打开的应用*/}
        {openItems.map((item) => (
          <Link
            className={`item open ${
              selectedOpenApp === item.index ? "selected" : ""
            }`}
            to={
              selectedOpenApp === item.index
                ? homePageLink
                : `/fullscreen${item.link}`
            }
            key={item.index + "default"}
            onClick={() => {
              if (selectedOpenApp === item.index) setHomePageLink("");
              if (selectedOpenApp === -1) setHomePageLink(location.pathname);
              selectFullscreen(item.index, true);
              setStartIndex(item.index, true);
            }}
          >
            {item.abbr}
          </Link>
        ))}

        {/* 登陆按钮 */}
        <Link to="/login" className="loginButton">
          <LoginIcon className='loginButton__icon' />
        </Link>

        <div className="item change" onClick={changeStatus}>S</div>
      </div>

      

      <PageStorage />
    </>
  );
}
