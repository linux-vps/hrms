import React from 'react';
import { Row, Column, Card, ProgressUpDown } from '@/components/reactdash-ui';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function PaidCustomers( props ) {
  // Chart color
  const text_primary_500   = '#6366F1';

  // Chart data 
  const data = {
    labels: ['Aug 1', 'Aug 2', 'Aug 3', 'Aug 4', 'Aug 5', 'Aug 6', 'Aug 7'],
    datasets: [{
      label: 'Customers',
      data: [14, 15, 13, 16, 26, 39, 43],
      backgroundColor: [
        text_primary_500
      ],
      borderColor: [
        text_primary_500
      ],
      borderWidth: 1
    }]
  };
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
  };
  // data paid
  const data_paid = {new: 743, old: 639}

  return (
    <Card className="h-full">
      <Row className="items-center">
        <Column className="w-1/2">
          <h5 className="mb-1 font-bold">{props.title}</h5>
          <h3 className="text-2xl font-bold mb-1">
            {data_paid.new}
          </h3>
          <ProgressUpDown data={data_paid} />
        </Column>
        <Column className="w-1/2">
          <Bar options={options} data={data} className="max-w-100" />
        </Column>
      </Row>
    </Card>
  );
}