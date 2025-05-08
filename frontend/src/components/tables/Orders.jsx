import React, { useState, useCallback } from "react";
import { PlusLg, PencilSquare } from 'react-bootstrap-icons';
import { Pagination, Button, Checkbox } from "@/components/reactdash-ui";

export default function Ecommerce_orders(props) {
  // data text
  const action_text = {
    add: "Add New",
    status: "Status",
    complete: "Complete",
    processing: "Processing",
    shipped: "Shipped",
    cancelled: "Cancelled",
    pending: "Pending",
    refund: "Refund",
    apply: "Apply"
  }
  // data table
  const table_title = {id: "Order ID", name: "Customers", date: "Order date", status: "Status", price: "Total", action: "Action" }
  const data_table = [
    {id: '25', code: 'inv21', name: "John doe", img: "/img/avatar/avatar8.png", url: "/", date: "27/05/2022", status: "Processing", price: 165, currency: "$"},	
    {id: '24', code: 'inv22', name: "John doe", img: "/img/avatar/avatar7.png", url: "/", date: "27/05/2022", status: "Processing", price: 165, currency: "$"},	 
    {id: '23', code: 'inv23', name: "John doe", img: "/img/avatar/avatar6.png", url: "/", date: "27/05/2022", status: "Complete", price: 165, currency: "$"},	 
    {id: '22', code: 'inv24', name: "John doe", img: "/img/avatar/avatar5.png", url: "/", date: "26/05/2022", status: "Complete", price: 165, currency: "$"},	 
    {id: '21', code: 'inv25', name: "John doe", img: "/img/avatar/avatar4.png", url: "/", date: "26/05/2022", status: "Shipped", price: 35, currency: "$"},	 
    {id: '20', code: 'inv26', name: "John doe", img: "/img/avatar/avatar3.png", url: "/", date: "25/05/2022", status: "Shipped", price: 35, currency: "$"},	 
    {id: '19', code: 'inv27', name: "John doe", img: "/img/avatar/avatar2.png", url: "/", date: "25/05/2022", status: "Canceled", price: 35, currency: "$"},	 
    {id: '18', code: 'inv28', name: "John doe", img: "/img/avatar/avatar2.png", url: "/", date: "24/05/2022", status: "Canceled", price: 35, currency: "$"},	 
    {id: '17', code: 'inv29', name: "John doe", img: "/img/avatar/avatar8.png", url: "/", date: "24/05/2022", status: "Pending", price: 35, currency: "$"},	 
    {id: '15', code: 'inv30', name: "John doe", img: "/img/avatar/avatar7.png", url: "/", date: "24/05/2022", status: "Complete", price: 35, currency: "$"},
    {id: '14', code: 'inv31', name: "John doe", img: "/img/avatar/avatar6.png", url: "/", date: "23/05/2022", status: "Complete", price: 35, currency: "$"},	 
    {id: '13', code: 'inv32', name: "John doe", img: "/img/avatar/avatar5.png", url: "/", date: "23/05/2022", status: "Complete", price: 35, currency: "$"},	 
    {id: '12', code: 'inv33', name: "John doe", img: "/img/avatar/avatar4.png", url: "/", date: "23/05/2022", status: "Complete", price: 35, currency: "$"},	 
    {id: '11', code: 'inv34', name: "John doe", img: "/img/avatar/avatar3.png", url: "/", date: "23/05/2022", status: "Complete", price: 165, currency: "$"},	 
    {id: '10', code: 'inv35', name: "John doe", img: "/img/avatar/avatar2.png", url: "/", date: "22/05/2022", status: "Complete", price: 165, currency: "$"}
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
              <option>{action_text.status}</option>
              <option value="complete">{action_text.complete}</option>
              <option value="processing">{action_text.processing}</option>
              <option value="shipped">{action_text.shipped}</option>
              <option value="cancelled">{action_text.cancelled}</option>
              <option value="pending">{action_text.pending}</option>
              <option value="refund">{action_text.refund}</option>
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
            {table_title.id}
            </th>
            <th>
            {table_title.name}
            </th>
            <th className="hidden lg:table-cell">
            {table_title.date}
            </th>
            <th>
            {table_title.status}
            </th>
            <th>
            {table_title.price}
            </th>
            <th>
            {table_title.action}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentData.map(( order, id ) => {
          const bg_color = order.status === "Complete" ? "text-green-700 bg-green-100" : order.status === "Processing" ? "text-yellow-700 bg-yellow-100" : order.status === "Cancelled" ? "text-red-700 bg-red-100" : order.status === "Shipped" ? "text-indigo-700 bg-indigo-100" : order.status === "Pending" ? "text-cyan-700 bg-cyan-100" : order.status === "Cancelled" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
          return(
          <tr key={id}>
            <td>
            <Checkbox
                name={order.code}
                id={order.id}
                onChange={handleClick}
                checked={isCheck.includes(order.id)}
              />
            </td>
            <td>
              <div className="leading-5">INV{order.id}</div>
            </td>
            <td>
              <a href={order.url}>
                <div className="flex flex-wrap flex-row items-center">
                  <div className="self-center">
                    <img className="h-8 w-8" src={order.img} alt={order.name} />
                  </div>
                  <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                    {order.name}
                  </div>
                </div>
              </a>
            </td>
            <td className="hidden lg:table-cell">
              <div className="leading-5">{order.date}</div>
            </td>
            <td>
              <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${bg_color}`}>{order.status}</div>
            </td>
            <td>
              <div className="leading-5">{order.price}{order.currency}</div>
            </td>
            <td className="text-center">
              <a href={order.url}>
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