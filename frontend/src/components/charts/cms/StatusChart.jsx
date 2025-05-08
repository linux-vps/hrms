import React from 'react';
import { Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatusChart( props ) {
  // Chart colors
  const text_primary_500   =   '#6366F1';
  const text_secondary_500 =   '#EC4899';

  // Chart data (props.data)
  const data = {
    labels: ["Published", "Draft"],
    datasets: [{
        data: [320, 80],
        backgroundColor: [
          text_primary_500,
          text_secondary_500
        ],
        borderColor: [
          text_primary_500,
          text_secondary_500
        ],
        borderWidth: 1
    }]
  }
  // Chart option (props.options)
  const options = {
    circumference: 180,
    rotation: -90,
    cutout: 100,
    animation: {
      delay: 2000
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
  // Data info (props.info)
  const datainfos = [
    { type: 'Published', color: "bg-indigo-500" },
    { type: 'Draft', color: "bg-pink-500" },
  ]
  const numbers = "81%";

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg h-full shadow-lg p-6">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div>

      <div className="relative my-min-18">
        {/* Chart  */}
        <Doughnut options={options} data={data} className="max-w-100"/>
        <div className="absolute ltr:left-1/2 rtl:right-1/2 top-1/2 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 translate-y-full">{numbers}</div>
      </div>

      <div className="relative text-center">
        <div className="p-3">
          {datainfos.map((datainfo, index) =>
          <div key={index} className="inline-block ltr:mr-2 rtl:ml-2">
            <span className={`inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full ${datainfo.color}`}></span> {datainfo.type}
          </div>
          )}
        </div>
      </div>
    </Card>
  );
}