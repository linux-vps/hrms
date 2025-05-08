import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Increment( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data 1 (props.data1)
  const data1 = {
    labels: [
      'Email', 'Google Ads', 'Facebook Ads', 'Tiktok Ads', 'Twitter', 'Instagram', 'Others',
    ],
    datasets: [{
      label: 'Clents',
      data: [1270, 1020, 955, 922, 798, 722, 698],
      backgroundColor: [
        text_primary_500,
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_primary_500, 0.7),
        hexToRGBA( text_primary_500, 0.6),
        hexToRGBA( text_primary_500, 0.5),
        hexToRGBA( text_primary_500, 0.4),
        hexToRGBA( text_primary_500, 0.2)
      ],
      borderColor: [
        text_primary_500,
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_primary_500, 0.7),
        hexToRGBA( text_primary_500, 0.6),
        hexToRGBA( text_primary_500, 0.5),
        hexToRGBA( text_primary_500, 0.4),
        hexToRGBA( text_primary_500, 0.2)
      ],
      borderWidth: 1,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: [
      'Email', 'Google Ads', 'Facebook Ads', 'Tiktok Ads', 'Twitter', 'Instagram', 'Others',
    ],
    datasets: [{
      label: 'Clents',
      data: [1570, 1520, 1955, 1922, 1798, 1722, 1698],
      backgroundColor: [
        text_primary_500,
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_primary_500, 0.7),
        hexToRGBA( text_primary_500, 0.6),
        hexToRGBA( text_primary_500, 0.5),
        hexToRGBA( text_primary_500, 0.4),
        hexToRGBA( text_primary_500, 0.2)
      ],
      borderColor: [
        text_primary_500,
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_primary_500, 0.7),
        hexToRGBA( text_primary_500, 0.6),
        hexToRGBA( text_primary_500, 0.5),
        hexToRGBA( text_primary_500, 0.4),
        hexToRGBA( text_primary_500, 0.2)
      ],
      borderWidth: 1,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      x: {
        duration: 4000,
        from: 0
      }
    },
    scales : {
      x: {
        display: true,
        grid: {
          lineWidth : 0.5
        },
        ticks: {
          // Include % in the ticks
          callback: function(value, index, ticks) {
              return '$' + value;
          }
        }
      },
      y: {
        display: true,
        grid: {
          display: false
        }
      }
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
        <Bar options={isOptions} data={isData} className="max-w-100" />
      </div>
    </Card>
  );
}