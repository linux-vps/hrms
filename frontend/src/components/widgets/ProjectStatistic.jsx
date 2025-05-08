import React, { useState } from 'react';
import { ThreeDots, Cash, ListTask, PeopleFill  } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';

export default function MonthlyRevenue(props) {
  const data1 = [
    {title: "Budget", description: "Total Project Budget", icon: <Cash className="w-8 h-8 text-indigo-500" />, total: 1280, previous: 980, dollar: true},
    {title: "Task", description: "All Task Progress", icon: <ListTask className="w-8 h-8 text-indigo-500" />, total: 230, previous: 160, dollar: false },
    {title: "Team", description: "Total Team Member", icon: <PeopleFill className="w-8 h-8 text-indigo-500" />, total: 30, previous: 25, dollar: false }
  ]

  const [isActive, setActive] = useState(1);
  // change value
  const updateValue = () => {
    setActive(2);
  };
  // reset value
  const resetValue = () => {
    setActive(1);
  };
  // text info
  const text_dropdown = {one: "Last month", two: "This month"}

  return (
    <Card className="h-full">
      <Row className="justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
        
        {/* dropdown filter  */}
        <Menu as="div" className="relative">
          <MenuButton className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
            <ThreeDots className="w-6 h-6" />
          </MenuButton>
          <MenuItems as="div" className="min-w-12 origin-top-right absolute ltr:right-0 rtl:left-0 rounded rounded-t-non bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700">
            <button onClick={resetValue} className={`${isActive === 1 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.two}</button>
            <button onClick={updateValue} className={`${isActive === 2 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.one}</button>
          </MenuItems>
        </Menu>
      </Row>
      <div className="relative flex">
        <ul className="p-2 mt-2 space-y-2 w-full">
          {data1.map( (list, index) => {
          const data_total1 = list.dollar === true ? list.total + '$' : list.total + ' ' + list.title;
          const data_total2 = list.dollar === true ? list.previous + '$' : list.previous + ' ' + list.title;
          const data_total = isActive === 1 ? data_total1 : isActive === 2 ? data_total2 : '';

          return(
          <li key={index} className="flex">
            <div className="inline-flex items-center w-full py-1 px-3 text-sm font-semibold rounded">
              <span className="flex items-center justify-center w-14 h-14 rounded-full sm:bg-gray-100 dark:sm:bg-gray-900 dark:bg-opacity-20 relative text-center">
                {list.icon}
              </span>
              <div className="ltr:ml-6 ltr:pl-2 rtl:mr-6 rtl:pr-2 pt-1 text-base ltr:text-left rtl:text-right">
                <div className="mb-1 text-gray-800 dark:text-gray-300">{list.title}</div>
                <div className="text-gray-500 text-sm hidden sm:block">{list.description}</div>
              </div>
              <div className="ltr:ml-auto ltr:pl-2 rtl:mr-auto rtl:pr-2 pt-1 text-base ltr:text-right rtl:text-left">
                <div className="font-bold text-green-500">{data_total}</div>
              </div>
            </div>
          </li>
          )})}
        </ul>
      </div>
    </Card>
  );
}