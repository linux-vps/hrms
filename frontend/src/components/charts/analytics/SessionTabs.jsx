import React from 'react';
import { Tab } from '@headlessui/react';
import { Card } from '@/components/reactdash-ui';
import { ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function SessionTabs(props) {
  // data tabs title
  const data_title1 = {title: "Sessions", old: 180, new: 210 }
  const data_title2 = {title: "Sessions Duration", old: 120, new: 150 }
  const data_title3 = {title: "Bounce Rate", old: 78, new: 56 }

  // data percent
  const totalDecimal1 = ( data_title1.new - data_title1.old ) / data_title1.new * 100
  const totalPercent1 = totalDecimal1.toFixed(1);
  const totalDecimal2 = ( data_title2.new - data_title2.old ) / data_title2.new * 100
  const totalPercent2 = totalDecimal2.toFixed(1);
  const totalDecimal3 = ( data_title3.new - data_title3.old ) / data_title3.new * 100
  const totalPercent3 = totalDecimal3.toFixed(1);

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
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8'],
    datasets: [{
      label: 'Previous Week',
      data: [70, 121, 135, 234, 183, 104, 175, 13],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [5, 5],
      tension: 0.1,
      pointBackgroundColor: text_secondary_500
    },
    {
      label: 'Current Week',
      data: [13, 104, 175, 121, 231, 132, 283, 165],
      fill: false,
      borderColor: text_primary_500,
      tension: 0.1,
      pointBackgroundColor: text_primary_500
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8'],
    datasets: [{
      label: 'Previous Week',
      data: [6, 12, 8, 18, 11, 5, 16, 8],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [5, 5],
      tension: 0.1,
      pointBackgroundColor: text_secondary_500,
    },
    {
      label: 'Current Week',
      data: [8, 10, 15, 9, 14, 12, 18, 20],
      fill: false,
      borderColor: text_primary_500,
      tension: 0.1,
      pointBackgroundColor: text_primary_500
    }]
  };
  // Chart data 3 (props.data3)
  const data3 = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8'],
    datasets: [{
      label: 'Previous Week',
      data: [70, 21, 35, 34, 83, 14, 75, 13],
      fill: false,
      borderColor: text_secondary_500,
      borderDash: [5, 5],
      tension: 0.1,
      pointBackgroundColor: text_secondary_500
    },
    {
      label: 'Current Week',
      data: [13, 14, 75, 21, 31, 32, 83, 65],
      fill: false,
      borderColor: text_primary_500,
      tension: 0.1,
      pointBackgroundColor: text_primary_500
    }]
  }
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
        }
      },
      y: {
        display: true,
        grid: {
          lineWidth : 0.5,
        },
        position: 'right'
      }
    }
  };
  const options2 = {
    animation: {
      y: {
        duration: 4000,
        from: 500
      }
    },
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
          lineWidth : 0.5,
        },
        position: 'right',
        ticks: {
          min: 0,
          max: 60,
          stepSize: 5,
          callback: function (value) {
            return (value).toFixed(0) + 'm';
          },
        }
      }
    }
  }
  const options3 = {
    animation: {
      y: {
        duration: 2000,
        from: 500
      }
    },
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
          lineWidth : 0.5,
        },
        position: 'right',
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20,
          callback: function (value) {
            return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
          }
        }
      }
    }
  }

  return (
    <>
    <Card className="!p-0">
      <Tab.Group as="div" className="relative">
        <Tab.List as="ul" className="flex flex-col sm:flex-row text-center sm:text-left bg-gray-50 dark:bg-gray-900 dark:bg-opacity-20 rounded-t-lg overflow-hidden">
            <Tab as="li" key='1' className="ltr:mr-1 rtl:ml-1">
            {({ selected }) => (
              <button className={
                selected ? 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold -mb-px bg-white dark:bg-gray-800' : 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold'
              } >
                <h6 className="text-sm font-semibold nowrap block">{data_title1.title}</h6>
								<h5 className="text-xl xl:text-2xl font-bold block">{data_title1.new}</h5>
                {totalPercent1 > 1 ? 
                <p className="flex items-center justify-center text-sm text-green-500">
                  <ArrowUpShort className="w-4 h-4" /> {totalPercent1}%
                </p>
                : 
                <p className="flex items-center justify-center text-sm text-pink-500">
                  <ArrowDownShort className="w-4 h-4" /> {totalPercent1}%
                </p>
                }
              </button>
            )}
            </Tab>
            <Tab as="li" key='2' className="ltr:mr-1 rtl:ml-1">
            {({ selected }) => (
              <button className={
                selected ? 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold -mb-px bg-white dark:bg-gray-800' : 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold'
              } >
                <h6 className="text-sm font-semibold nowrap block">{data_title2.title}</h6>
								<h5 className="text-xl xl:text-2xl font-bold block">{data_title2.new}m</h5>
                {totalPercent2 > 1 ? 
                <p className="flex items-center justify-center text-sm text-green-500">
                  <ArrowUpShort className="w-4 h-4" /> {totalPercent2}%
                </p>
                : 
                <p className="flex items-center justify-center text-sm text-pink-500">
                  <ArrowDownShort className="w-4 h-4" /> {totalPercent2}%
                </p>
                }
              </button>
            )}
            </Tab>
            <Tab as="li" key='3' className="ltr:mr-1 rtl:ml-1">
            {({ selected }) => (
              <button className={
                selected ? 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold -mb-px bg-white dark:bg-gray-800' : 'w-full block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold'
              } >
                <h6 className="text-sm font-semibold nowrap block">{data_title3.title}</h6>
								<h5 className="text-xl xl:text-2xl font-bold block">{data_title3.new}%</h5>
                {totalPercent3 > 1 ? 
                <p className="flex items-center justify-center text-sm text-green-500">
                  <ArrowUpShort className="w-4 h-4" /> {totalPercent3}%
                </p>
                : 
                <p className="flex items-center justify-center text-sm text-pink-500">
                  <ArrowDownShort className="w-4 h-4" /> {totalPercent3}%
                </p>
                }
              </button>
            )}
            </Tab>
        </Tab.List>

        <Tab.Panels className="py-1.5 px-3">
          <Tab.Panel key='1' className="py-3">
            <Line options={options1} data={data1} className="max-w-100" />
          </Tab.Panel>
          <Tab.Panel key='2' className="py-3">
            <Line options={options2} data={data2} className="max-w-100" />
          </Tab.Panel>
          <Tab.Panel key='3' className="py-3">
            <Line options={options3} data={data3} className="max-w-100" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Card>
    </>
  )
}