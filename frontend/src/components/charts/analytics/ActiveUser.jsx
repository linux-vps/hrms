import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function ActiveUser( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500     =   '#22C55E';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Daily',
      data: [70, 121, 135, 105, 76, 150, 195],
      fill: false,
      borderColor: text_secondary_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    },
    {
      label: 'Weekly',
      data: [471, 521, 635, 534, 483, 504, 675],
      fill: false,
      borderColor: text_primary_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    },
    {
      label: 'Monthly',
      data: [1689, 1986, 2175, 1921, 1631, 2032, 1683],
      fill: false,
      borderColor: text_green_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Daily',
      data: [170, 111, 85, 95, 176, 110, 95],
      fill: false,
      borderColor: text_secondary_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    },
    {
      label: 'Weekly',
      data: [471, 521, 635, 534, 483, 504, 875],
      fill: false,
      borderColor: text_primary_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    },
    {
      label: 'Monthly',
      data: [1689, 1986, 2175, 1921, 1631, 2032, 2683],
      fill: false,
      borderColor: text_green_500,
      borderWidth: 1,
      radius: 0,
      tension: 0.1
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      y: {
        duration: 2000,
        from: 500
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          lineWidth : 0.5,
        },
        title: {
          display: true,
          text: 'August'
        }
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        Min: -10,
        Max: 200
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
        <Line options={isOptions} data={isData} className="max-w-100" />
      </div>
    </Card>
  );
}