import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Tooltip, Button } from "@/components/reactdash-ui";

export default function TooltipsDocs() {
  // page title
  const page_title = "Tooltips";

  // prism code
  const datacode1 = `
import React from 'react';
import { Tooltip, Button } from "@/components/reactdash-ui";

export default function Tooltipss() {
  return (
    <>
    {/* top tooltip  */}
    <Tooltip title="Welcome to top tooltip" className="mr-4">
      <Button>Launch top tooltip</Button>
    </Tooltip>
    
    {/* bottom tooltip  */}
    <Tooltip title="Welcome to bottom tooltip" placement="bottom">
      <Button>Launch bottom tooltip</Button>
    </Tooltip>
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
            <p className="text-lg mb-6 font-light">Documentation and examples for adding custom tooltips.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Tooltip</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Tooltip title="Welcome to top tooltip" className="mr-4">
                <Button>Launch top tooltip</Button>
              </Tooltip>
              <Tooltip title="Welcome to bottom tooltip" placement="bottom">
                <Button>Launch bottom tooltip</Button>
              </Tooltip>
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
                  <td><b>title</b></td>
                  <td>Tooltip title</td>
                  <td><code>'your custom title'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>placement</b></td>
                  <td>Tooltip title placement</td>
                  <td><code>'top' | 'bottom'</code></td>
                  <td><code>'top'</code></td>
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