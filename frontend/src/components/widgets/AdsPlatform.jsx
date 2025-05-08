import React from 'react';
import { Currency } from '@/components/reactdash-ui';

export default function AdsPlatform(props) {
  // props data
  const data_ads = [ 
    { title: "Impressions", value: 11230, type: 'number' }, 
    { title: "CTR", value: 12.5, type: 'percent' },
    { title: "Click", value: 1430, type: 'number' },
    { title: "CPC", value: 2.4, type: 'currency' },
    { title: "Conv Rate", value: 5.6, type: 'percent' },
    { title: "Conv Cost", value: 17.67, type: 'currency' },
    { title: "Spend", value: 2450, type: 'currency' },
    { title: "Conversions", value: 140, type: 'number' } 
  ]

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
      <div className="flex flex-row justify-between items-center pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.icon}{props.title}</h3>
        </div>
        
        <button className="cursor-pointer">
          <div title="Show" className="px-2 rounded-full border border-gray-200 dark:border-gray-800 text-green-600 bg-gray-50 dark:bg-gray-900 hover:bg-green-200 hidden">+</div>
        </button>
      </div>

      <div className="relative">
        <div className="flex flex-wrap flex-row">
          { data_ads.map((item, index) => 
          <div key={index} className="flex-shrink max-w-full px-0.5 w-1/2 sm:w-1/3 xl:w-1/4 mb-1">
            <div className="p-2 w-full bg-gray-50 dark:bg-gray-900">
              <h4 className="text-sm font-bold mb-1">
                {item.type === 'currency' ? <Currency data={item.value} /> : item.type === 'percent' ? item.value + '%' : item.value }
              </h4>
              <p className="text-xs">{item.title}</p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}