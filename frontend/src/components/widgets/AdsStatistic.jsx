import React from 'react';
import { Card, Currency } from '@/components/reactdash-ui';

export default function AdsStatistic(props) {
  const statistics = [
    {title: "New MMR", count: 1302},
    {title: "MMR", count: 2325},
    {title: "Lost", count: 140},
    {title: "CAC", count: 78},
    {title: "ARPU", count: 24},
    {title: "CLTV", count: 178},
    {title: "ARR", count: 27900}
  ]
  return (
    <Card>
      <ul className="space-y-2 w-full">
        {statistics.map( (list, index) =>
        <li key={index} className="flex bg-gray-50 dark:bg-gray-700">
          <div className="inline-flex items-center w-full py-1 px-3 text-sm font-semibold rounded">
            <div className="ltr:pl-2 rtl:pr-2 pt-1 text-base ltr:text-left rtl:text-right">
              <div className="mb-1 text-gray-800 dark:text-gray-300">{list.title}</div>
            </div>
            <div className="ltr:ml-auto ltr:pl-2 rtl:mr-auto rtl:pr-2 pt-1 text-base ltr:text-right rtl:text-left">
              <div className="font-bold"><Currency data={list.count} /></div>
            </div>
          </div>
        </li>
        )}
      </ul>
    </Card>
  );
}