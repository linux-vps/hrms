import React, { useState, useCallback } from "react";
import { PencilSquare, PlusLg } from 'react-bootstrap-icons';
import { Pagination, Button, Checkbox } from "@/components/reactdash-ui";

export default function Ecommerce_customers(props) {
  // data text
  const action_text = {
    add: "Add New",
    action: "Actions",
    activate: "Activate",
    deactivate: "Deactivate",
    block: "Blocked",
    delete: "Delete",
    apply: "Apply"
  }
  // data tables
  const table_title = { name: "Customers", email:"Email", date:"Date added",status: "Status", ip: "IP", action: "Actions" }
  const data_table = [
    {id: '1', name: "AriBudin", img: "/img/avatar/avatar2.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Pending", ip: "43.252.106.9"},
    {id: '2', name: "Danilo", img: "/img/avatar/avatar3.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '3', name: "Ernanson", img: "/img/avatar/avatar4.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '4', name: "Jemines", img: "/img/avatar/avatar5.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '5', name: "Benardo", img: "/img/avatar/avatar6.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '6', name: "Leman", img: "/img/avatar/avatar7.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Not active", ip: "43.252.106.9"},
    {id: '7', name: "Brian", img: "/img/avatar/avatar8.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '8', name: "Wodie", img: "/img/avatar/avatar.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Bloked", ip: "43.252.106.9"},
    {id: '9', name: "Bonie", img: "/img/avatar/avatar2.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Pending", ip: "43.252.106.9"},
    {id: '10', name: "Renant", img: "/img/avatar/avatar3.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '11', name: "Gunie", img: "/img/avatar/avatar4.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: '12', name: "Zuri", img: "/img/avatar/avatar5.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"}
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
  )
  // Check all
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(currentData.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id ));
    }
  };
  // console.log(isCheckAll);
  // console.log(isCheck)
  
  return (
    <div>
      <div className="md:flex md:justify-between mb-3">
        <a href="#">
          <Button>
            {action_text.add}
            <PlusLg className="inline-block ltr:ml-1 rtl:mr-1 bi bi-plus-lg" />
          </Button>
        </a>
        <div>
          <label className="flex flex-wrap flex-row">
            <select id="bulk_actions" name="bulk_actions" className="inline-block leading-5 relative py-2 ltr:pl-3 ltr:pr-8 rtl:pr-3 rtl:pl-8 mb-3 rounded bg-gray-100 border border-gray-200 overflow-x-auto focus:outline-none focus:border-gray-300 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600 select-caret appearance-none">
              <option>{action_text.action}</option>
              <option value="activate">{action_text.activate}</option>
              <option value="deactivate">{action_text.deactivate}</option>
              <option value="block">{action_text.block}</option>
              <option value="delete">{action_text.delete}</option>
            </select>        
            <input type="submit" id="bulk_apply" className="ltr:ml-2 rtl:mr-2 py-2 px-4 inline-block text-center mb-3 rounded leading-5 border hover:bg-gray-300 dark:bg-gray-900 dark:bg-opacity-40 dark:border-gray-800 dark:hover:bg-gray-900 focus:outline-none focus:ring-0 cursor-pointer" value={action_text.apply} />
          </label>
        </div>
      </div>

      <table className="table-sorter table-bordered-bottom w-full text-gray-500 dark:text-gray-400 dataTable-table">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-900 dark:bg-opacity-40">
            <th>
            <Checkbox 
              name="selectAll"
              id="selectAll"
              onChange={handleSelectAll}
              checked={isCheckAll}
            />
            </th>
            <th>
            {table_title.name}
            </th>
            <th>
            {table_title.email}
            </th>
            <th className="hidden lg:table-cell">
            {table_title.date}
            </th>
            <th>
            {table_title.status}
            </th>
            <th className="hidden lg:table-cell">
            {table_title.ip}
            </th>
            <th>
            {table_title.action}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentData.map(( customer, id ) => {
          const bg_color = customer.status === "Active" ? "text-green-700 bg-green-100" : customer.status === "Pending" ? "text-yellow-700 bg-yellow-100" : customer.status === "Bloked" ? "text-red-700 bg-red-100" : customer.status === "Not active" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
          return(
          <tr key={id}>
            <td>
            <Checkbox
                name={customer.name}
                id={customer.id}
                onChange={handleClick}
                checked={isCheck.includes(customer.id)}
              />
            </td>
            <td>
              <a href={customer.url}>
                <div className="flex flex-wrap flex-row items-center">
                  <div className="self-center">
                    <img className="h-8 w-8" src={customer.img} alt={customer.name} />
                  </div>
                  <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                    {customer.name}
                  </div>
                </div>
              </a>
            </td>
            <td>
              <div className="leading-5">{customer.email}</div>
            </td>
            <td className="hidden lg:table-cell">
              <div className="leading-5">{customer.date}</div>
            </td>
            <td>
              <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${bg_color}`}>{customer.status}</div>
            </td>
            <td>
              <div className="leading-5">{customer.ip}</div>
            </td>
            <td className="text-center">
              <a href={customer.url}>
                <Button color="light" size="small">
                  <PencilSquare className="inline text-indigo-500" />
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
    </div>
  );
}