import React, { useState, useCallback } from "react";
import { PencilSquare } from 'react-bootstrap-icons';
import { Pagination, Button, Card } from "@/components/reactdash-ui";

export default function LatestOrders(props) {
  // data table
  const table_title = {id: "Invoice ID", customer: "Customer", status: "Status", date: "Order date", total: "Total", action: "Action" }
  const data_table = [
    {id: 37 ,name: "Carlo Andila", address: "California, USA", status: "Complete", date: "May 09, 2025" ,total: 79 , url: "/" },
    {id: 38 ,name: "Solier", address: "California, USA", status: "Complete", date: "May 10, 2025" ,total: 79 , url: "/" },
    {id: 39 ,name: "Bestella", address: "Nevada, USA", status: "Complete", date: "May 11, 2025" ,total: 67 , url: "/" },
    {id: 40 ,name: "Bastians", address: "California, USA", status: "Complete", date: "May 12, 2025" ,total: 36 , url: "/" },
    {id: 41 ,name: "Rebecca", address: "California, USA", status: "Complete", date: "May 12, 2025" ,total: 34 , url: "/" },
    {id: 42 ,name: "Jessica", address: "California, USA", status: "Return", date: "May 13, 2025" ,total: 55 , url: "/" },
    {id: 43 ,name: "David Arya", address: "Jakarta, Indonesia", status: "Complete", date: "May 13, 2025" ,total: 87 , url: "/" },
    {id: 44 ,name: "Virmano", address: "California, USA", status: "Shipped", date: "May 14, 2025" ,total: 79 , url: "/" },
    {id: 45 ,name: "Benjamin Odd", address: "California, USA", status: "Shipped", date: "May 15, 2025" ,total: 56 , url: "/" },
    {id: 46 ,name: "Ramon Key", address: "London, UK", status: "Shipped", date: "May 16, 2025" ,total: 129 , url: "/" },
    {id: 47 ,name: "Vinjay Khan", address: "New Delhi, India", status: "Packing", date: "May 17, 2025" ,total: 79 , url: "/" },
    {id: 48 ,name: "Carlos Vila", address: "California, USA", status: "Processing", date: "May 18, 2025" ,total: 119 , url: "/" },
    {id: 49 ,name: "Daniel", address: "San Francisco, USA", status: "Processing", date: "May 19, 2025" ,total: 179 , url: "/" },
    {id: 50 ,name: "John Thomas", address: "California, USA", status: "Paid", date: "May 20, 2025" ,total: 279 , url: "/" },
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
        <div className="flex flex-col mb-1">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>

      <table className="table-sorter table-bordered-bottom w-full text-gray-500 dark:text-gray-400 dataTable-table">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-900 dark:bg-opacity-40">
            <th>
            {table_title.id}
            </th>
            <th className="hidden lg:table-cell">
            {table_title.customer}
            </th>
            <th>
            {table_title.status}
            </th>
            <th className="hidden lg:table-cell">
            {table_title.date}
            </th>
            <th>
            {table_title.total}
            </th>
            <th>
            {table_title.action}
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentData.map(( item, index ) => {
          const bg_color = item.status === "Complete" ? "text-green-700 bg-green-100" : item.status === "Packing" ? "text-cyan-700 bg-cyan-100" : item.status === "Paid" ? "text-indigo-700 bg-indigo-100" : item.status === "Processing" ? "text-yellow-700 bg-yellow-100" :item.status === "Shipped" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
          return(
          <tr key={index}>
            <td>
              <div className="leading-5 uppercase">#inv{item.id}</div>
            </td>
            <td className="hidden lg:table-cell">
              <div className="flex flex-wrap flex-row items-center">
                <div className="leading-5 font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                  {item.name}
                </div>
                <div className="italic leading-5 text-gray-500 flex-shrink max-w-full w-full">
                  {item.address}
                </div>
              </div>
            </td>
            <td>
              <div className={`inline-block leading-tight text-center font-semibold py-1 px-3 ${bg_color} dark:bg-opacity-80 rounded-full`}>{item.status}</div>
            </td>
            <td className="hidden lg:table-cell">
              <div className="leading-5">{item.date}</div>
            </td>
            <td>
              <div className="leading-5 font-bold text-green-700">${item.total}</div>
            </td>
            <td className="text-center">
              <a href={item.url}>
                <Button size="small">
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