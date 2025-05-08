import React, { useState, useCallback } from "react";
// components
import { Preloader, Row, Column, Card, Prism, Pagination,  } from "@/components/reactdash-ui";

export default function PaginationDocs() {
  // page title
  const page_title = "Pagination";
  const data = [
		{id: 1, name: "Thomas 1", phone: "01"},
		{id: 2, name: "Thomas 2", phone: "02"},
		{id: 3, name: "Thomas 3", phone: "03"},
		{id: 4, name: "Thomas 4", phone: "04"},
		{id: 5, name: "Thomas 5", phone: "05"},
		{id: 6, name: "Thomas 6", phone: "06"},
		{id: 7, name: "Thomas 7", phone: "07"},
		{id: 8, name: "Thomas 8", phone: "08"},
		{id: 9, name: "Thomas 9", phone: "09"},
		{id: 10, name: "Thomas 10", phone: "10"},
		{id: 11, name: "Thomas 11", phone: "11"},
	]
	// total data & max item per page
  let total_data = data.length;
  let data_per_page = 5;

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
	// slice data
  const currentData = data.slice(
    (currentPage - 1) * data_per_page,
    (currentPage - 1) * data_per_page + data_per_page
  );

  // prism code
  const datacode1 = `
import React, { useState, useCallback } from "react";
import { Pagination } from "@/components/reactdash-ui";

export default function Paginations() {
  const data = [
		{id: 1, name: "Thomas 1", phone: "01"},
		{id: 2, name: "Thomas 2", phone: "02"},
		{id: 3, name: "Thomas 3", phone: "03"},
		{id: 4, name: "Thomas 4", phone: "04"},
		{id: 5, name: "Thomas 5", phone: "05"},
		{id: 6, name: "Thomas 6", phone: "06"},
		{id: 7, name: "Thomas 7", phone: "07"},
		{id: 8, name: "Thomas 8", phone: "08"},
		{id: 9, name: "Thomas 9", phone: "09"},
		{id: 10, name: "Thomas 10", phone: "10"},
		{id: 11, name: "Thomas 11", phone: "11"},
	]
	// total data & max item per page
  let total_data = data.length;
  let data_per_page = 5;

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
	// slice data
  const currentData = data.slice(
    (currentPage - 1) * data_per_page,
    (currentPage - 1) * data_per_page + data_per_page
  );

  return (
    <>
    <table className="table-default">
      <thead>
        <tr>
          <th>ID</th><th>NAME</th><th>PHONE</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map(item => {
          return (
            <tr key={item.id}> 
              <td>{item.id}</td> 
              <td>{item.name}</td> 
              <td>{item.phone}</td> 
            </tr>
          );
        })}
      </tbody>
    </table>

    <Pagination
      totalData={total_data}
      perPage={data_per_page}
      className="mt-8"
      onPageChanged={onPageChanged}
      currentPage={currentPage} />
    </>
  )
}
  `;

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
            <p className="text-lg mb-6 font-light">Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Pagination</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
            <table className="table-default">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              totalData={total_data}
              perPage={data_per_page}
              className="mt-8"
              onPageChanged={onPageChanged}
              currentPage={currentPage} />

            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>totalData</b></td>
                  <td>total all table data</td>
                  <td><code>all table data ex '12'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>perPage</b></td>
                  <td>total data per page</td>
                  <td><code>show data per page ex '5'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onPageChanged</b></td>
                  <td>function on page changed</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>currentPage</b></td>
                  <td>active page</td>
                  <td><code>active current page</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>placement</b></td>
                  <td>Pagination placement</td>
                  <td><code>'left' | 'center' | 'right'</code></td>
                  <td><code>'center'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}