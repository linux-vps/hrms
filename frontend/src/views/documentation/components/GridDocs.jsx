import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function GridDocs() {
  // page title
  const page_title = "Grid";

  // prism code
  const datacode1 = `
import React from 'react'
import { Row, Column } from "@/components/reactdash-ui";

export default function Grids() {
    return (
      <>
      <Row className="mb-6">
        <Column className="w-full md:w-1/2 lg:w-1/3">
          content in here
        </Column>
        <Column className="w-full md:w-1/2 lg:w-1/3">
          content in here
        </Column>
        <Column className="w-full md:w-1/2 lg:w-1/3">
          content in here
        </Column>
      </Row>

      <Row>
        <Column className="w-full md:w-1/2 lg:w-1/4">
          content in here
        </Column>
        <Column className="w-full md:w-1/2 lg:w-1/4">
          content in here
        </Column>
        <Column className="w-full md:w-1/2 lg:w-1/4">
          content in here
        </Column>
        <Column className="w-full md:w-1/2 lg:w-1/4">
          content in here
        </Column>
      </Row>

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
            <p className="text-lg mb-6 font-light">Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Responsive Grid</h2>
            <Row className="mb-6">
              <Column className="w-full md:w-1/2 lg:w-1/3">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
              <Column className="w-full md:w-1/2 lg:w-1/3">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
              <Column className="w-full md:w-1/2 lg:w-1/3">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
            </Row>
            <Row>
              <Column className="w-full md:w-1/2 lg:w-1/4">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
              <Column className="w-full md:w-1/2 lg:w-1/4">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
              <Column className="w-full md:w-1/2 lg:w-1/4">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
              <Column className="w-full md:w-1/2 lg:w-1/4">
                <div className="w-full h-20 border border-gray-300 dark:border-gray-600 flex items-center justify-center">Content</div>
              </Column>
            </Row>
            
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
            <p className="mb-12 font-light">Change column responsive 'width' with tailwind css ex: 'w-full, w-1/2, w-1/3, w-1/4, w-1/5, w-1/6'.</p>

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
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>children</b></td>
                  <td>Custom content children</td>
                  <td><code>text, html, img, icon and etc</code></td>
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