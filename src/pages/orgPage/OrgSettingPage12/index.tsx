// import classNames from 'classnames';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useOrgPageStore } from '../../../state/OrgPageState';
// import Modal from '../../../design/Orgnization/modal';
// import List from '../../../design/Orgnization/list';
// import Row from '../../../design/Orgnization/row';
// import BasicInfo from './basic_info';
// import DecisionMaking from './decision_making';

// import './index.scss';
// import Management from './management';
// import PositionAndMember from './position_and_member';

// const useOrgSettingPage = useOrgPageStore.getState().OrgSettingPageStore
// const steps = ['Basic Information', 'Position and Member', 'Decision-Making', 'Management']
// export default function OrgSettingPage() {
//     const [step, setStep] = useState(0)
//     const { authorities } = useOrgSettingPage()
//     const navigate = useNavigate()
//     const [showCloseConfirm, setShowCloseConfirm] = useState(false)
//     const [showCreateWarning, setShowCreateWarning] = useState(false)
//     const [showManagementWarningStyle, setShowManagementWarningStyle] = useState(false)
//     function OrgSettingStep({ step }: { step: number }) {
//         switch (step) {
//             case 0:
//                 return <BasicInfo />
//             case 1:
//                 return <PositionAndMember />
//             case 2:
//                 return <DecisionMaking />
//             case 3:
//                 return <Management showWarningStyle={showManagementWarningStyle} />
//             default:
//                 return null;
//         }
//     }
//     return (
//         <div className="org-setting">
//             <Row className='inner' alignX='space-between'>
//                 <List data={steps} idx={step} setIdx={setStep} />
//                 <OrgSettingStep step={step} />
//                 <button
//                     className='create-btn'
//                     onClick={() => {
//                         let flag = true
//                         for (let i = 0; i < authorities.length; i++) {
//                             if (!flag) break
//                             for (let j = 0; j < authorities[i].length; j++) {
//                                 if (!authorities[i][j].data) {
//                                     flag = false
//                                     break
//                                 }
//                             }
//                         }
//                         if (flag)
//                             navigate('/')
//                         else {
//                             setShowCreateWarning(true)
//                             setShowManagementWarningStyle(true)
//                         }
//                     }}>
//                     Create
//                 </button>
//                 {showCreateWarning && <div className='create-warning-modal'>
//                     <div>Fail to create</div>
//                     <span>Please complete all Management settings</span>
//                     <button className='done_btn' onClick={() => {
//                         setShowCreateWarning(false)
//                     }}>
//                         Done
//                     </button>
//                 </div>}
//             </Row >

//             <button onClick={() => setShowCloseConfirm(true)} className="close-btn">Close</button>
//             {showCloseConfirm && <div className='close-confirm'>
//                 <div>Warning </div>
//                 <span>Your edits will not be saved, please make sure to exit</span>
//                 <Row alignX='space-between' >
//                     <button className='done-btn' onClick={() => { setShowCloseConfirm(false); navigate('/') }}>Done</button>
//                     <button className='cancel-btn' onClick={() => setShowCloseConfirm(false)}>Cancel</button>
//                 </Row>
//             </div >}
//         </div >
//     )
// }
import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}
