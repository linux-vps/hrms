import React, { useState } from 'react';
import { ThreeDots, Laptop, ArrowUpShort, ArrowDownShort, Tablet, Phone } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DeviceChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500     = '#22C55E';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Desktop','Tabs','Mobile'],
    datasets: [{
      label: 'Traffic Source',
      data: [925, 30, 552],
      backgroundColor: [
        text_primary_500,
        text_secondary_500,
        text_green_500
      ],
      hoverOffset: 4
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Desktop','Tabs','Mobile'],
    datasets: [{
      label: 'Traffic Source',
      data: [975, 130, 452],
      backgroundColor: [
        text_primary_500,
        text_secondary_500,
        text_green_500
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

  // data by device
  const data_laptop = {new: 925, old: 975 }
  const data_tabs = {new: 30, old: 130 }
  const data_mobile = {new: 552, old: 452 }
  const total_new = data_laptop.new + data_tabs.new + data_mobile.new;
  const total_old = data_laptop.old + data_tabs.old + data_mobile.old;
  const laptop_percent = (data_laptop.new / total_new ) * 100;
  const laptop_percentOld = (data_laptop.old / total_old ) * 100;
  const laptop_progress = ( data_laptop.new - data_laptop.old ) / data_laptop.new * 100;

  const tabs_percent = (data_tabs.new / total_new ) * 100;
  const tabs_percentOld = (data_tabs.old / total_old ) * 100;
  const tabs_progress = ( data_tabs.new - data_tabs.old ) / data_tabs.new * 100;

  const mobile_percent = (data_mobile.new / total_new ) * 100;
  const mobile_percentOld = (data_mobile.old / total_old ) * 100;
  const mobile_progress = ( data_mobile.new - data_mobile.old ) / data_mobile.new * 100;

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

      <div className="relative">
        <Doughnut options={isOptions} data={isData} className="max-w-100" />
      </div>
      <div className="flex flex-row justify-between my-6">
        <div className="block text-center px-3">
          <Laptop className="mx-auto text-indigo-500 w-8 h-8" />
          <h6 className="text-sm font-semibold nowrap block mt-1">Desktop</h6>
          <h5 className="text-xl font-bold block py-2">{ isActive === 1 ? `${laptop_percent.toFixed(0)}%` : `${laptop_percentOld.toFixed(0)}%`} </h5>
          <div className="block items-center">
            { laptop_progress > 1 ? 
            <p className="flex items-center text-sm text-green-500">
            <ArrowUpShort className="inline-block w-4 h-4" /> {laptop_progress.toFixed(1)}%
            </p>
            : 
            <p className="flex items-center text-sm text-pink-500">
              <ArrowDownShort className="inline-block w-4 h-4" /> {laptop_progress.toFixed(1)}%
            </p>
            }
          </div>
        </div>
        <div className="block text-center px-3">
          <Tablet className="mx-auto text-pink-500 w-8 h-8" />
          <h6 className="text-sm font-semibold nowrap block mt-1">Tabs</h6>
          <h5 className="text-xl font-bold block py-2">{ isActive === 1 ? `${tabs_percent.toFixed(0)}%` : `${tabs_percentOld.toFixed(0)}%`} </h5>
          <div className="block items-center">
            { tabs_progress > 1 ? 
            <p className="flex items-center text-sm text-green-500">
            <ArrowUpShort className="inline-block w-4 h-4" /> {tabs_progress.toFixed(1)}%
            </p>
            : 
            <p className="flex items-center text-sm text-pink-500">
              <ArrowDownShort className="inline-block w-4 h-4" /> {tabs_progress.toFixed(1)}%
            </p>
            }
          </div>
        </div>
        <div className="block text-center px-3">
          <Phone className="mx-auto text-green-500 w-8 h-8" />
          <h6 className="text-sm font-semibold nowrap block mt-1">Mobile</h6>
          <h5 className="text-xl font-bold block py-2">{ isActive === 1 ? `${mobile_percent.toFixed(0)}%` : `${mobile_percentOld.toFixed(0)}%`} </h5>
          <div className="block items-center">
            { mobile_progress > 1 ? 
            <p className="flex items-center text-sm text-green-500">
            <ArrowUpShort className="inline-block w-4 h-4" /> {mobile_progress.toFixed(1)}%
            </p>
            : 
            <p className="flex items-center text-sm text-pink-500">
              <ArrowDownShort className="inline-block w-4 h-4" /> {mobile_progress.toFixed(1)}%
            </p>
            }
          </div>
        </div>
      </div>
    </Card>
  );
}