import React from 'react';
// components
import { Preloader, Row, Column, Breadcrumb, Card, Prism } from "@/components/reactdash-ui";

export default function BreadcrumbDocs() {
  // page title
  const page_title = "Breadcrumb";

  // data breadcrumb
  const breadcrumbLists = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Dashboard",
      url: "/dashboard"
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics"
    }
  ]

  // prism code
  const datacode1 = `
import React from 'react'
import { Breadcrumb } from "@/components/reactdash-ui";

export default function Breadcrumbs() {
    // data breadcrumb
    const breadcrumbLists = [
      {
        title: "Home",
        url: "/"
      },
      {
        title: "Dashboard",
        url: "/dashboard"
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics"
      }
    ]

    return (
      <>
        <Breadcrumb data={breadcrumbLists} />
        <Breadcrumb data={breadcrumbLists} color="light"/>

        {/* custom className */}
        <Breadcrumb data={breadcrumbLists} className="my-4"/>
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
            <p className="text-lg mb-6 font-light">Indicate the current pages location within a navigational hierarchy that automatically adds separators.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">color</h2>
            <p className="mb-4 font-light">There are 2 choices of breadrumb 'color' like light and dark. The default color is dark.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Breadcrumb data={breadcrumbLists} />
              <div className="bg-gray-500">
                <Breadcrumb data={breadcrumbLists} color="light" />
              </div>
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
                  <td><b>Color</b></td>
                  <td>Breadcrumb colors</td>
                  <td><code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'dark'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data breadcrumb</td>
                  <td>data ( <code>title</code> | <code>url</code> )</td>
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