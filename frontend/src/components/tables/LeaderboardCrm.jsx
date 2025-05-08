import React from 'react';

export default function LeaderboardCrm(props) {
  // data table
  const table_title = {rank: "Rank", name: "Name", lead: "Lead", deal: "Deal", task: "Task"}
  const data_table = [
    {rank: 1, name: "John Thomas", job: "Senior Sales", lead:139, deal: 101, task: 156},
    {rank: 2, name: "Carlos Garcia", job: "Senior Sales", lead: 122, deal: 98, task:145 },
    {rank: 3, name: "Daniel Esteban", job: "Senior Sales", lead: 113, deal: 78, task:123 },
    {rank: 4, name: "Steven Rey", job: "Senior Sales", lead: 111, deal: 67, task:111 },
    {rank: 5, name: "Roman Davis", job: "Senior Sales", lead: 89, deal: 54, task:87 },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="table-bordered-bottom table-sm w-full ltr:text-left rtl:text-right text-sm">
            <thead>
              <tr>
                <th>{table_title.rank}</th>
                <th>{table_title.name}</th>
                <th>{table_title.lead}</th>
                <th>{table_title.deal}</th>
                <th>{table_title.task}</th>
              </tr>
            </thead>
            <tbody>
              {data_table.map( (list) =>
              <tr key={list.rank}>
                <td>
                  <div>#{list.rank}</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      {list.name}
                    </div>
                    <div className="italic text-gray-500 flex-shrink max-w-full w-full">
                      {list.job}
                    </div>
                  </div>
                </td>
                  <td>
                  <div>{list.lead}</div>
                </td>
                <td>
                  <div>{list.deal}</div>
                </td>
                <td>
                  <div>{list.task}</div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}