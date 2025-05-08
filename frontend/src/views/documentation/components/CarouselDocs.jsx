import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Slider } from "@/components/reactdash-ui";

export default function CarouselDocs() {
  // page title
  const page_title = "Carousel Slider";

  // title, options, data
  const slider_title = "My Favorite Images";
  const slider_options = { 
    type: 'loop', 
    breakpoints: {
      1400: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      }
    }, 
    gap: '1rem' 
  }
  const slider_data = [
    { img: '/img/project/project_1.jpg', title: 'title 1', url: '/'},
    { img: '/img/project/project_2.jpg', title: 'title 2', url: '/'},
    { img: '/img/project/project_3.jpg', title: 'title 3', url: '/'},
  ]

  // prism code
  const datacode1 = `
import React from 'react'
import { Slider } from "@/components/reactdash-ui";

export default function Carousels() {
    // title, options, data
    const slider_title = "My Favorite Images";
    const slider_options = { 
      type: 'loop', 
      breakpoints: {
        1400: {
          perPage: 2,
        },
        640: {
          perPage: 1,
        }
      }, 
      gap: '1rem' 
    }
    const slider_data = [
      { img: '/img/project/project_1.jpg', title: 'title 1', url: '/'},
      { img: '/img/project/project_2.jpg', title: 'title 2', url: '/'},
      { img: '/img/project/project_3.jpg', title: 'title 3', url: '/'},
    ]

    return (
      <>
      {/* Slider  */}
      <Slider data={slider_data} title={slider_title} className="mb-6"/>
      <Slider data={slider_data} options={slider_options} title={slider_title} />
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
            <p className="text-lg mb-6 font-light">A slideshow component for cycling through elements—images or slides of text—like a carousel.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Demo Slider</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              {/* Slider  */}
              <Slider data={slider_data} title={slider_title} className="mb-6"/>
              <Slider data={slider_data} options={slider_options} title={slider_title} />
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
                  <td>Carousel slider title</td>
                  <td><code>'your custom title'</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>options</b></td>
                  <td>Slider options</td>
                  <td>data (<code>type, breakpoints, gap</code>)</td>
                  <td><code>perPage: 1</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data slider</td>
                  <td>data (<code>img, title, url</code>)</td>
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