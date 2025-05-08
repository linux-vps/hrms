import React, { useState } from 'react';
import { Facebook, Google, Microsoft, Tiktok, ThreeDots  } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card, Currency } from '@/components/reactdash-ui';

export default function Campaigns(props) {
  // data 
  const table_title = {platform: "Platform", spend:"Spend", ctr:"CTR", cpa:"CPA", lead:"Lead",conversion:"Conv"}
  const data1 = [
    { platform: "Facebook Ads", icon: <Facebook className="text-facebook my-2 w-6 h-6 mr-3 inline-block" />, spend: 5400, ctr: 23, cpa: 35, lead: 340,conversion: 24},
    { platform: "Google Ads", icon: <Google className="text-blue-500 my-2 w-6 h-6 mr-3 inline-block" />, spend: 3400, ctr: 18, cpa: 25, lead: 440,conversion:44},
    { platform: "Microsoft Ads", icon: <Microsoft className="text-blue-300 my-2 w-6 h-6 mr-3 inline-block" />, spend: 3500, ctr: 19, cpa: 25, lead: 390,conversion: 11},
    { platform: "Tiktok Ads", icon: <Tiktok className="text-tiktok my-2 w-6 h-6 mr-3 inline-block" />, spend: 3000, ctr: 35, cpa: 15, lead: 260,conversion: 22},
  ]
  const data2 = [
    { platform: "Facebook Ads", icon: <Facebook className="text-facebook my-2 w-6 h-6 mr-3 inline-block" />, spend: 4600, ctr: 19, cpa: 25, lead: 230,conversion: 14},
    { platform: "Google Ads", icon: <Google className="text-blue-500 my-2 w-6 h-6 mr-3 inline-block" />, spend: 2800, ctr: 18, cpa: 23, lead: 340,conversion:24},
    { platform: "Microsoft Ads", icon: <Microsoft className="text-blue-300 my-2 w-6 h-6 mr-3 inline-block" />, spend: 2400, ctr: 19, cpa: 22, lead: 290,conversion: 10},
    { platform: "Tiktok Ads", icon: <Tiktok className="text-tiktok my-2 w-6 h-6 mr-3 inline-block" />, spend: 2500, ctr: 35, cpa: 16, lead: 160,conversion: 15},
  ]

  const [isData, setData] = useState(data1);
  const [isActive, setActive] = useState(1);

  // change value
  const updateValue = () => {
    setData(data2);
    setActive(2);
  };
  // reset value
  const resetValue = () => {
    setData(data1);
    setActive(1);
  };
  // text info
  const text_dropdown = {one: "Last month", two: "This month"}

  return (
    <Card className="h-full">
      <Row className="justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
        
        {/* dropdown filter  */}
        <Menu as="div" className="relative">
          <MenuButton className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
            <ThreeDots className="w-6 h-6" />
          </MenuButton>
          <MenuItems as="div" className="min-w-12 origin-top-right absolute ltr:right-0 rtl:left-0 rounded rounded-t-non bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700">
            <button onClick={resetValue} className={`${isActive === 1 ? 'bg-gray-100 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.two}</button>
            <button onClick={updateValue} className={`${isActive === 2 ? 'bg-gray-100 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.one}</button>
          </MenuItems>
        </Menu>
      </Row>
       <div className="relative">
        <div className="overflow-x-auto">
          <table className="table-bordered-bottom table-sm w-full ltr:text-left rtl:text-right text-sm">
            <thead>
              <tr>
                <th>{table_title.platform}</th>
                <th>{table_title.spend}</th>
                <th>{table_title.ctr}</th>
                <th>{table_title.cpa}</th>
                <th>{table_title.lead}</th>
                <th>{table_title.conversion}</th>
              </tr>
            </thead>
            <tbody>
              {isData.map( (list,index) =>
              <tr key={index}>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="text-sm leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      {list.icon} {list.platform}
                    </div>
                  </div>
                </td>
                <td>
                  <div><Currency data={list.spend} /></div>
                </td>
                <td>
                  <div>{list.ctr}%</div>
                </td>
                <td>
                  <div><Currency data={list.cpa} /></div>
                </td>
                <td>
                  <div>{list.lead}</div>
                </td>
                <td className="text-center">
                  <div>{list.conversion}</div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
         </div>
       </div>
    </Card>
  );
}