import React from 'react';
import { Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SeoChart( props ) {
  // Chart colors
  const text_green_500     =   '#22C55E';
  const text_gray_500      =   '#84848f';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data (props.data)
  const data = {
    labels: ["Optimized", "Need optimized"],
    datasets: [{
        data: [85, 15],
        backgroundColor: [
          text_green_500,
          hexToRGBA(text_gray_500, 0.2)
        ],
        borderColor: [
          text_green_500,
          hexToRGBA(text_gray_500, 0.2)
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
    { type: 'Bad (0 - 60)', color: "bg-red-500" },
    { type: 'Medium (60+)', color: "bg-yellow-500" },
    { type: 'Good (80+)', color: "bg-green-500" },
    { type: 'Excelent (90+)', color: "bg-indigo-500" },
  ]
  const numbers = "86/100";

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div>
      <div className="relative my-min-18">
        {/* Charts */}
        <Doughnut options={options} data={data} className="max-w-100"/>
        <div className="absolute ltr:left-1/2 rtl:right-1/2 top-1/2 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 translate-y-full">{numbers}</div>
      </div>
      <div className="relative text-center">
        <div className="py-3">
          {datainfos.map( (datainfo, index) =>
          <div key={index} className="inline-block ltr:mr-2 rtl:ml-2">
            <span className={`inline-block w-3 h-3 ltr:mr-1 rtl:ml-1 rounded-full ${datainfo.color}`}></span> {datainfo.type}
          </div>
          )}
        </div>
      </div>
    </Card>
  );
}