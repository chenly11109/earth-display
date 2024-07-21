/**
 * 不是react组件，是className
 * 下面是用法
 */

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './index.scss'

export function longitudinalEmbeddedNavbarTemplate() {
  const tabList=['Basic','Position','Member','Decision-Making','Management']

  return (
    <>
      <Tabs>
        <TabList className='longitudinalEmbeddedNavbar'>
          {
            tabList.map((tab,index) => {
              return (
                <Tab key={index}>{tab}</Tab>
              )
            })
          }
        </TabList>
        {
          tabList.map((tab,index) => {
            return (
              <TabPanel key={index}></TabPanel>
            )
          })
        }
      </Tabs>
    </>
  );
}
