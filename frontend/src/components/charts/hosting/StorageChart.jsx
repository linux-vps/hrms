import React from 'react';
import { Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StorangeChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_green_500 = '#22C55E';

  // Chart data  (props.data)
  const data = {
    labels: ['Used','Free'],
    datasets: [{
      label: 'Storage',
      data: [90000, 52000],
      backgroundColor: [
        text_primary_500,
        text_green_500
      ],
      hoverOffset: 4
    }]
  };
  // Chart option (props.options)
  const options = {
    animation: {
      delay: 1000
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };
  // data text
  const hosting_text = {used: "Used",free: "Free"}
  const hosting_space = {used: 90000,free: 52000}
  const percent = hosting_space.used / ( hosting_space.used + hosting_space.free ) * 100;

  return (
    <Card className="h-full">
      <Row className="justify-between pb-4">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </Row>

      <div className="relative mx-auto text-center w-2/3 sm:w-1/2 lg:w-full">
        <Doughnut options={options} data={data} className="max-w-100" />
        <p className="text-2xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{percent.toFixed(0)}%</p>
      </div>
      <div className="text-center text-sm font-semibold text-gray-500 mt-6">
        <p className="mb-2"><span className="inline-block w-4 h-4 bg-indigo-500 mr-2"></span>{hosting_text.used}: {hosting_space.used} <span className="ltr:ml-4 rtl:mr-4 inline-block w-4 h-4 bg-green-500 mr-2"></span>{hosting_text.free}: {hosting_space.free}</p>
      </div>
    </Card>
  );
}