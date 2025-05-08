import React from 'react';
import { Row, Column, Card } from '@/components/reactdash-ui';
import ProgressUpDown from '@/components/reactdash-ui/ProgressUpDown';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

export default function ChurnRate(props) {
  // Chart color
  const text_secondary_500 = '#EC4899';

  // Chart data
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
    datasets: [{
      label: 'Customers',
      data: [38, 32, 27, 16, 26, 28, 13],
      backgroundColor: [
        text_secondary_500
      ],
      borderColor: [
        text_secondary_500
      ],
      borderWidth: 1
    }]
  }
  // Chart option
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
  // data churn
  const data_churn = { new: 235, old: 279 }

  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="mb-1 font-bold">{props.title}</h5>
          <h3 className="text-2xl font-bold mb-1">
            {data_churn.new}
          </h3>
          <ProgressUpDown data={data_churn} />
        </Column>
        <Column className="w-1/2">
          <Line options={options} data={data} className="max-w-100" />
        </Column>
      </Row>
    </Card>
  );
}