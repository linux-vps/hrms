import React from 'react';
import { Tab } from '@headlessui/react';
import { Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TrafficTabs(props) {
  // data tabs title
  const text_title = {one: "Traffic Channel", two:"Referral"}

  // Colors
  const text_primary_500   =   '#6366F1';

  // Convert HEX TO RGBA
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }
  // data chart
  const data1 = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Organic search',
      data: [70, 41, 35, 83, 73, 64, 75],
      backgroundColor: [
        text_primary_500,
      ]
    },
    {
      label: 'Direct',
      data: [27, 17, 15, 19, 12, 17, 11],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8)
      ]
    },
    {
      label: 'Refferal',
      data: [24, 21, 35, 34, 23, 24, 15],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.6)
      ]
    },
    {
      label: 'Social',
      data: [9, 7, 12, 14, 18, 8, 9],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ]
    },
    {
      label: 'Others',
      data: [30, 31, 35, 34, 33, 34, 35],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.2)
      ]
    }]
  }
  const data2 = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: 'Google.com',
      data: [70, 54, 65, 73, 63, 64, 75],
      backgroundColor: [
        text_primary_500,
      ]
    },
    {
      label: 'Youtube.com',
      data: [17, 17, 15, 19, 12, 17, 11],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8)
      ]
    },
    {
      label: 'Facebook.com',
      data: [24, 21, 35, 34, 23, 24, 15],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.6)
      ]
    },
    {
      label: 'Instagram.com',
      data: [9, 17, 12, 14, 18, 8, 9],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.4)
      ]
    },
    {
      label: 'Others',
      data: [10, 21, 15, 14, 23, 24, 15],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.2)
      ]
    }]
  }
  // options
  const options = {
    animation: {
      delay: 1000,
    },
    plugins: {
      legend: {
        display: false,
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
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
        stacked: true,
        grid: {
          display: false
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
                selected ? 'block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold -mb-px bg-white dark:bg-gray-800' : 'block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold'
              } >
                <h6 className="text-sm font-semibold nowrap block">{text_title.one}</h6>
              </button>
            )}
            </Tab>
            <Tab as="li" key='2' className="ltr:mr-1 rtl:ml-1">
            {({ selected }) => (
              <button className={
                selected ? 'block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold -mb-px bg-white dark:bg-gray-800' : 'block sm:inline-block py-4 px-2 md:px-6 lg:px-8 focus:outline-none focus:ring-0 font-semibold'
              } >
                <h6 className="text-sm font-semibold nowrap block">{text_title.two}</h6>
              </button>
            )}
            </Tab>
        </Tab.List>

        <Tab.Panels className="py-1.5 px-3">
          <Tab.Panel key='1' className="py-3">
            <Bar options={options} data={data1} className="max-w-100" />
          </Tab.Panel>
          <Tab.Panel key='2' className="py-3">
            <Bar options={options} data={data2} className="max-w-100" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Card>
    </>
  )
}