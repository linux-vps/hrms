import React from 'react';
import { StarFill, PencilSquare } from 'react-bootstrap-icons';
import parse from 'html-react-parser';

// components
import { Preloader, Row, Column, Card, Prism, Button, ProgressSmall, Tooltip } from "@/components/reactdash-ui";

export default function TablesDocs() {
  // page title
  const page_title = "Tables";
  // data table
  const table_title = { name: "Customers", email:"Email", date:"Date added",status: "Status", ip: "IP", action: "Actions" }
  const data_table = [
    {id: 1, name: "Ari Budin", img: "/img/avatar/avatar2.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Pending", ip: "43.252.106.9"},
    {id: 2, name: "Danilo", img: "/img/avatar/avatar3.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
    {id: 3, name: "Jesicca", img: "/img/avatar/avatar7.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Not active", ip: "43.252.106.9"},
    {id: 4, name: "Wodie", img: "/img/avatar/avatar.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Bloked", ip: "43.252.106.9"},
    {id: 5, name: "Renant", img: "/img/avatar/avatar4.png", url: "/", email: "example@gmail.com", date: "27/05/2022", status:"Active", ip: "43.252.106.9"},
  ]

  // prism code
  const datacode1 = `
import React from 'react';

export default function TableExp() {
    return (
      <>
      {/* table border bottom */}
      <table className="table-bordered-bottom">
        <thead>
          <tr>
            <th>title 1<th>
            <th>title 2<th>
            <th>title 3<th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>data A1<th>
            <th>data A2<th>
            <th>data A3<th>
          </tr>
          <tr>
            <th>data B1<th>
            <th>data B2<th>
            <th>data B3<th>
          </tr>
        </tbody>
      </table>

      {/* table bordered */}
      <table className="table-bordered">
        <thead>
          <tr>
            <th>title 1<th>
            <th>title 2<th>
            <th>title 3<th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>data A1<th>
            <th>data A2<th>
            <th>data A3<th>
          </tr>
          <tr>
            <th>data B1<th>
            <th>data B2<th>
            <th>data B3<th>
          </tr>
        </tbody>
      </table>
      </>
    )
}
  `;
  
  // data table 2
  const table_title2 = {
    name: "Products", category: "Category", price: "Pricing", rating: "Rating", stock: "Stock", qty: "Qty", action: "Action" 
  }
  const data_table2 = [
    {id: 1, name: "Nike Womens Free RN Flyknit 2018",
    img: "/img/products/product_1.jpg", url: "/", category: "Women Shoes",
    rating: 4.7,	price:87, currency: "$", qty: 568, stock: "In stock"},

    {id: 2, name: "Nike Women's Air Zoom Pegasus 36 Running Shoes",
    img: "/img/products/product_3.jpg", url: "/", category: "Women Shoes",
    rating: 4,	price:97, currency: "$", qty:12, stock: "Not active"}, 

    {id: 3, name: "Nike Women's Flex Trainer 9 Sneaker",
    img: "/img/products/product_5.jpg", url: "/", category: "Women Shoes",
    rating: 5,	price:97, currency: "$", qty:0, stock: "Out stock"}, 

    {id: 4, name: "Nike Women's Court Lite 2 Tennis Shoe",
    img: "/img/products/product_2.jpg", url: "/", category: "Women Shoes",
    rating: 5,	price:97, discount:79, currency: "$", qty:6, stock: "Low stock"}, 

    {id: 5, name: "Nike Women's Low-Top Basketball Shoe",
    img: "/img/products/product_4.jpg", url: "/", category: "Women Shoes",
    rating: 4.7,	price:87, currency: "$", qty:56, stock: "In stock"}
  ]
  
  // data table 3
  const data_title3 = {
    title: "Task Title",
    assigned: "Assigned",
    priority: "Priority",
    progress: "Progress",
    deadline: "Deadline"
  }
  const data_table3 = [
    { title: "Create landing page design with Figma", priority: "High", name: "Carlos Garcia", url: "/", done: 11, target: 20, deadline: "22/02/2023"},
    { title: "Create Gallery portfolio layout", priority: "Low", name: "Roman Davis", url: "/", done: 18, target: 20, deadline: "22/02/2023"},
    { title: "Slicing Figma Header design to HTML code", priority: "High", name: "Daniel Esteban", url: "/", done: 5, target: 20, deadline: "22/02/2023"},
    { title: "Fix bugs on Comments form", priority: "High", name: "Veronika Westley", url: "/", done: 18, target: 20, deadline: "22/02/2023"},
    { title: "Fix bugs on Login page form", priority: "Medium", name: "John Doe", url: "/", done: 19, target: 20, deadline: "22/02/2023"},
    { title: "Convert Figma footer design to HTML file", priority: "Low", name: "Carlos Garcia", url: "/", done: 20, target: 20, deadline: "22/02/2023"}
  ]
  
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">{page_title}</p>
        </Column>
      </Row>

      {/* content */}

      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Documentation and examples for opt-in styling of tables.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Customers Table</h2>
            <Card className="relative overflow-auto p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-12">
              <table className="table-bordered-bottom">
                <thead>
                  <tr>
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
                  {data_table.map(( customer, id ) => {
                  const bg_color = customer.status === "Active" ? "text-green-700 bg-green-100" : customer.status === "Pending" ? "text-yellow-700 bg-yellow-100" : customer.status === "Bloked" ? "text-red-700 bg-red-100" : customer.status === "Not active" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
                  return(
                  <tr key={id}>
                    <td>
                      <a href={customer.url}>
                        <div className="flex flex-wrap flex-row items-center">
                          <div className="self-center">
                            <img className="h-8 w-8 rounded-full" src={customer.img} alt={customer.name} />
                          </div>
                          <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                            <b>{customer.name}</b>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      {customer.email}
                    </td>
                    <td className="hidden lg:table-cell">
                      {customer.date}
                    </td>
                    <td>
                      <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${bg_color}`}>{customer.status}</div>
                    </td>
                    <td className="hidden lg:table-cell">
                      {customer.ip}
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
            </Card>
            
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Products Table</h2>
            <Card className="relative overflow-auto p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-12">
              <table className="table-bordered-bottom">
                <thead>
                  <tr>
                    <th>
                    {table_title2.name}
                    </th>
                    <th>
                    {table_title2.price}
                    </th>
                    <th className="hidden lg:table-cell">
                    {table_title2.rating}
                    </th>
                    <th>
                    {table_title2.qty}
                    </th>
                    <th>
                    {table_title2.stock}
                    </th>
                    <th>
                    {table_title2.action}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data_table2.map(( item, id ) => {
                  const bg_color = item.stock === "In stock" ? "text-green-700 bg-green-100" : item.stock === "Low stock" ? "text-yellow-700 bg-yellow-100" : item.stock === "Out stock" ? "text-red-700 bg-red-100" : item.stock === "Not active" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
                  return(
                  <tr key={id}>
                    <td>
                      <a href={item.url}>
                        <div className="flex flex-wrap flex-row items-center">
                          <div className="self-center">
                            <img className="h-8 w-8 rounded-full" src={item.img} alt={item.name} />
                          </div>
                          <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                            {item.name}
                            <div className="pt-1 text-sm italic text-gray-500 w-full">
                              {item.category}
                            </div>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      {item.discount ? parse(`<span className="line-through mr-2">${item.currency}${item.price}</span><span className="text-green-500">${item.currency}${item.discount}</span>`) : item.currency + item.price }
                    </td>
                    <td className="hidden lg:table-cell">
                      <StarFill className="inline text-yellow-400 mr-1" />{item.rating}
                    </td>
                    <td>
                      {item.qty}
                    </td>
                    <td>
                      <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${bg_color}`}>{item.stock}</div>
                    </td>
                    <td className="text-center">
                      <a href={item.url}>
                        <Button color="light" size="small">
                          <PencilSquare className="inline text-indigo-500" />
                        </Button>
                      </a>
                    </td>
                  </tr>
                  )})}
                </tbody>
              </table>
            </Card>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Project Table</h2>
            <Card className="relative overflow-auto p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-12">
              <table className="table-bordered-bottom">
                <thead>
                  <tr>
                    <th>
                      {data_title3.title}
                    </th>
                    <th>
                      {data_title3.priority}
                    </th>
                    <th className="hidden lg:table-cell">
                      {data_title3.assigned}
                    </th>
                    <th className="hidden lg:table-cell">
                      {data_title3.progress}
                    </th>
                    <th>
                      {data_title3.deadline}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data_table3.map( (project, index) => {
                  const priority_color = project.priority === "Medium" ? "text-yellow-700 bg-yellow-200" : project.priority === "Low" ? "text-green-700 bg-green-200" : project.priority === "High" ? "text-red-700 bg-red-200" : "text-gray-700 bg-gray-100";
                  const data_percent = ( project.done/ project.target ) * 100;
                  return(
                  <tr key={index}>
                    <td>
                      <div className="flex flex-wrap flex-row items-center">
                        <div className="leading-5 font-semibold dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                          {project.title}
                        </div>
                      </div>
                    </td>
                    <td>
                    <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${priority_color}`}>{project.priority}</div>
                    </td>
                    <td className="hidden lg:table-cell">
                      {project.name}
                    </td>
                    <td className="hidden lg:table-cell">
                      <Tooltip title={`${project.done}/${project.target}`} >
                        <div className="min-w-6"><ProgressSmall data={data_percent} /></div>
                      </Tooltip>
                    </td>
                    <td className="text-center text-sm leading-5 font-medium">
                      {project.deadline}
                    </td>
                  </tr>
                  )})}
                </tbody>
              </table>
            </Card>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Table Bordered</h2>
            <Card className="relative overflow-auto p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <table className="table-bordered">
                <thead>
                  <tr>
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
                  {data_table.map(( customer, id ) => {
                  const bg_color = customer.status === "Active" ? "text-green-700 bg-green-100" : customer.status === "Pending" ? "text-yellow-700 bg-yellow-100" : customer.status === "Bloked" ? "text-red-700 bg-red-100" : customer.status === "Not active" ? "text-gray-700 bg-gray-100" : "text-pink-700 bg-pink-100";
                  return(
                  <tr key={id}>
                    <td>
                      <a href={customer.url}>
                        <div className="flex flex-wrap flex-row items-center">
                          <div className="self-center">
                            <img className="h-8 w-8 rounded-full" src={customer.img} alt={customer.name} />
                          </div>
                          <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                            <b>{customer.name}</b>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>
                      {customer.email}
                    </td>
                    <td className="hidden lg:table-cell">
                      {customer.date}
                    </td>
                    <td>
                      <div className={`text-sm px-2 py-1 font-semibold leading-tight text-center rounded-full ${bg_color}`}>{customer.status}</div>
                    </td>
                    <td className="hidden lg:table-cell">
                      {customer.ip}
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
            </Card>

            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}