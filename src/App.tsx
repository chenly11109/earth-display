import DefaultPage from "./pages/defaultPage";
import "./App.css";
import Earth from "./components/Earth";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import InfoPage from "./pages/infoPage";
import DopPage from "./pages/dopPage";
import LeftBar from "./components/LeftBar/LeftBar";
//不知道干啥的页面两个
// import DetailPage from "./pages/detailPage";
// import PubContent from "./pages/homePage/PubContent";
import LoginPage from "./pages/loginPage";
import CreateOrgPage from "./pages/orgPage/CreateOrgPage";
import OrganizationPage from "./pages/orgPage/OrganizationPage";
import OrgSettingPage from "./pages/orgPage/OrgSettingPage";
import PositionSetting from "./pages/orgPage/OrgSettingPage/PositionSetting";
import CreateUnitPage from "./pages/orgPage/CreateUnitPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import FullScreenModal from "./design/LeftBar/FullScreenModal";
import Modal from "./design/LeftBar/Modal";
import { useLeftBarStore } from "./state/leftBar";

import WorkFlow from "./pages/workflowPage/Workflow";
import AddNewWorkflow from "./pages/workflowPage/AddWorkflow";
import WorkflowDisplay from "./pages/workflowPage/WorkflowView";
import EventDisplay from "./pages/workflowPage/EventDisplay";
import OrgSettingPage12 from "./pages/orgPage/OrgSettingPage12";



function App() {
  const homePageLink = useLeftBarStore((state) => state.homePageLink);
  // const navigate = useNavigate();

  return (
    <Router>
      <div className="App">

      <LeftBar />
      
        <div className="main_container">
         {/* 地球部分*/}
         <Earth />

          <ErrorBoundary FallbackComponent={ErrorFallback}>
   
              {/* 所有主页-背后没有地球动来动去的那种页面，会放在这里*/}
              <Routes location={homePageLink || location}>
                <Route element={<DefaultPage />} path="/">
                  <Route path="home" element={<HomePage />} />
                  <Route path="dop" element={<DopPage />} />

                  {/* 在项目地球上点击某个地址的话，会跳转到这个页面 */}
                  <Route element={<InfoPage />} path="info/:infoId" />
                </Route>

                <Route element={<LoginPage />} path="/login" />

                <Route element={<CreateOrgPage />} path="/create_org" />
                <Route element={<CreateUnitPage />} path="/create_unit" />

                {/* 不知道干啥的页面一个 */}
                <Route element={<OrgSettingPage12 />} path="/org_setting" />
              </Routes>


              {/*非全屏的应用-一个弹窗在画面中央*/}
              <Routes>
                <Route path="/modal" element={<Modal />}>
                  <Route path="collaboration">
                    <Route index />
                    <Route path="decOrg" />
                  </Route>
                  <Route path="organization">
                    <Route index element={<OrganizationPage />}></Route>
                    <Route path="setting" >
                      <Route index element={<OrgSettingPage />} />
                      <Route path="pos_setting" >
                        <Route index element={<PositionSetting />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Routes>

               {/*全屏的应用-有最大化，最小化的状态管理，以后后端编辑器和前端编辑器引入的话会放在这里 */}
              <Routes>
                <Route path="/fullscreen" element={<FullScreenModal />}>
                  <Route path="applicationEdit"></Route>
                  <Route path="event">
                    <Route index element={<WorkFlow />} />
                    <Route path="addNewWorkflow" element={<AddNewWorkflow />} />
                    <Route
                      path="workflowView/:workflowId"
                      element={<WorkflowDisplay />}
                    />
                    <Route
                      path="eventView/:eventId"
                      element={<EventDisplay />}
                    />
                  </Route>
                </Route>
              </Routes>
     
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

export default App;
