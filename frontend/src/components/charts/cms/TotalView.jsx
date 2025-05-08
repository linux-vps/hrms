import React from 'react';
import { Eye } from 'react-bootstrap-icons';
import { Column, Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import GetPercent from './GetPercent';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend );

export default function TotalView( props ) {
  // Chart color
  const text_primary_500  = '#6366F1';
  // Convert HEX TO RGBA color
  function hexToRGBA(hex, opacity) {
    if (hex != null) {
      return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
  }
  
  // Chart data (props.data)
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11'],
    datasets: [{
      fill: {
        target: 'origin'
      },
      borderColor: text_primary_500,
      backgroundColor: hexToRGBA( text_primary_500, 0.1),
      label: 'Page views',
      tension: 0.3,
      pointBackgroundColor: text_primary_500,
      pointBorderWidth: 0,
      pointHitRadius: 30,
      pointHoverBackgroundColor: text_primary_500,
      pointHoverRadius: 5,
      pointRadius: 0,
      data: [1170, 1321, 1835, 1834, 2183, 1504, 2175, 2521, 1835, 1834, 2183],
    }],
  };
  // Chart option (props.options)
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
    },
  };
  // Data percent (props.datapercent)
  const datapercent = {
    oldData: 1834,
    newData: 2183,
    iconPercent: <Eye />
  }

  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="text-gray-500 mb-1">{props.title}</h5>
          <GetPercent datapercent={datapercent}/>
        </Column>
        <Column className="w-1/2">
          <Line options={options} data={data} className="max-w-100" />
        </Column>
      </Row>
    </Card>
  );
}