import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function VisitorChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11'],
    datasets: [{
      label: 'Previous Week',
      data: [1323, 1481, 1588, 1602, 1720, 1801, 1925, 1628, 1581, 1788, 1802],
      fill: {
        target: 'origin'
      },
      borderColor: text_secondary_500,
      backgroundColor: hexToRGBA( text_secondary_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_secondary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_secondary_500,
      pointHoverRadius: 5,
      pointRadius: 0
    },
    {
      label: 'Current Week',
      data: [1170, 1321, 1835, 1834, 2083, 1904, 2175, 2221, 2135, 2334, 2483],
      fill: {
        target: 'origin'
      },
      borderColor: text_primary_500,
      backgroundColor: hexToRGBA( text_primary_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_primary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_primary_500,
      pointHoverRadius: 5,
      pointRadius: 0,
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10', 'Jun 11'],
    datasets: [{
      label: 'Previous Week',
      data: [2323, 3481, 4588, 3602, 4720, 3801, 4925, 4628, 3581, 3788, 3802],
      fill: {
        target: 'origin'
      },
      borderColor: text_secondary_500,
      backgroundColor: hexToRGBA( text_secondary_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_secondary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_secondary_500,
      pointHoverRadius: 5,
      pointRadius: 0
    },
    {
      label: 'Current Week',
      data: [3170, 3321, 4835, 3834, 3083, 4904, 3175, 3221, 3135, 4334, 4483],
      fill: {
        target: 'origin'
      },
      borderColor: text_primary_500,
      backgroundColor: hexToRGBA( text_primary_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_primary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_primary_500,
      pointHoverRadius: 5,
      pointRadius: 0,
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
          display: false
        }
      },
      y: {
        display: true,
        grid: {
          lineWidth : 0.5
        }
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
        <Line options={isOptions} data={isData} className="max-w-100" />
      </div>
    </Card>
  );
}