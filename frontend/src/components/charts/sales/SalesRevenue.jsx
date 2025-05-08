import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function SalesRevenue( props ) {
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'New customers',
      data: [7890, 9700, 9410, 9970, 10990, 10980, 11090, 12500],
      fill: {
        target: 'origin'
      },
      borderColor: text_primary_500,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      tension: 0.3,
      pointBackgroundColor: text_primary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_primary_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' New customers'
        }
      }
    },
    {
      label: 'Up/Cross Selling',
      data: [430, 631, 535, 634, 733, 834, 735, 980],
      fill: {
        target: 'origin'
      },
      borderColor: [
        hexToRGBA( text_secondary_500, 0.5)
      ],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      tension: 0.3,
      pointBackgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' Up/Cross Selling'
        }
      }
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'New customers',
      data: [6890, 6700, 7410, 7970, 8990, 10980, 8090, 9500],
      fill: {
        target: 'origin'
      },
      borderColor: text_primary_500,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      tension: 0.3,
      pointBackgroundColor: text_primary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_primary_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' New customers'
        }
      }
    },
    {
      label: 'Up/Cross Selling',
      data: [330, 431, 435, 334, 433, 334, 535, 580],
      fill: {
        target: 'origin'
      },
      borderColor: [
        hexToRGBA( text_secondary_500, 0.5)
      ],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      tension: 0.3,
      pointBackgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: [
        hexToRGBA( text_primary_500, 0.1)
      ],
      pointHoverRadius: 5,
      pointRadius: 0,
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue) + ' Up/Cross Selling'
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
      x: {
        stacked: true,
        display: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        grid: {
          lineWidth : 0.5
        },
        min: 0,
        max: 16000,
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
        display: true,
        position: "bottom"
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
  const text_dropdown = {one: "Last year", two: "This year"}

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