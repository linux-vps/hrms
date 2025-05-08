import React from 'react';
import { Card, ProgressSmall } from '@/components/reactdash-ui';

export default function LaunchDate(props) {
  // example data
  const title = "Default title";
  // const date = "12/12/2023";
  const data = {
    count: 0,
    text: "Total point"
  }
  // data table
  const table_title = {division: "Division", progress: "Progress"}
  const data_table = [
    {division: "UI/UX", progress: 78},
    {division: "Front End", progress: 81},
    {division: "Back End", progress: 19},
    {division: "Development", progress: 41}
  ]
  const data_img = "/img/ilustration/working.png";
  // date
  const dayleft_text = "days left";
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // start date
  const date1 = new Date(`${month}/${day}/${year}`);
  // end date
  const date2 = new Date(`${props.date}`);// props.date 
  const date_deadline = props.date;
  // day left
  const time_left = date2.getTime() - date1.getTime();
  const day_left = time_left / (1000 * 3600 * 24);

  return (
    <Card>
      <div className="flex flex-col text-center mb-6">
        <h3>{props.title}</h3>
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-2">{day_left} {dayleft_text}</h4>
        <img className="mx-auto max-w-full w-48 h-auto mb-2" src={data_img} />
        <p className="text-sm text-gray-500">Deadline: {date_deadline}</p>
      </div>

      <table className="table-sm text-xs w-full ltr:text-left rtl:text-right mt-4">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th>
              {table_title.division}
            </th>
            <th>
              {table_title.progress}
            </th>
          </tr>
        </thead>
        <tbody>
          {data_table.map((item, index) =>
          <tr key={index}>
            <td>{item.division}</td>
            <td>
              <ProgressSmall data={item.progress} />
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}