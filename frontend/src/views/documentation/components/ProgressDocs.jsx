import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Progress, ProgressSmall } from "@/components/reactdash-ui";

export default function ProgressDocs() {
  // page title
  const page_title = "Progress";

  // prism code
  const datacode1 = `
import React from 'react'
import { Progress, ProgressSmall } from "@/components/reactdash-ui";

export default function Progresss() {
    return (
      <>
      {/* horizontal */}
      <Progress percent={95} model="horizontal" color="success" />

      {/* circle */}
      <Progress percent={65} model="circle" color="info" />

      {/* vertical */}
      <Progress percent={35} model="vertical" color="danger" />
      
      {/* progress small */}
      <ProgressSmall data={95} />
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
            <p className="text-lg mb-6 font-light">Documentation and examples for using custom progress bars featuring support for stacked bars and text labels.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Horizontal Progress</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Progress color="primary" model="horizontal" percent={95} />
              <Progress color="secondary" model="horizontal" percent={75} />
              <Progress color="success" model="horizontal" percent={65} />
              <Progress color="info" model="horizontal" percent={91} />
              <Progress color="warning" model="horizontal" percent={25} />
            </Card>
            <h2 className="text-lg mt-6 mb-2 font-semibold text-gray-800 dark:text-gray-300">Circle Progress</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none flex flex-col lg:flex-row">
              <Progress color="primary" model="circle" percent={95} className="mr-2" />
              <Progress color="secondary" model="circle" percent={75} className="mr-2" />
              <Progress color="success" model="circle" percent={65} className="mr-2" />
              <Progress color="info" model="circle" percent={91} className="mr-2" />
            </Card>
            <h2 className="text-lg mt-6 mb-2 font-semibold text-gray-800 dark:text-gray-300">Vertical Progress</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none flex">
              <Progress color="primary" model="vertical" percent={95} className="mr-4"/>
              <Progress color="secondary" model="vertical" percent={75} className="mr-4"/>
              <Progress color="success" model="vertical" percent={65} className="mr-4"/>
              <Progress color="info" model="vertical" percent={91} className="mr-4"/>
              <Progress color="warning" model="vertical" percent={25} className="mr-4"/>
              <Progress color="danger" model="vertical" percent={35} className="mr-4"/>
              <Progress color="light" model="vertical" percent={33} className="mr-4"/>
              <Progress color="dark" model="vertical" percent={56} className="mr-4"/>
            </Card>
            <h2 className="text-lg mt-6 mb-2 font-semibold text-gray-800 dark:text-gray-300">Small Progress</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none flex">
              <div className="flex flex-col w-full">
              <ProgressSmall data={95} className="mr-4"/>
              <ProgressSmall data={75} className="mr-4"/>
              <ProgressSmall data={65} className="mr-4"/>
              <ProgressSmall data={51} className="mr-4"/>
              <ProgressSmall data={45} className="mr-4"/>
              <ProgressSmall data={35} className="mr-4"/>
              <ProgressSmall data={23} className="mr-4"/>
              <ProgressSmall data={16} className="mr-4"/>
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
                  <td><b>percent</b></td>
                  <td>Custom percent</td>
                  <td><code>'1' to '100' without %</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>model</b></td>
                  <td>Custom progress</td>
                  <td><code>'horizontal' | 'vertical' | 'circle'</code></td>
                  <td><code>'horizontal'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Progress color</td>
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
                  <td><b>data</b></td>
                  <td>data small progress</td>
                  <td><code>number</code></td>
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