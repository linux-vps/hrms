import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TrafficSource( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500     = '#22C55E';
  const text_yellow_500    =   '#F59E0B';
  // hex to rgba color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }
  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Search Engine','Social Post','Paid Ads','Refferal Link','Direct Link','Other Source'],
    datasets: [{
      label: 'Traffic Source',
      data: [925, 430, 252, 135, 78, 53],
      backgroundColor: [
        text_green_500,
        text_primary_500,
        hexToRGBA( text_primary_500, 0.6),
        text_yellow_500,
        hexToRGBA( text_yellow_500, 0.6),
        text_secondary_500,
      ],
      hoverOffset: 4
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Search Engine','Social Post','Paid Ads','Refferal Link','Direct Link','Other Source'],
    datasets: [{
      label: 'Traffic Source',
      data: [1125, 230, 152, 335, 178, 23],
      backgroundColor: [
        text_green_500,
        text_primary_500,
        hexToRGBA( text_primary_500, 0.6),
        text_yellow_500,
        hexToRGBA( text_yellow_500, 0.6),
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
        display: true,
        position: "bottom",
      }
    }
  };

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
    </Card>
  );
}