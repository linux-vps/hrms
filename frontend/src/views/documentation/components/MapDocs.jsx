import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Maps } from "@/components/reactdash-ui";

export default function MapDocs() {
  // page title
  const page_title = "Map";

  // prism code
  const datacode1 = `
import React from 'react';
import { Maps } from "@/components/reactdash-ui";

export default function Mapsexp() {
    return (
      <>
      {/* default */}
      <Maps />

      {/* with statistic */}
      <Maps statistic={true} />
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
            <p className="text-lg mb-6 font-light">For vector maps we use the plugin from react-vector-maps.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example vector map</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Maps statistic={true} />
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
                  <td>Data array maps</td>
                  <td><code>id (string) | label (string) | value  (number)</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>statistic</b></td>
                  <td>Statistic map</td>
                  <td>Boolean</td>
                  <td><code>false</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}