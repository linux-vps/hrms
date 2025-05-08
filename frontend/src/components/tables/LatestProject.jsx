import React from 'react';
import { ProgressSmall } from "@/components/reactdash-ui";

export default function LatestProject(props) {
 // data table
 const table_title = {name: "Project", progress:"Progress", status: "Status"}
 const data_table = [
   {name: "MyDomain5.com", category: "Web App", progress: 39, status: "in progress"},
   {name: "MyDomain4.com", category: "Web Design", progress: 70, status: "in progress"},
   {name: "MyDomain3.com", category: "UI UX", progress: 81, status: "in progress"},
   {name: "MyDomain2.com", category: "Web Design", progress: 100, status: "complete"},
   {name: "MyDomain1.com", category: "Web Design", progress: 100, status: "complete"}
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
                <th>{table_title.name}</th>
                <th>{table_title.progress}</th>
                <th>{table_title.status}</th>
              </tr>
            </thead>
            <tbody>
              {data_table.map((list, index) =>
              <tr key={index}>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      {list.name}
                    </div>
                    <div className="leading-5 text-gray-500 flex-shrink max-w-full w-full">
                      {list.category}
                    </div>
                  </div>
                </td>
                <td>
                  <ProgressSmall data={list.progress} />
                </td>
                <td>
                  <div className="leading-5">{list.status}</div>
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