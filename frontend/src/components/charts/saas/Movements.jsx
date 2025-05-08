import React, { useState } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Row, Card } from '@/components/reactdash-ui';
import { ThreeDots } from 'react-bootstrap-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function Movements( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_green_500     =  '#22C55E';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
    datasets: [{
      label: 'Total MMR',
      yAxisID: 'A',
      data: [1023, 1181, 1588, 1702, 1920, 2001, 2325],
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
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' Total'
        }
      }
    },
    {
      label: 'New MMR',
      yAxisID: 'B',
      data: [170, 121, 185, 134, 203, 194, 275],
      fill: {
        target: 'origin'
      },
      borderColor: text_green_500,
      backgroundColor: hexToRGBA( text_green_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_green_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_green_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' New'
        }
      }
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
    datasets: [{
      label: 'Total MMR',
      yAxisID: 'A',
      data: [1223, 1081, 988, 1102, 1420, 1901, 2425],
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
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' Total'
        }
      }
    },
    {
      label: 'New MMR',
      yAxisID: 'B',
      data: [190, 221, 285, 234, 193, 194, 215],
      fill: {
        target: 'origin'
      },
      borderColor: text_green_500,
      backgroundColor: hexToRGBA( text_green_500, 0.1),
      tension: 0.3,
      pointBackgroundColor: text_green_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_green_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' New'
        }
      }
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      delay: 1000
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      A: {
        position: 'left',
        grid: {
          lineWidth : 0.5
        },
        min: 0,
        max: 3000,
        ticks: {
          // Include % in the ticks
          callback: function(value, index, ticks) {
              return '$' + value;
          }
        }
      },
      B: {
        position: 'right',
        grid: {
          display: false
        },
        min: 0,
        max: 500,
        ticks: {
          // Include % in the ticks
          callback: function(value, index, ticks) {
              return '$' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
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