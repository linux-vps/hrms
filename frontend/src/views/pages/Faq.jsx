import React from "react";
import { QuestionCircle } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function Faq() {
  const faq_title = {title: "Frequently Asked Questions", description: "Most Popular Question from New Client!"}
  const data_faqs = [
    {title: "How is the SEO services system at One Company?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."},
    {title: "How many keywords are optimized?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."},
    {title: "Can I change my plan later on?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."},
    {title: "Do you offer any discounted plans?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."},
    {title: "Can I cancel my account at any time?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."},
    {title: "What is the rate if I type in a credit card?", description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."}
  ]

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Faq</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
        <Card className="relative p-8 md:p-12 mb-6">
            <div className="relative">
              <header className="text-center mx-auto mb-6">
                <h1 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">{faq_title.title}</h1>
                <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
                <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{faq_title.description}</p>
              </header>

              <div className="flex flex-wrap flex-row -mx-4">
                {data_faqs.map((faq, index) =>
                <div key={index} className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                  <div className="p-6 bg-white dark:bg-gray-800">
                    <h3 className="text-lg leading-normal mb-2 font-semibold dark:text-gray-300">
                      <QuestionCircle className="text-indigo-500 ltr:mr-2 rtl:ml-2 inline-block" />{faq.title}
                    </h3>
                    <p className="text-gray-500">{faq.description}</p>
                  </div>
                </div>
                )}
              </div>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}