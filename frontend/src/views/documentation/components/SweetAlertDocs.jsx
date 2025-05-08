import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, SweetAlert } from "@/components/reactdash-ui";

export default function SweetAlertDocs() {
  // page title
  const page_title = "Sweet Alert";
  // data alert
  const data_alert = {
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  }

  // prism code
  const datacode1 = `
import React from 'react';
import { SweetAlert } from "@/components/reactdash-ui";

export default function SweetAlerts() {
  // data alert (example : https://sweetalert2.github.io/#examples)
  const data_alert = {
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  }

  return (
    <>
    <SweetAlert data={data_alert} title="Launch Alert" btn_color="warning"/>
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
            <p className="text-lg mb-6 font-light">A beautiful, responsive, customizable, accessible (wai-aria) replacement for javascript's popup boxes.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Sweet Alert</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <SweetAlert data={data_alert} title="Launch Alert" btn_color="warning"/>
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
                  <td><b>data</b></td>
                  <td>data sweet alert</td>
                  <td><code>example data in https://sweetalert2.github.io/#examples</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>btn_color</b></td>
                  <td>button color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>title</b></td>
                  <td>button title / trigger</td>
                  <td><code>button text ex 'launch alert'</code></td>
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