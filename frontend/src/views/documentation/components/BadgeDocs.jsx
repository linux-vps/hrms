import React from 'react';
// components
import { Preloader, Row, Column, Badge, Card, Prism } from "@/components/reactdash-ui";

export default function BadgeDocs() {
  // page title
  const page_title = "Badge";

  // prism code
  const datacode1 = `
import React from 'react'
import { Badge } from "@/components/reactdash-ui";

export default function Badges() {
    return (
      <>
        {/* colors */}
        <Badge color="primary">Primary Badge</Badge>
        <Badge color="secondary">Secondary Badge</Badge>
        <Badge color="success">Success Badge</Badge>
        <Badge color="info">Info Badge</Badge>
        <Badge color="warning">Warning Badge</Badge>
        <Badge color="danger">Danger Badge</Badge>
        <Badge color="light">Light Badge</Badge>
        <Badge color="dark">Dark Badge</Badge>

        {/* custom color */}
        <Badge className="!bg-blue-500 !text-gray-100">Custom Color Badge</Badge>
        
        {/* shape */}
        <Badge color="primary" shape="pill">Pill Badge</Badge>
        <Badge color="primary" shape="rounded">Rounded Badge</Badge>
        <Badge color="primary" shape="square">Square Badge</Badge>

        {/* custom className */}
        <Badge color="primary" className="mt-12">Primary Badge with margin top className</Badge>
        
        {/* heading */}
        <h1 className="heading-1">Heading <Badge color="primary">New</Badge></h1>
        <h2 className="heading-2">Heading <Badge color="primary">New</Badge></h2>
        <h3 className="heading-3">Heading <Badge color="primary">New</Badge></h3>
        <h4 className="heading-4">Heading <Badge color="primary">New</Badge></h4>
        <h5 className="heading-5">Heading <Badge color="primary">New</Badge></h5>
        <h6 className="heading-6">Heading <Badge color="primary">New</Badge></h6>
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

			{/* content  */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Documentation and examples for badges, our small count and labeling component.</p>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Color</h2>
            <p className="mb-4 font-light">There are 8 choices of Badge 'color' colors like primary, secondary, success, info, warning, danger, light and dark. The default badge color is light.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Badge color="primary" className="mr-2">Primary Badge</Badge>
              <Badge color="secondary" className="mr-2">Secondary Badge</Badge>
              <Badge color="success" className="mr-2">Success Badge</Badge>
              <Badge color="info" className="mr-2">Info Badge</Badge>
              <Badge color="warning" className="mr-2">Warning Badge</Badge>
              <Badge color="danger" className="mr-2">Danger Badge</Badge>
              <Badge color="light" className="mr-2">Light Badge</Badge>
              <Badge color="dark" className="mr-2">Dark Badge</Badge>
              <Badge className="!bg-blue-500 !text-gray-100">Custom Color Badge</Badge>
            </Card>
            <h2 className="text-lg mt-6 font-semibold text-gray-800 dark:text-gray-300">Shape</h2>
            <p className="mb-4 font-light">There are 3 choices of 'shape' pill, rounded and square. The default shape is rounded.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Badge color="primary" shape="pill" className="mr-2">Pill Badge</Badge>
              <Badge color="primary" shape="rounded" className="mr-2">Rounded Badge</Badge>
              <Badge color="primary" shape="square" className="mr-2">Square Badge</Badge>
            </Card>
            <h2 className="text-lg mt-6 mb-3 font-semibold text-gray-800 dark:text-gray-300">Heading</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <h1 className="heading-1">Heading <Badge color="primary">New</Badge></h1>
              <h2 className="heading-2">Heading <Badge color="primary">New</Badge></h2>
              <h3 className="heading-3">Heading <Badge color="primary">New</Badge></h3>
              <h4 className="heading-4">Heading <Badge color="primary">New</Badge></h4>
              <h5 className="heading-5">Heading <Badge color="primary">New</Badge></h5>
              <h6 className="heading-6">Heading <Badge color="primary">New</Badge></h6>
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
                  <td>Badge color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'light'</code></td>
                </tr>
                <tr>
                  <td><b>shape</b></td>
                  <td>Border radius of the Badge</td>
                  <td><code>'pill'</code> | <code>'rounded'</code> | <code>'square'</code></td>
                  <td><code>'rounded'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className for Badge</td>
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