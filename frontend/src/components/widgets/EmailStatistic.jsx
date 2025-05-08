import React, { useState } from 'react';

export default function EmailStatistic(props) {
  // Open close box
  const [toggle, setToggle] = useState(true)
  // props
  const data_email = [
    {title: "Send", count: 11230 },
    {title: "Spam", count: 210 },
    {title: "Open", count: 5607},
    {title: "Click", count: 1130},
    {title: "Sales", count: 240},
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
        <div className="flex flex-wrap flex-row">
          {data_email.map((list, index) =>
          <div key={index} className="flex-shrink max-w-full px-0.5 w-full sm:w-1/2 lg:w-full mb-1">
            <div className="flex flex-row justify-between py-2 w-full border-b border-gray-100 dark:border-gray-600">
              <h4 className="text-sm font-bold mb-1">{list.title}</h4>
              <p className="text-xs">{list.count}</p>
            </div>
          </div>
          )}
        </div>
        <div className="absolute ltr:-right-8 rtl:-left-8 -bottom-8 text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="opacity-10 w-36 h-auto bi bi-envelope-open" viewBox="0 0 16 16">
            <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}