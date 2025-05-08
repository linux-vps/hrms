import React from 'react';
// components
import { Rating, Preloader, Row, Column, Card, Prism, Heading } from "@/components/reactdash-ui";

export default function RatingDocs() {
  // page title
  const page_title = "Rating";

  // prism code
  const datacode1 = `
import React from 'react';
import { Rating } from "@/components/reactdash-ui";

export default function Ratings() {
  return (
    <>
    {/* example rating  */}
    <Rating data={5} />
    <Rating data={4.5} />
    <Rating data={4} />
    <Rating data={3.5} />
    <Rating data={3} />
    <Rating data={2.5} />
    <Rating data={2} />
    <Rating data={1.5} />
    <Rating data={1} />

    {/* rating with tooltip number */}
    <Rating data={5} model="tooltip" />
    {/* rating with right number  */}
    <Rating data={5} model="right"/>

    {/* rating size */}
    <Rating data={4.5} size="small" />
    <Rating data={4.5} size="medium" />
    <Rating data={4.5} size="large" />
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
            <p className="text-lg mb-6 font-light">Documentation and examples for adding Rating star.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Example Rating</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <div className="flex flex-col space-y-2 mb-3">
                {/* example rating  */}
                <Rating data={5} />
                <Rating data={4.5} />
                <Rating data={4} />
                <Rating data={3.5} />
                <Rating data={3} />
                <Rating data={2.5} />
                <Rating data={2} />
                <Rating data={1.5} />
                <Rating data={1} />
              </div>
              <Heading variant="h4">Model</Heading>
              {/* rating with tooltip number */}
              <Rating data={5} model="tooltip" /><br />
              {/* rating with right number  */}
              <Rating data={5} model="right"/>

              <Heading variant="h4">Size</Heading>
              {/* rating size */}
              <Rating data={4.5} size="small" /><br />
              <Rating data={4.5} size="medium" /><br />
              <Rating data={4.5} size="large" />
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
                  <td>Data count rating</td>
                  <td><code>'number 1-5'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>model</b></td>
                  <td>model rating</td>
                  <td><code>'tooltip' | 'right'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>size</b></td>
                  <td>rating size</td>
                  <td><code>'small' | 'medium' | 'large'</code></td>
                  <td><code>'small'</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}