import React from 'react';
import { Card, Currency, ProgressUpDown } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CrossSell( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  // Convert HEX TO RGBA
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data
  const data = {
    labels: ['Up Sell','Cross Sell'],
    datasets: [{
      label: 'Revenue',
      data: [6300, 3400],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_secondary_500, 0.8),
      ],
      hoverOffset: 4,
      tooltip: {
        callbacks: {
          label: (Item) => (Item.label) +': ' + '$' + (Item.formattedValue)
        }
      }
    }]
  }
  // Chart option
  const options = {
    animation: {
      delay: 2000
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
  // data text info
  const text_info = [
    {title: "Up sell", count: 6300 , old: 5600},
    {title: "Cross sell", count: 3400, old: 4400 }
  ]

  return (
    <Card className="h-full">
      <div className="flex pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-shrink max-w-full w-1/2">
          <Doughnut options={options} data={data} className="max-w-100" />
        </div>
        <div className="flex-shrink max-w-full w-1/2">
          <div className="text-left ml-6">
            {text_info.map((list, index) => {
            const percent = {new:list.count, old:list.old }

            return(
            <div key={index} className="flex flex-row items-center justify-between mb-3">
              <div className="relative">
                <h3 className="semibold text-sm">{list.title}</h3>
                <p className="text-2xl font-bold text-indigo-500 mb-1"><Currency data={list.count} /></p>
              </div>
              <ProgressUpDown data={percent} />
            </div>
            )}
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}