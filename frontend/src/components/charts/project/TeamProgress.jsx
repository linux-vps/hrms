import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeamProgress( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500 = '#22C55E';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Complete','In Porgress','Not Finished'],
    datasets: [{
      label: 'Progress',
      data: [74, 9, 17],
      backgroundColor: [
        text_green_500,
        text_primary_500,
        text_secondary_500,
      ],
      hoverOffset: 4
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Complete','In Porgress','Not Finished'],
    datasets: [{
      label: 'Progress',
      data: [54, 19, 27],
      backgroundColor: [
        text_green_500,
        text_primary_500,
        text_secondary_500,
      ],
      hoverOffset: 4
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      delay: 1000
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  // change data
  const [isData, setData] = useState(data1);
  const [isOptions, setOptions] = useState(options1);
  const [isActive, setActive] = useState(1);
  // change value
  const updateValue = () => {
    setData(data2);
    setActive(2);
    setOptions(options1);
  };
  // reset value
  const resetValue = () => {
    setData(data1);
    setActive(1);
    setOptions(options1);
  };

  // text info
  const text_dropdown = {one: "Last month", two: "This month"}

  const text_data1 = [
    { label: 'Complete', data: 74, color: text_green_500 },
    { label: 'In Porgress', data: 9, color: text_primary_500 },
    { label: 'Not Finished', data: 17, color: text_secondary_500 },
  ]
  const text_data2 = [
    { label: 'Complete', data: 54, color: text_green_500 },
    { label: 'In Porgress', data: 19, color: text_primary_500 },
    { label: 'Not Finished', data: 27, color: text_secondary_500 },
  ]
  const dataLoop = isActive === 1 ? text_data1 : isActive === 2 ? text_data2 :'' ;
  const data1_percent = 74 + "%";
  const data2_percent = 54 + "%";
  const dataPercent = isActive === 1 ? data1_percent : isActive === 2 ? data2_percent :'' ;

  return (
    <Card className="h-full">
      <Row className="justify-between pb-4">
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

      <div className="relative mx-auto text-center w-2/3 sm:w-1/2 lg:w-full">
        <Doughnut options={isOptions} data={isData} className="max-w-100" />
        <p className="text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{dataPercent}</p>
      </div>
      <div className="relative">
        <div className="flex flex-row justify-between mt-6">
        {dataLoop.map( (item, index ) => {
          const percent_color = item.color === text_green_500 ? 'text-green-500' : item.color === text_primary_500 ? 'text-indigo-500' : 'text-pink-500';
          return(
          <div key={index} className="block text-center px-2">
            <h6 className="text-sm font-semibold nowrap block mt-1">{item.label}</h6>
            <h5 className={`text-xl ${percent_color} font-bold block py-2`}>{item.data}%</h5>
          </div>
          )})}
        </div>
      </div>
    </Card>
  );
}