import React from 'react';
import { Column, Row, Card } from '@/components/reactdash-ui';
import { HandThumbsUp } from 'react-bootstrap-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GetPercent from './GetPercent';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TotalLike( props ) {
  // Chart color
  const text_primary_500 = '#6366F1';

  // Chart data (props.data)
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11'],
    datasets: [{
      label: 'Likes',
      data: [120, 462, 323, 184, 187, 362, 289, 559, 461, 394, 541],
      backgroundColor: [
        text_primary_500
      ],
      borderColor: [
        text_primary_500
      ],
      borderWidth: 1
    }]
  };
  // Chart option (props.options)
  const options = {
    animation: {
      y: {
        duration: 2000,
        from: 500
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  // Data percent (props.datapercent)
  const datapercent = {
    oldData: 394,
    newData: 541,
    iconPercent: <HandThumbsUp />
  }

  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="text-gray-500 mb-1">{props.title}</h5>
          <GetPercent datapercent={datapercent}/>
        </Column>
        <Column className="w-1/2">
          <Bar options={options} data={data} className="max-w-100" />
        </Column>
      </Row>
    </Card>
  );
}