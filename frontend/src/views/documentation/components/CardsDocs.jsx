import React from 'react';
// components
import { Preloader, Row, Column, CardBlog, Card, Prism } from "@/components/reactdash-ui";

export default function CardsDocs() {
  // page title
  const page_title = "Cards";
   // data blog card
   const data_blogs = [
    {img: "/img/products/product_2.jpg", title: "New web design layout trends in 2022", date: "December 11, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus est, excepturi nam odit possimus."},
    {img: "/img/products/product_3.jpg", title: "New web design layout trends in 2023", date: "December 12, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus est, excepturi nam odit possimus."}
   ]

  // prism code
  const datacode1 = `
import React from 'react'
import { Row, Column, Card, CardBlog } from "@/components/reactdash-ui";

export default function Cards() {
    // data blog card
    const data_blogs = [
      {img: "/img/products/product_2.jpg", title: "New web design layout trends in 2022", date: "December 11, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus est, excepturi nam odit possimus."},
      {img: "/img/products/product_3.jpg", title: "New web design layout trends in 2023", date: "December 12, 2022", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus est, excepturi nam odit possimus."}
     ]

    return (
      <>
      {/* default */}
      <Card>Default Card</Card>

      {/* Blog card */}
      <Row className="-mx-4">
        {data_blogs.map( (data_blog, index ) =>
        <Column key={index} className="w-full md:w-1/2 px-4">
          <CardBlog data={data_blog} />
        </Column>
        )}
      </Row>
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
          <Card className="relative border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg mb-6 font-light">The default Taildash cards provide a flexible and extensible content container with multiple variants and options.</p>
            <h2 className="text-base mb-2 font-semibold text-gray-800 dark:text-gray-300">Default</h2>
            <Card>Default Card</Card>
            <h2 className="text-base mb-2 mt-6 font-semibold text-gray-800 dark:text-gray-300">Blog Card</h2>
            
            <Row className="-mx-4">
              {data_blogs.map( (data_blog, index ) =>
              <Column key={index} className="w-full md:w-1/2 px-4">
                <CardBlog data={data_blog} />
              </Column>
              )}
            </Row>

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
                <tr>
                  <td><b>data</b></td>
                  <td>Data blog</td>
                  <td>data ( <code>img</code> | <code>title</code> | <code>date</code> | <code>description</code> )</td>
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