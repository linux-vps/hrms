import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';

export default function ProjectTable(props) {
  const project_detail = {
    table_title: "Task Title",
    status: "Status",
    assigned: "Assigned to",
    time: "Time spend",
    action: "Action",
    task_table: [
      { title: "Create landing page design with Figma", status: "In progress", name: "Carlos Garcia", url: "/", time: "2D 11H 23min"},
      { title: "Create Gallery portfolio layout", status: "Complete", name: "Roman Davis", url: "/", time: "2D 11H 23min"},
      { title: "Slicing Figma Header design to HTML code", status: "Complete", name: "Daniel Esteban", url: "/", time: "2D 11H 23min"},
      { title: "Fix bugs on Comments form", status: "Complete", name: "Veronika Westley", url: "/", time: "2D 11H 23min"},
      { title: "Fix bugs on Login page form", status: "Complete", name: "John Doe", url: "/", time: "2D 11H 23min"},
      { title: "Convert Figma footer design to HTML file", status: "Complete", name: "Carlos Garcia", url: "/", time: "2D 11H 23min"}
    ]
  }
  const data_table = project_detail.task_table;

  return (
    <table className="table-bordered w-full ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead>
        <tr>
          <th>
            {project_detail.table_title}
          </th>
          <th>
            {project_detail.status}
          </th>
          <th className="hidden lg:table-cell">
            {project_detail.assigned}
          </th>
          <th className="hidden lg:table-cell">
            {project_detail.time}
          </th>
          <th>
            {project_detail.action}
          </th>
        </tr>
      </thead>

      <tbody>
        {data_table.map( (table, index) => {
        const status_color = table.status === "In progress" ? "text-yellow-700 bg-yellow-200" : table.status === "Complete" ? "text-green-700 bg-green-200" : "text-gray-700 bg-gray-100";
        return(
        <tr key={index}>
          <td>
            <div className="flex flex-wrap flex-row items-center">
              <div className="leading-5 font-semibold dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                {table.title}
              </div>
            </div>
          </td>
          <td>
            <div className={`text-sm text-center px-2 py-1 font-semibold leading-tight rounded-full ${status_color}`}>{table.status}</div>
          </td>
          <td className="hidden lg:table-cell">
            <div className="text-sm leading-5">{table.name}</div>
          </td>
          <td className="hidden lg:table-cell">
            <div className="text-sm leading-5 text-gray-600">{table.time}</div>
          </td>
          <td className="text-center text-sm leading-5 font-medium">
            <a href={table.url} className="text-sm">
              <PencilSquare className="inline w-4 h-4" />
            </a>
          </td>
        </tr>
        )})}
      </tbody>
    </table>
  );
}