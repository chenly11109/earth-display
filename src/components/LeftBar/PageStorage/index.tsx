import { animated, useTransition } from '@react-spring/web';
import { useLocation, useNavigate } from 'react-router-dom';
import {FadeOut1 } from '../../../config/animation';
import { useLeftBarStore } from '../../../state/leftBar';
import './index.css';


export default function PageStorage() {
  const location = useLocation();
  const modal = useLeftBarStore((state) => state.modal.openModal);
  const selectedIndex = useLeftBarStore((state) => state.modal.selectedIndex);
  const modalsCount = modal.length;

  const {
    setShowModal,
    showModal,
    setHomePageLink,
    homePageLink,
  } = useLeftBarStore((state) => state);

  const navigate = useNavigate();
  const transitions = useTransition(modalsCount && !showModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: FadeOut1,
  });
  return transitions(
    (styles, item) =>
      item? (
        <animated.div
          className="page_storage"
          style={styles}
          onClick={() => {
            //非全屏应用窗口为打开状态 -> 关闭窗口
            if (showModal) {
              navigate(homePageLink);
              setHomePageLink("");
            }
            //非全屏应用窗口为关闭状态 -> 打开窗口
            if (!showModal) {
              setHomePageLink(location.pathname);
              navigate(
                `/modal${
                  modal.find((modal) => modal.index === selectedIndex)?.link
                }`
              );
            }

            setShowModal(!showModal);
          }}
        >
          <div className="storage_text">Mount page saver : {modalsCount}</div>
        </animated.div>
      ):""
  );
}
