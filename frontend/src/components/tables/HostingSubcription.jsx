import React, { useState, useCallback } from "react";
import { PencilSquare } from 'react-bootstrap-icons';
import { Pagination, Button, Card, Currency } from "@/components/reactdash-ui";

export default function HostingSubcription(props) {
  // data table
  const table_title = { name: "Services", status: "Status", date: "Expired date", cost: "Yearly", action: "Action" }
  const data_table = [
    {id: 37 ,name: "USA Server A", description: "Hosting package", status: "Active", date: "May 09, 2025" ,cost: 179 , url: "/" },
    {id: 38 ,name: "UK Server B", description: "Hosting package", status: "Active", date: "May 10, 2025" ,cost: 179 , url: "/" },
    {id: 39 ,name: "MyDomain.com", description: "Domain name", status: "Active", date: "May 11, 2025" ,cost: 19 , url: "/" },
    {id: 40 ,name: "MyDomain.net", description: "Domain name", status: "Active", date: "May 12, 2025" ,cost: 16 , url: "/" },
    {id: 41 ,name: "MyDomain.com", description: "SSL", status: "Active", date: "May 12, 2025" ,cost: 55 , url: "/" },
    {id: 42 ,name: "MyDomain.net", description: "SSL", status: "Pending", date: "May 13, 2025" ,cost: 55 , url: "/" },
    {id: 43 ,name: "USA Server C", description: "Hosting package", status: "Canceled", date: "May 13, 2025" ,cost: 187 , url: "/" },
    {id: 44 ,name: "USA Server D", description: "Hosting package", status: "Expired", date: "May 14, 2025" ,cost: 179 , url: "/" },
    {id: 45 ,name: "MyDomains.com", description: "Domain name", status: "Expired", date: "May 15, 2025" ,cost: 16 , url: "/" },
    {id: 46 ,name: "MyDomains.net", description: "Domain name", status: "Expired", date: "May 16, 2025" ,cost: 19 , url: "/" },
    {id: 47 ,name: "MyDomains.org", description: "Domain name", status: "Pending", date: "May 17, 2025" ,cost: 29 , url: "/" },
    {id: 48 ,name: "USA Server E", description: "Hosting package", status: "Processing", date: "May 18, 2025" ,cost: 119 , url: "/" },
    {id: 49 ,name: "MyDomains.biz", description: "Domain name", status: "Active", date: "May 19, 2025" ,cost: 19 , url: "/" },
    {id: 50 ,name: "MyDomains.us", description: "Domain name", status: "Active", date: "May 20, 2025" ,cost: 22 , url: "/" },
  ]

  // total data & max item per page
  let total_data = data_table.length;
  let data_per_page = 8;
  const latestdata = [...data_table].sort((a, b) => b.id - a.id);

  // pagination
	const [currentPage, setCurrentPage] = useState(1);
  // page changed
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
	// slice data_table
  const currentData = latestdata.slice(
    (currentPage - 1) * data_per_page,
    (currentPage - 1) * data_per_page + data_per_page
  );
  
  return (
    <Card>
      <div className="flex flex-row justify-between pb-2">
        <div className="flex flex-col mb-3">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>

      <table className="table-sorter table-bordered-bottom w-full text-gray-500 dark:text-gray-400 dataTable-table">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-900 dark:bg-opacity-40">
            <th className="hidden lg:table-cell">
              {table_title.name}
            </th>
            <th>
              {table_title.date}
            </th>
            <th>
              {table_title.status}
            </th>
            <th>
              {table_title.cost}
            </th>
            <th>
              {table_title.action}
            </th>
          </tr>
        </thead>
        
        <tbody className="text-sm">
          {currentData.map(( item, index ) => {
          const bg_color = item.status === "Active" ? "text-green-700 bg-green-100" : item.status === "Processing" ? "text-indigo-700 bg-indigo-100" : item.status === "Pending" ? "text-yellow-700 bg-yellow-100" : item.status === "Expired" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
          return(
          <tr key={index}>
            <td className="hidden lg:table-cell">
              <div className="flex flex-wrap flex-row items-center">
                <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                  {item.name}
                </div>
                <div className="italic leading-5 text-gray-500 flex-shrink max-w-full w-full">
                  {item.description}
                </div>
              </div>
            </td>
            <td>
              <div className="leading-5">{item.date}</div>
            </td>
            <td>
              <div className={`inline-block leading-tight text-center font-semibold py-1 px-3 ${bg_color} dark:bg-opacity-80 rounded-full`}>{item.status}</div>
            </td>
            <td>
              <div className="leading-5 font-bold text-green-700"><Currency data={item.cost} /></div>
            </td>
            <td className="text-center">
              <a href={item.url}>
                <Button color="light">
                  <PencilSquare className="inline" />
                </Button>
              </a>
            </td>
          </tr>
          )})}
        </tbody>
      </table>
      <Pagination
          totalData={total_data}
          perPage={data_per_page}
          className="mt-8"
          onPageChanged={onPageChanged}
          currentPage={currentPage} />
    </Card>
  );
}