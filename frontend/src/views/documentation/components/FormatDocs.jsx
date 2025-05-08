import React from 'react';
// components
import { ProgressUpDown, Currency, Percent, ShortFormat, Preloader, Row, Column, Card, Prism, Tooltip, Button } from "@/components/reactdash-ui";

export default function FormatDocs() {
  // page title
  const page_title = "Formatter";

  // prism code
  const datacode1 = `
import React from 'react';
import { Currency, Percent, ShortFormat, ProgressUpDown } from "@/components/reactdash-ui";

export default function Formatss() {
  return (
    <>
    {/* Currency  */}
    <Currency data={112} />
    <Currency data={1123} />
    <Currency data={112345} />
    <Currency data={11000000} />

    {/* Percent  */}
    <Percent data={80} />
    <Percent data={70} />
    <Percent data={60} />
    <Percent data={30} />

    {/* ShortFormat  */}
    <ShortFormat data={1280} />
    <ShortFormat data={36000} />
    <ShortFormat data={1170000} />
    <ShortFormat data={6600000000} />

    {/* ProgressUpDown  */}
    <ProgressUpDown data={{ new: 12, old: 20 }} />
    <ProgressUpDown data={{ new: 32, old: 20 }} />
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
            <p className="text-lg mb-6 font-light">Change data number to other format.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Formatter</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <h3 className="heading-4 mb-2 text-gray-800 dark:text-gray-300">Currency</h3>
              {/* Currency  */}
              112<span className="mx-6">to</span><Currency data={112} /><br />
              1123<span className="mx-6">to</span><Currency data={1123} /><br />
              112345<span className="mx-6">to</span><Currency data={112345} /><br />
              11000000<span className="mx-6">to</span><Currency data={11000000} /><br />

              <h3 className="heading-4 mt-6 mb-2 text-gray-800 dark:text-gray-300">Percent</h3>
              {/* Percent  */}
              80<span className="mx-6">to</span><Percent data={80} /><br />
              70<span className="mx-6">to</span><Percent data={70} /><br />
              60<span className="mx-6">to</span><Percent data={60} /><br />
              30<span className="mx-6">to</span><Percent data={30} /><br />

              <h3 className="heading-4 mt-6 mb-2 text-gray-800 dark:text-gray-300">ShortFormat</h3>
              {/* ShortFormat  */}
              1280<span className="mx-6">to</span><ShortFormat data={1280} /><br />
              36000<span className="mx-6">to</span><ShortFormat data={36000} /><br />
              1170000<span className="mx-6">to</span><ShortFormat data={1170000} /><br />
              6600000000<span className="mx-6">to</span><ShortFormat data={6600000000} /><br />

              <h3 className="heading-4 mt-6 mb-2 text-gray-800 dark:text-gray-300">ProgressUpDown</h3>
              {/* ProgressUpDown  */}
              new: 12, old: 20<span className="mx-6">to</span><ProgressUpDown data={{ new: 12, old: 20 }} />
              new: 32, old: 20<span className="mx-6">to</span><ProgressUpDown data={{ new: 32, old: 20 }} />
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
                  <td>data number</td>
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