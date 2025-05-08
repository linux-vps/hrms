import React from 'react';
import { ChatDots } from 'react-bootstrap-icons';
import { Column, Row, Card } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GetPercent from './GetPercent';
ChartJS.register( CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TotalComment( props ) {
  // Chart Color
  const text_green_500  = '#22C55E';
  
  // Chart data (props.data)
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11'],
    datasets: [{
      label: 'Comments',
      data: [220, 362, 423, 584, 287, 162, 324, 429, 589, 659, 361],
      backgroundColor: [
        text_green_500
      ],
      borderColor: [
        text_green_500
      ],
      borderWidth: 1
    }]
  }
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
  }
  // Data percent (props.datapercent)
  const datapercent = {
    oldData: 659,
    newData: 761,
    iconPercent: <ChatDots />
  }

  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="text-gray-500 mb-1">{props.title}</h5>
          <GetPercent datapercent={datapercent}/>
        </Column>
        <Column className="w-1/2">
          <Bar options={options} data={data} className="max-w-100" id="LineAreaSm" />
        </Column>
      </Row>
    </Card>
  );
}