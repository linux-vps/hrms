import React, { useState } from 'react';
import { Row, Card, Currency } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function RevenueChart( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_green_500     =   '#22C55E';

  // Chart data 1 (props.data1)
  const data1 = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Previous Week',
      data: [70, 121, 235, 334, 483, 304, 475],
      fill: false,
      borderColor: text_primary_500,
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    },
    {
      label: 'Current Week',
      data: [13, 204, 175, 421, 331, 532, 683],
      fill: false,
      borderColor: text_green_500,
      cubicInterpolationMode: 'monotone',
      tension: 0.1
    }]
  };
  // Chart option (props.options)
  const options1 = {
    animation: {
      y: {
        duration: 2000,
        from: 500
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        },
        grid: {
          display: false              }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Daily Sales'
        },
        grid: {
          lineWidth : 0.5
        },
        Min: -10,
        Max: 200
      }
    }
  }
  const earning = {text: "Today's Earning", count: 1570}

  return (
    <Card className="h-full">
      <Row className="w-full pb-6">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-base font-bold">{props.title}</h3>
          <span className="text-gray-500 font-semibold text-sm">{earning.text}: <span className="text-green-500"><Currency data={earning.count} /></span></span>
        </div>
      </Row>

      <div className="relative">
        <Line options={options1} data={data1} className="max-w-100" />
      </div>
    </Card>
  );
}