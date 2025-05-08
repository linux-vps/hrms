import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function VisitorsSignup( props ) {
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
    labels: [
      'Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7',
    ],
    datasets: [ 
    {
      type: 'bar',
      yAxisID: 'A',
      label: 'Visitor',
      data: [1080, 1100, 1055, 1380, 1598, 1680, 1798],
      fill: false,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      borderColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      borderWidth: 0,
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + ' Visitors'
        }
      }
    },
    {
      type: 'bar',
      yAxisID: 'A',
      label: 'Free trial',
      data: [86, 99, 74, 89, 174, 189, 194],
      fill: false,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8)
      ],
      borderColor: [
        hexToRGBA( text_primary_500, 0.8)
      ],
      borderWidth: 0,
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + ' Free Trial'
        }
      }
    },
    {
      type: 'line',
      yAxisID: 'B',
      label: 'Conversion rate',
      data: [8, 9, 7, 10, 11, 10, 12],
      backgroundColor: [
        text_secondary_500,
      ],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [1, 1],
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + '% Conversion'
        }
      }
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: [
      'Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7',
    ],
    datasets: [ 
    {
      type: 'bar',
      yAxisID: 'A',
      label: 'Visitor',
      data: [1780, 1700, 1855, 2380, 1898, 1880, 2798],
      fill: false,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      borderColor: [
        hexToRGBA( text_primary_500, 0.4)
      ],
      borderWidth: 0,
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + ' Visitors'
        }
      }
    },
    {
      type: 'bar',
      yAxisID: 'A',
      label: 'Free trial',
      data: [96, 89, 84, 79, 134, 139, 294],
      fill: false,
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8)
      ],
      borderColor: [
        hexToRGBA( text_primary_500, 0.8)
      ],
      borderWidth: 0,
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + ' Free Trial'
        }
      }
    },
    {
      type: 'line',
      yAxisID: 'B',
      label: 'Conversion rate',
      data: [12, 19, 17, 10, 21, 20, 14],
      backgroundColor: [
        text_secondary_500,
      ],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [1, 1],
      tooltip: {
        callbacks: {
          label: (Item) => (Item.formattedValue) + '% Conversion'
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
        grid: {
          lineWidth : 0.5
        },
        min: 0,
        max: 2500,
      },
      B: {
        position: 'right',
        grid: {
          display: false
        },
        min: 0,
        max: 35,
        ticks: {
          // Include % in the ticks
          callback: function(value, index, ticks) {
              return value + '%';
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
        <Scatter options={isOptions} data={isData} className="max-w-100" />
      </div>
    </Card>
  );
}