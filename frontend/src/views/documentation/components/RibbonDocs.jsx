import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Ribbon } from "@/components/reactdash-ui";

export default function RibbonDocs() {
  // page title
  const page_title = "Ribbon";

  // prism code
  const datacode1 = `
import React from 'react'
import { Ribbon, Card } from "@/components/reactdash-ui";

export default function Ribbons() {
    return (
      <>
      <Card className="relative">
        <Ribbon placement="left" color="warning">
          <p>Left Ribbon</p>
        </Ribbon>
      </Card>

      <Card className="relative">
        <Ribbon placement="right" color="success">
          <p>Right Ribbon</p>
        </Ribbon>
      </Card>
    </Column>

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
            <p className="text-lg mb-6 font-light">Add ribbon in left or right any element.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Ribbon</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Row>
                <Column className="w-full md:w-1/2 px-6">
                  <Card className="w-full h-32 relative mb-6">
                    <Ribbon placement="left" color="warning">
                      <p>Left Ribbon</p>
                    </Ribbon>
                  </Card>
                </Column>
                <Column className="w-full md:w-1/2 px-6">
                  <Card className="w-full h-32 relative mb-6">
                    <Ribbon placement="right" color="success">
                      <p>Right Ribbon</p>
                    </Ribbon>
                  </Card>
                </Column>
              </Row>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <p className="mb-8"><b>NOTE:</b> Parent ribbon component must have <b>relative</b> classes.</p>

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
                  <td><b>placement</b></td>
                  <td>ribbon placement</td>
                  <td><code>'left'</code> | <code>'right'</code></td>
                  <td><code>'right'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>ribbon color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
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