import React from 'react';
import { Card } from '@/components/reactdash-ui';

export default function CmsStatistic( props ) {
  // Data statistic
  const datastatistics = [
    { type: 'Articles', count: 3121 },
    { type: 'Tags', count: 567 },
    { type: 'Categories', count: 143 },
    { type: 'Pages', count: 33 },
  ]

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div>
      <div className="relative text-sm">
        {datastatistics.map( (datastatistic , index) =>
        <div key={index} className="inline-flex flex-row items-center mb-3 ltr:mr-4 rtl:ml-4">
          <div className="self-center py-1 px-2 rounded-full bg-transparent sm:bg-indigo-100 text-indigo-500 dark:bg-gray-900 dark:bg-opacity-20 relative flex items-center justify-center">
            {datastatistic.count}
          </div>
          <div className="ltr:ml-2 rtl:mr-2">
            <h2 className="self-center">{datastatistic.type}</h2>
          </div>
        </div>
        )}
      </div>
    </Card>
  );
}