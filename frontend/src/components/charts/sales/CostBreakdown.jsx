import React from 'react';
import { Card, Currency } from '@/components/reactdash-ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CostBreakdown( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';
  const text_secondary_500 = '#EC4899';
  const text_green_500 = '#22C55E';
  const text_yellow_500    =   '#F59E0B';
  // Convert HEX TO RGBA
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data
  const data = {
    labels: ['Marketing', 'Sales', 'Maintenance', 'Others'],
    datasets: [{
      label: 'Costs',
      data: [3100, 2350, 1260, 980],
      backgroundColor: [
        hexToRGBA( text_primary_500, 0.8),
        hexToRGBA( text_secondary_500, 0.8),
        hexToRGBA( text_yellow_500, 0.8),
        hexToRGBA( text_green_500, 0.8),
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
        display: false,
      }
    }
  }
  // data text info [3100, 2350, 1260, 980],
  const text_info = [
    {title: "Marketing", count: 3100 },
    {title: "Sales", count: 2350, },
    {title: "Maintenance", count: 1260 },
    {title: "Others", count: 980 }
  ]

  return (
    <Card className="h-full">
      <div className="flex pb-6"><div className="flex flex-col"><h3 className="text-base font-bold">{props.title}</h3></div></div>
      <div className="flex flex-row">
        <div className="flex-shrink max-w-full w-1/2">
        <Pie options={options} data={data} className="max-w-100" />
        </div>
        <div className="flex-shrink max-w-full w-1/2">
          <div className="text-left ml-6">
            {text_info.map((list, index) =>
            <div key={index} className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-700 py-4">
              <h3 className="font-semibold text-sm">{list.title}</h3>
              <p className="font-semibold text-indigo-500"><Currency data={list.count} /></p>
            </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}