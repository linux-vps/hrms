import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function Revenue( props ) {
  // Chart color
  const text_green_500     =   '#22C55E';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Facebook Ads',
      data: [1670, 1421, 1535, 1834, 1483, 1304, 1975],
      fill: false,
      borderColor: "#1877f2",
      backgroundColor: "#1877f2",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Google Ads',
      data: [1290, 1204, 1175, 1421, 2331, 2532, 2283],
      fill: false,
      borderColor: text_green_500,
      backgroundColor: text_green_500,
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Twitter Ads',
      data: [290, 204, 175, 421, 131, 132, 283],
      fill: false,
      borderColor: "#1da1f2",
      backgroundColor: "#1da1f2",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Youtube Ads',
      data: [590, 604, 775, 821, 831, 932, 983],
      fill: false,
      borderColor: "#ff0000",
      backgroundColor: "#ff0000",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Tiktok Ads',
      data: [290, 304, 575, 621, 731, 832, 983],
      fill: false,
      borderColor: "#010101",
      backgroundColor: "#010101",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Facebook Ads',
      data: [1470, 1321, 1835, 1834, 2483, 2304, 1575],
      fill: false,
      borderColor: "#1877f2",
      backgroundColor: "#1877f2",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Google Ads',
      data: [2290, 2204, 2175, 2421, 2331, 2532, 2283],
      fill: false,
      borderColor: text_green_500,
      backgroundColor: text_green_500,
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Twitter Ads',
      data: [590, 504, 575, 621, 731, 632, 583],
      fill: false,
      borderColor: "#1da1f2",
      backgroundColor: "#1da1f2",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Youtube Ads',
      data: [290, 504, 575, 521, 631, 732, 483],
      fill: false,
      borderColor: "#ff0000",
      backgroundColor: "#ff0000",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Tiktok Ads',
      data: [690, 604, 675, 521, 431, 332, 283],
      fill: false,
      borderColor: "#010101",
      backgroundColor: "#010101",
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      y: {
        duration: 4000,
        from: 500
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        },
        grid: {
          display: false              }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Total Revenue'
        },
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