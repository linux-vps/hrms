import React from 'react';
// components
import { Preloader, Row, Column, Alert, Card, Prism } from "@/components/reactdash-ui";

export default function AlertDocs() {
  // page title
  const page_title = "Alerts";

  // prism code
  const datacode1 = `
import React from 'react'
import { Alert } from "@/components/reactdash-ui";

export default function Alerts() {
    return (
      <>
      {/* colors */}
        <Alert color="primary">Primary alert</Alert>
        <Alert color="secondary">Secondary alert</Alert>
        <Alert color="success">Success alert</Alert>
        <Alert color="info">Info alert</Alert>
        <Alert color="warning">Warning alert</Alert>
        <Alert color="danger">Danger alert</Alert>
        <Alert color="light">Light alert</Alert>
        <Alert color="dark">Dark alert</Alert>
        
        {/* custom color */}
        <Alert className="!bg-blue-200 !text-blue-900">Custom color alert</Alert>

        {/* custom className */}
        <Alert color="primary" className="mt-12">Primary alert with margin top className</Alert>
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
            <p className="text-lg mb-6 font-light">Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">color</h2>
            <p className="mb-4 font-light">There are 8 choices of alert 'color' colors like primary, secondary, success, info, warning, danger, light and dark. The default alert color is primary.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Alert color="primary">Primary alert</Alert>
              <Alert color="secondary">Secondary alert</Alert>
              <Alert color="success">Success alert</Alert>
              <Alert color="info">Info alert</Alert>
              <Alert color="warning">Warning alert</Alert>
              <Alert color="danger">Danger alert</Alert>
              <Alert color="light">Light alert</Alert>
              <Alert color="dark">Dark alert</Alert>
              <Alert className="!bg-blue-200 !text-blue-900">Custom color alert</Alert>
              <Alert color="primary" className="mt-12">Primary alert with margin top className</Alert>
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
                  <td><b>color</b></td>
                  <td>Alert colors</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'light'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className for Alert</td>
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