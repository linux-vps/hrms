import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Popover } from "@/components/reactdash-ui";

export default function PopoversDocs() {
  // page title
  const page_title = "Popovers";

  // prism code
  const datacode1 = `
import React from 'react'
import { Popover } from "@/components/reactdash-ui";

export default function Popoverss() {
    return (
      <>
      <Popover 
        btn_text="Top Popover" btn_color="warning" className="mr-2"
        title="Title Popover" description="Hello popover content in here" />

      <Popover 
        btn_text="Bottom Popover" placement="bottom"
        description="Hello popover content in here" />
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
            <p className="text-lg mb-6 font-light">Documentation and examples for adding custom Popovers.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Popovers</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Popover btn_text="Top Popover" btn_color="warning" title="Title Popover" description="Hello popover content in here" className="mr-2" />
              <Popover btn_text="Bottom Popover" description="Hello popover content in here" placement="bottom" />
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
                  <td><b>btn_text</b></td>
                  <td>Button text</td>
                  <td><code>custom text in button ex 'Launch popover'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>btn_color</b></td>
                  <td>Button colors color</td>
                  <td>All button color ex <code>'primary', 'secondary', 'info' and etc</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>title</b></td>
                  <td>popover title</td>
                  <td><code>custom popover title</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>description</b></td>
                  <td>popover description</td>
                  <td><code>custom popover description</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>placement</b></td>
                  <td>popover placement</td>
                  <td><code>'top' | 'bottom'</code></td>
                  <td><code>'top'</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}