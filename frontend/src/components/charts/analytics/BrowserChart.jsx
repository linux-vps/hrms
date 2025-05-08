import React, { useState } from 'react';
import { ThreeDots, ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function BrowserChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500     = '#22C55E';
  const text_yellow_500    =   '#F59E0B';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Chrome', 'Mozilla', 'Safari', 'Others'],
    datasets: [{
      label: 'Session',
      data: [300, 150, 26, 18],
      backgroundColor: [
        text_primary_500,
        text_secondary_500,
        text_yellow_500,
        text_green_500
      ],
      hoverOffset: 4
    }]
  };
  // Chart data 2 (props.data2)
  const data2 = {
    labels: ['Chrome', 'Mozilla', 'Safari', 'Others'],
    datasets: [{
      label: 'Session',
      data: [430, 60, 36, 28],
      backgroundColor: [
        text_primary_500,
        text_secondary_500,
        text_yellow_500,
        text_green_500
      ],
      hoverOffset: 4
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      delay: 1000
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };
  // data by browser Chrome Mozilla Safari Others
  const data_Chrome = {new: 300, old: 430 }
  const data_Safari = {new: 26, old: 36 }
  const data_Mozilla = {new: 150, old: 60 }
  const data_Others = {new: 18, old: 28 }
  const total_new = data_Chrome.new + data_Safari.new + data_Mozilla.new + data_Others.new;
  const total_old = data_Chrome.old + data_Safari.old + data_Mozilla.old + data_Others.old;
  // Data Chrome
  const Chrome_percent = (data_Chrome.new / total_new ) * 100;
  const Chrome_percentOld = (data_Chrome.old / total_old ) * 100;
  const Chrome_progress = ( data_Chrome.new - data_Chrome.old ) / data_Chrome.new * 100;
  // data Safari
  const Safari_percent = (data_Safari.new / total_new ) * 100;
  const Safari_percentOld = (data_Safari.old / total_old ) * 100;
  const Safari_progress = ( data_Safari.new - data_Safari.old ) / data_Safari.new * 100;
  // data Mozilla
  const Mozilla_percent = (data_Mozilla.new / total_new ) * 100;
  const Mozilla_percentOld = (data_Mozilla.old / total_old ) * 100;
  const Mozilla_progress = ( data_Mozilla.new - data_Mozilla.old ) / data_Mozilla.new * 100;
  // data others browser
  const Others_percent = (data_Others.new / total_new ) * 100;
  const Others_percentOld = (data_Others.old / total_old ) * 100;
  const Others_progress = ( data_Others.new - data_Others.old ) / data_Others.new * 100;

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
        <Pie options={isOptions} data={isData} className="max-w-100" />
      </div>
      <table className="table-sm text-xs w-full ltr:text-left rtl:text-right mt-4">
        <tbody>
          <tr>
            <th>
              <img className="inline w-4 h4 ltr:mr-2 rtl:ml-2" src="/img/browser/chrome.png" />Chrome
            </th>
            <td>
              <span className="inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full bg-indigo-600"></span>{ isActive === 1 ? `${Chrome_percent.toFixed(0)}%` : `${Chrome_percentOld.toFixed(0)}%`}
            </td>
            <td>
              { Chrome_progress > 1 ? 
              <p className="flex items-center text-sm text-green-500">
              <ArrowUpShort className="inline-block w-4 h-4" /> {Chrome_progress.toFixed(0)}%
              </p>
              : 
              <p className="flex items-center text-sm text-pink-500">
                <ArrowDownShort className="inline-block w-4 h-4" /> {Chrome_progress.toFixed(0)}%
              </p>
              }
            </td>
          </tr>
          <tr>
            <th>
              <img className="inline w-4 h4 ltr:mr-2 rtl:ml-2" src="/img/browser/firefox.png" />Mozilla
            </th>
            <td>
              <span className="inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full bg-pink-500"></span>{ isActive === 1 ? `${Safari_percent.toFixed(0)}%` : `${Safari_percentOld.toFixed(0)}%`}
            </td>
            <td>
              { Safari_progress > 1 ? 
              <p className="flex items-center text-sm text-green-500">
              <ArrowUpShort className="inline-block w-4 h-4" /> {Safari_progress.toFixed(0)}%
              </p>
              : 
              <p className="flex items-center text-sm text-pink-500">
                <ArrowDownShort className="inline-block w-4 h-4" /> {Safari_progress.toFixed(0)}%
              </p>
              }
            </td>
          </tr>
          <tr>
            <th>
              <img className="inline w-4 h4 ltr:mr-2 rtl:ml-2" src="/img/browser/safari.png" />Safari
            </th>
            <td>
              <span className="inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full bg-yellow-400"></span>{ isActive === 1 ? `${Mozilla_percent.toFixed(0)}%` : `${Mozilla_percentOld.toFixed(0)}%`}
            </td>
            <td>
              { Mozilla_progress > 1 ? 
              <p className="flex items-center text-sm text-green-500">
              <ArrowUpShort className="inline-block w-4 h-4" /> {Mozilla_progress.toFixed(0)}%
              </p>
              : 
              <p className="flex items-center text-sm text-pink-500">
                <ArrowDownShort className="inline-block w-4 h-4" /> {Mozilla_progress.toFixed(0)}%
              </p>
              }
            </td>
          </tr>
          <tr>
            <th>
              <img className="inline w-4 h4 ltr:mr-2 rtl:ml-2" src="/img/browser/browser.png" />Others
            </th>
            <td>
              <span className="inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full bg-green-500"></span>{ isActive === 1 ? `${Others_percent.toFixed(0)}%` : `${Others_percentOld.toFixed(0)}%`}
            </td>
            <td>
              { Others_progress > 1 ? 
              <p className="flex items-center text-sm text-green-500">
              <ArrowUpShort className="inline-block w-4 h-4" /> {Others_progress.toFixed(0)}%
              </p>
              : 
              <p className="flex items-center text-sm text-pink-500">
                <ArrowDownShort className="inline-block w-4 h-4" /> {Others_progress.toFixed(0)}%
              </p>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}