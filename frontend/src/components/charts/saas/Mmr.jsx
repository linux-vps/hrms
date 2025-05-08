import React from 'react';
import { Row, Card, Column, Currency, ProgressUpDown } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend );

export default function Mmr( props ) {
  // Chart color
  const text_green_500     =   '#22C55E';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }

  // Chart data
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
    datasets: [{
      fill: {
        target: 'origin'
      },
      borderColor: text_green_500,
      backgroundColor: hexToRGBA( text_green_500, 0.1),
      label: 'MMR',
      tension: 0.3,
      pointBackgroundColor: text_green_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_green_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      data: [1023, 1181, 1588, 1702, 1920, 2001, 2325],
      tooltip: {
        callbacks: {
          label: (Item) => '$' + (Item.formattedValue)
        }
      }
    }]
  };
  
  // Chart option 
  const options = {
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    animation: {
      y: {
        duration: 2000,
        from: 500
      }
    },
    plugins: {
      legend: {
        display: false
      },
    }
  }
  // data mmr
  const data_mmr = {new: 2325, old: 2019}


  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="mb-1 font-bold">{props.title}</h5>
          <h3 className="text-2xl font-bold mb-1">
            <Currency data={data_mmr.new} />
          </h3>
          <ProgressUpDown data={data_mmr} />
        </Column>
        <Column className="w-1/2">
          <Line options={options} data={data} className="max-w-100" />
        </Column>
      </Row>
    </Card>
  );
}