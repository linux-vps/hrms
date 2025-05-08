import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { Button, ProgressSmall } from "@/components/reactdash-ui";

export default function Leaderboard(props) {
  // data table
  const table_title = {rank: "Rank", name: "Users", progress:"Progress", task: "Task", action: "Action"}
  const data_table = [
    {rank: 1, name: "John Thomas", job: "UI/UX", task: 50, complete: 41, url: "/"},
    {rank: 2, name: "Carlos Garcia", job: "Front End", task: 50, complete: 32, url: "/"},
    {rank: 3, name: "Daniel Esteban", job: "Back End", task: 50, complete: 21, url: "/"},
    {rank: 4, name: "Steven Rey", job: "Developer", task: 50, complete: 14, url: "/"},
    {rank: 5, name: "Roman Davis", job: "UI/UX", task: 50, complete: 45, url: "/"}
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="table-bordered-bottom table-sm w-full text-sm ltr:text-left rtl:text-right">
            <thead>
              <tr>
                <th>{table_title.rank}</th>
                <th>{table_title.name}</th>
                <th>{table_title.progress}</th>
                <th>{table_title.task}</th>
                <th>{table_title.action}</th>
              </tr>
            </thead>
            <tbody>
              {data_table.map( (list,index) => {
              const progress_count = ( list.complete / list.task ) * 100;
              return(
              <tr key={index}>
                <td>
                  <div className="leading-5">#{list.rank}</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                     {list.name}
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      {list.job}
                    </div>
                  </div>
                </td>
                <td>
                  <ProgressSmall data={progress_count} />
                </td>
                <td>
                  <div className="leading-5">{list.complete}/{list.task}</div>
                </td>
                <td className="px-3 py-4 whitespace-no-wrap text-center leading-5 font-medium">
                  <a href={list.url}>
                    <Button >
                      <PencilSquare className="inline"/>
                    </Button>
                  </a>
                </td>
              </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}