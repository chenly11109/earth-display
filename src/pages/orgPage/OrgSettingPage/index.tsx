import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './index.scss'
import Basic from './Basic';
import Position from './Position';
import { useOrgPageStore } from '../../../state/OrgPageState';

const useOrgSettingPageStore = useOrgPageStore.getState().OrgSettingPageStore

export default function OrgSettingPage() {
  const { orgSettingStep, setOrgSettingStep } = useOrgSettingPageStore()
  const tabList=['Basic','Position','Member','Decision-Making','Management']
console.log('orgSettingStep',orgSettingStep)
  return (
    <>
      <Tabs defaultIndex={orgSettingStep}
      >
        {/* 侧边栏 */}
        <TabList className='longitudinalEmbeddedNavbar'
          style={{height: `calc(${584-42}/1080*100vh)`}}  // 42是titlebar的高度
        >
          {
            tabList.map((tab,index) => {
              return (
                <Tab 
                  key={index}
                  onClick={()=>setOrgSettingStep(index)}
                >{tab}</Tab>
              )
            })
          }
        </TabList>
        {
          tabList.map((tab,index) => {
            if(index === orgSettingStep){
              return (
                <TabPanel key={index}
                  style={{
                    width: 'calc(786/1080*100vh)',
                    height: 'calc(540/1080*100vh)'
                  }}
                >
  
                  {
                    index === 0 ? 
                      // Basic
                      <Basic />
                    : index === 1 ? 
                      // Position
                      <Position />
                    : null
  
                  }
  
                </TabPanel>
              )
            } else {
              return (
                <TabPanel key={index} >
                </TabPanel>
              )
            }
          })
        }
      </Tabs>
    </>
  )
}
