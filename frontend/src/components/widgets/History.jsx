import React from 'react';
import { X, Globe2, HddStack  } from 'react-bootstrap-icons';
import parse from 'html-react-parser';

export default function History(props) {
  // data props
  const data_history = [
    {title: "Cancelled <b>USA Server B</b>", icon: <X />, date: "Aug 17, 2025 02.21 am"},
    {title: "Order domain <b>MyDomain.com</b>", icon: <Globe2 />, date: "Aug 18, 2025 02.21 am"},
    {title: "Order domain <b>BestDomain.com</b>", icon: <Globe2 />, date: "Aug 19, 2025 02.21 am"},
    {title: "Expired domain <b>YouDomain.net</b>", icon: <X />, date: "Aug 20, 2025 02.21 am"},
    {title: "Order Hosting <b>USA Server A</b>", icon: <HddStack />, date: "Aug 21, 2025 02.21 am"},
    {title: "Order Hosting <b>USA Server B</b>", icon: <HddStack />, date: "Aug 22, 2025 02.21 am"},
    {title: "Expired <b>USA Server C</b>", icon: <X />, date: "Aug 23, 2025 02.21 am"},
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div> 
      <div className="relative">
        <ul className="h-72 overflow-y-auto scrollbars show mb-6">
          {/* History */}
          {data_history.map((list, index) =>
          <li key={index} className="flex mb-2">
            <div className="relative flex-shrink-0 w-12 text-center">
              <span className="absolute ltr:left-1/2 ltr:-ml-1 rtl:right-1/2 rtl:-mr-1 top-10 -bottom-4 ltr:border-l-2 rtl:border-r-2 border-dashed border-gray-200 dark:border-gray-700"></span>
              <div className="ltr:mr-auto rtl:ml-auto">
                <div className="flex items-center justify-center text-indigo-500 h-10 w-10 rounded-full border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-40">
                  {list.icon}
                </div>
              </div>
            </div>

            <div className="ltr:ml-4 rtl:mr-4 mb-4">
              <div className="flex flex-row justify-between pb-2">
                <div className="text-xs text-gray-500 self-center mr-3">
                  {list.date}
                </div>
              </div>
              <p className="text-sm">{parse(list.title)}</p>
            </div>
          </li>
          )}
        </ul>
      </div>
    </div>
  );
}