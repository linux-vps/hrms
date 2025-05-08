import React from 'react';
// components
import { Preloader, Row, Column, Accordion, Card, Prism } from "@/components/reactdash-ui";

export default function AccordionDocs() {
  // Data questionsAnswers
  const data_faq = [
    {
      question: "How many team members can I invite?",
      answer:
        "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
    },
    {
      question: "What is the maximum file upload size?",
      answer:
        "No more than 2GB. All files in your account must fit your allotted storage space.",
    },
    {
      question: "How do I reset my password?",
      answer: `Click “Forgot password” from the login page or “Change password” from your profile page. A reset link will be emailed to you.`,
    },
    {
      question: "Can I cancel my subscription?",
      answer: `Yes! Send us a message and we’ll process your request no questions asked.`,
    }
  ]

  // page title
  const page_title = "Accordions";
  
  // prism code
  const datacode1 = `
import React from 'react'
import { Accordion } from "@/components/reactdash-ui";

export default function Accordion() {
    // props.data
    const data_accordion = [
      {
        question: "How many team members can I invite?",
        answer:
          "You can invite up to 2 additional users on the Free plan. There is no limit on team members for the Premium plan.",
      },
      {
        question: "What is the maximum file upload size?",
        answer:
          "No more than 2GB. All files in your account must fit your allotted storage space.",
      }
    ]  

    return (
      <>
        <Accordion data={data_accordion} />
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

			{/* content  */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Build vertically collapsing accordions in combination with React Hook. The accordion uses collapse internally to make it collapsible.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Accordion data={data_faq}/>
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
                  <td>Data accordion 'question and answer'</td>
                  <td>data ( <code>question</code> | <code>answer</code> )</td>
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