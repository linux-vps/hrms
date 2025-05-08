import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Spinner } from "@/components/reactdash-ui";

export default function SpinnerDocs() {
  // page title
  const page_title = "Spinner";
  const page_title2 = "Preloader";

  // prism code
  const datacode1 = `
import React from 'react'
import { Spinner } from "@/components/reactdash-ui";

export default function Spinners() {
  return (
    <>
    {/* ping */}
    <Spinner color="primary" model="ping" size="x-small" />
    <Spinner color="success" model="ping" size="small" />
    <Spinner color="warning" model="ping" size="medium" />
    <Spinner color="danger" model="ping" size="large" />

    {/* spin */}
    <Spinner color="primary" model="spin" size="x-small" />
    <Spinner color="success" model="spin" size="small" />
    <Spinner color="warning" model="spin" size="medium" />
    <Spinner color="danger" model="spin" size="large" />
    </>
  )
}
  `;
  const datacode2 = `
import React from 'react';
import { Preloader } from "@/components/reactdash-ui";

export default function Preloaders() {
  return (
    <>
    <Preloader>
      Your main content in here
    </Preloader>
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
            <p className="text-lg mb-6 font-light">Indicate the loading state of a component or page with spinners, built entirely with HTML, CSS, and no JavaScript.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">model</h2>
            <p className="mb-4 font-light">There are 2 choices of spinner 'model' spin and ping. The default model is spin.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Spinner color="primary" model="ping" size="x-small" className="mr-2" />
              <Spinner color="success" model="ping" size="small" className="mr-2" />
              <Spinner color="warning" model="ping" size="medium" className="mr-2" />
              <Spinner color="danger" model="ping" size="large" className="mr-2" />
            </Card>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Spinner color="primary" model="spin" size="x-small" className="mr-2" />
              <Spinner color="success" model="spin" size="small" className="mr-2" />
              <Spinner color="warning" model="spin" size="medium" className="mr-2" />
              <Spinner color="danger" model="spin" size="large" className="mr-2" />
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
                  <td><b>model</b></td>
                  <td>Spinner model</td>
                  <td><code>'spin' | 'ping'</code></td>
                  <td><code>'spin'</code></td>
                </tr>
                <tr>
                  <td><b>size</b></td>
                  <td>Spinner size</td>
                  <td><code>'x-small' | 'small' | 'medium' | 'large'</code></td>
                  <td><code>'medium'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Spinner color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'light'</code></td>
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

      {/* page title  */}
			<Row className="mt-12">
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title2}</p>
				</Column>
			</Row>

			{/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Preloader is the what you see on some sites before the main content of the web page is loaded.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">preloader</h2>
            
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
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
                  <td>Preloader colors color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}