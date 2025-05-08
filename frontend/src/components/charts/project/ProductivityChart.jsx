import React, { useState } from 'react';
import parse from 'html-react-parser';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function ProductivityChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [{
      label: 'Previous Week',
      data: [12, 21, 18, 19, 17, 21, 25, 28],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [5, 5],
      tension: 0.1,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: text_secondary_500
    },
    {
      label: 'Current Week',
      data: [15, 22, 16, 17, 18, 24, 27, 24],
      fill: false,
      borderColor: text_primary_500,
      tension: 0.1,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: text_primary_500
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    datasets: [{
      label: 'Previous Week',
      data: [22, 31, 28, 29, 27, 11, 15, 18],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [5, 5],
      tension: 0.1,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: text_secondary_500
    },
    {
      label: 'Current Week',
      data: [15, 22, 16, 17, 18, 24, 27, 24],
      fill: false,
      borderColor: text_primary_500,
      tension: 0.1,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: text_primary_500
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
        },
        title: {
          display: true,
          text: 'August'
        }
      },
      y: {
        display: true,
        grid: {
          lineWidth : 0.5
        },
        position: 'right',
        title: {
          display: true,
          text: 'Task'
        }
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
  // text dropdown
  const text_dropdown = {one: "Last month", two: "This month"}

  // text user & perform
  const user = {name: "Ari Budin", task: 75 } // props.user
  const user_task = user.task + "%";
  const welcome = "Welcome";
  const perform = user.task > 80 ? "Very Good" : user.task > 60 ? "Good" : user.task > 40 ? "Standart" : user.task > 20 ? "Not Good" : "Bad";
  const perform_text = `Your already completed <span className="font-semibold text-indigo-600">${user_task}</span> task. Your perform is <span className="font-semibold text-indigo-600">${perform}</span>`;

  return (
    <Card className="h-full">
      <Row className="justify-between pb-2">
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
        <div className="flex flex-col mb-3">
          <h3 className="mb-1">{welcome}, <span className="font-bold text-gray-800 dark:text-gray-300">{user.name}</span></h3>
          <p className="text-base">{parse( perform_text )}</p>
        </div>
        <Line options={isOptions} data={isData} className="max-w-100" />
      </div>
    </Card>
  );
}