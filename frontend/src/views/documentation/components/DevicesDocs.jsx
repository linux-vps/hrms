import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Devices } from "@/components/reactdash-ui";

export default function DevicesDocs() {
  // page title
  const page_title = "Devices";
  // images
  const img_1 = '/img/app/iphone-potrait.jpg';
  const img_2 = '/img/app/macbook-screen2.jpg';

  // prism code
  const datacode1 = `
import React from 'react'
import { Devices } from "@/components/reactdash-ui";

export default function Devicess() {
    // images
    const img_1 = '/img/app/iphone-potrait.jpg';
    const img_2 = '/img/app/macbook-screen2.jpg';

    return (
      <>
      {/* iphone */}
      <Devices img={img_1} />
      
      {/* macbook */}
      <Devices variant="macbook" img={img_1} />
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
            <p className="text-lg mb-6 font-light">The easiest way to wrap your screenshots on Iphone and Macbook. Make screenshots for Iphone with size 375x812 and for macbook size 500x800.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Variant</h2>
            <p className="mb-4 font-light">There are 2 choices of device 'variant' iphone and macbook. The default variant is iphone.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Row>
                <Column className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <Devices img={img_1} />
                </Column>
                <Column className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                <Devices variant="macbook" img={img_2} />
                </Column>
              </Row>
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
                  <td><b>variant</b></td>
                  <td>Device variant</td>
                  <td><code>'iphone'</code> | <code>'macbook'</code></td>
                  <td><code>'iphone'</code></td>
                </tr>
                <tr>
                  <td><b>img</b></td>
                  <td>Device source image</td>
                  <td><code>iphone size = 375x812 </code> | <code>macbook size = 500x800</code></td>
                  <td><code>-</code></td>
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
    </Preloader>
  );
}