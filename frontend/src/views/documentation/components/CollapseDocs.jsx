import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Collapse, FaqCollapse } from "@/components/reactdash-ui";

export default function CollapseDocs() {
  // page title
  const page_title = "Collapse";

  const title_collapse1 = "Expand text";
  const title_collapse2 = "Expand custom";

  // Faq collapse
  const page_title2 = "FAQ Collapse";
  const faqitem = [
    {
      question: 'How is the SEO services system at Taidash?',
      answer: 'Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile. ',
    },
    {
      question: "How many keywords are optimized?",
      answer: 'Never planned that one day Id be losing you. She eats your heart out. Your kiss is cosmic, every move is magic. ',
    },
    {
      question: "Do you offer any discounted plans?",
      answer: 'Greetings loved ones lets take a journey. Just own the night like the 4th of July! But youd rather get wasted. ',
    },
  ]

  // prism code
  const datacode1 = `
import React from 'react';
import { Collapse } from "@/components/reactdash-ui";

export default function Collapses() {
  const title_collapse1 = "Expand text";
  const title_collapse2 = "Expand custom";

    return (
      <>
      {/* collapse */}
      <Collapse title={title_collapse1} color="success" className="mb-4">
        <p>Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile.</p>
      </Collapse>
      
      <Collapse title={title_collapse2} color="danger">
        <img src="/img/project/project_1.jpg" alt="Alt title" />
      </Collapse>
      </>
    )
}
  `;

  const datacode2 = `
import React from 'react';
import { FaqCollapse } from "@/components/reactdash-ui";

export default function Collapses() {
  // data faq
  const faqitem = [
    {
      question: 'How is the SEO services system at Taidash?',
      answer: 'Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile. ',
    },
    {
      question: "How many keywords are optimized?",
      answer: 'Never planned that one day Id be losing you. She eats your heart out. Your kiss is cosmic, every move is magic. ',
    },
    {
      question: "Do you offer any discounted plans?",
      answer: 'Greetings loved ones lets take a journey. Just own the night like the 4th of July! But youd rather get wasted. ',
    },
  ]

  return (
    <>
    {/* FAQ collapse */}
    <FaqCollapse data={faqitem} />
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
            <p className="text-lg mb-6 font-light">Toggle the visibility of content across your project with a few classes and Headless UI.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Title and color</h2>
            <p className="mb-4 font-light">In Collapse 'title' is used to change button text and 'color' to change button color. For content, you can immediately enter anything in collapse such as images, custom html and text.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Collapse title={title_collapse1} color="success" className="mb-4">
                <p>Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile.</p>
              </Collapse>
              <Collapse title={title_collapse2} color="danger">
                <img src="/img/project/project_1.jpg" alt="Alt title" />
              </Collapse>
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
                  <td>Button text</td>
                  <td><code>Button custom text</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Button color</td>
                  <td><code>All button color</code></td>
                  <td><code>'light'</code></td>
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
      
      {/* page title 2 */}
			<Row>
				<Column className="w-full md:w-1/2 px-4 mt-6">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title2}</p>
				</Column>
			</Row>

      {/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Data</h2>
            <p className="mb-4 font-light">In Collapse 'data' is used to change questions and answers.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <FaqCollapse data={faqitem} />
            </Card>
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
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data collapse 'question and answer'</td>
                  <td>data (<code>question | answer</code>)</td>
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