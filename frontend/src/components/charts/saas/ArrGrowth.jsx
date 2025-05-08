import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function ArrGrowth( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Sep','Oct','Nov','Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Total ARR',
      yAxisID: 'A',
      data: [1040, 1120, 1140, 1120, 1240, 4120, 5780, 6210, 7300, 9600, 12700, 27900],
      borderColor: text_primary_500,
      backgroundColor: [
        text_primary_500,
      ],
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    },
    {
      label: 'Maintenance',
      yAxisID: 'A',
      data: [15540, 14540, 15840, 15940, 15540, 11250, 10380, 9210, 9100, 8610, 8150, 6010],
      borderColor: text_secondary_500,
      backgroundColor: [
        text_secondary_500,
      ],
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Sep','Oct','Nov','Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
      label: 'Total ARR',
      yAxisID: 'A',
      data: [1140, 1320, 1340, 1520, 1540, 4220, 4780, 5210, 6300, 8600, 11700, 17900],
      borderColor: text_primary_500,
      backgroundColor: [
        text_primary_500,
      ],
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    },
    {
      label: 'Maintenance',
      yAxisID: 'A',
      data: [11540, 11540, 11840, 15940, 18540, 18250, 13380, 19210, 19100, 18610, 18150, 16010],
      borderColor: text_secondary_500,
      backgroundColor: [
        text_secondary_500,
      ],
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
      delay: 1000,
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
    },
    responsive: true
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