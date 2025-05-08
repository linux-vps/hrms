import React, { useState } from 'react';

export default function SalesFunnel(props) {
  // Open close box
  const [toggle, setToggle] = useState(true)
  // props
  const data = [
    {title: "Impression", value: 12457 },
    {title: "Clicks", value: 8760 },
    {title: "Engagement", value: 6567 },
    {title: "Leads", value: 5450 },
    {title: "Sales", value: 3578 },
    {title: "Customers", value:1460 }
  ]

  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${toggle === true ? 'h-full' : 'h-auto'}`}>
      <div className={`flex flex-row justify-between items-center ${toggle === true ? 'pb-6' : 'pb-0'}`}>
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>

        <button className="cursor-pointer" onClick={() => setToggle(!toggle)}>
          <div className={`px-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 block ${toggle === true ? 'text-yellow-600 hover:bg-yellow-200' : 'text-green-600 hover:bg-green-200'}`}>{toggle === true ? '-' : '+'}</div>
        </button>
      </div>
      <div className={`relative ${toggle === true ? 'block' : 'hidden'}`}>
        <div className="funnel-area w-full max-w-sm mx-auto flex flex-col">
          <ul>
            {data.map((item, index)=>
            <li key={index} title={`${item.title}`} className={`funnel-${index} float-left relative my-0.5 mx-0 text-center w-full`}>
              <span className="h-0 inline-block border-solid"><p className="text-white text-center">{item.value}</p></span>
            </li>
            )}
          </ul>
        </div>
        <div>
          <ul className="mt-12 w-full flex flex-row flex-wrap">
          {data.map((item, index)=>
            <li key={index} className="flex-shrink w-1/2 sm:w-1/3 pr-4 mb-3 rtl:ml-4">
              <p>{item.title}</p>
              <div className={`bg-funnel-${index} py-1 px-3 mr-1`}></div>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}