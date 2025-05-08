import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card, Progress, Currency } from '@/components/reactdash-ui';

export default function MonthlyRevenue(props) {
  // data 
  const data1 = {revenue: 4230, target: 5000}
  const data2 = {revenue: 2530, target: 4500}
  const from_text = "From target";

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
  const percent = ( isData.revenue / isData.target ) * 100;
  const text_color = percent > 80 ? 'text-green-600' : percent > 60 ? 'text-indigo-600' : percent > 40 ? 'text-yellow-500' : percent > 20 ? 'text-gray-600' : 'text-red-600';
  const percent_color = percent > 80 ? 'success' : percent > 60 ? 'primary' : percent > 40 ? 'warning' : percent > 20 ? 'light' : 'danger';
  // text info
  const text_one = "Last month";
  const text_two = "This month";

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
            <button onClick={resetValue} className={`${isActive === 1 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_two}</button>
            <button onClick={updateValue} className={`${isActive === 2 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_one}</button>
          </MenuItems>
        </Menu>
      </Row>
      <div className="relative">
        <h4 className={`font-bold text-2xl ${text_color} mb-3`}><Currency data={isData.revenue} /></h4>
        <div className="w-full h-4 rounded-full mt-2">
          <Progress percent={percent.toFixed(0)} color={percent_color} />
        </div>
        <p className="text-sm text-gray-500 mt-3">{from_text} <Currency data={isData.target} /></p>
      </div>
    </Card>
  );
}