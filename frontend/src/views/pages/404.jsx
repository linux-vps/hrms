import React from "react";
import parse from 'html-react-parser';
import { HouseDoor } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function NotFound() {
  const data_notfound = {
    title: `404 <span className="font-light">Not Found</span>`, 
    description: "That page can't be found. It looks like nothing was found at this location.", 
    img: "/img/ilustration/404.png", 
    btn_text: "Bak to Home", 
    btn_link: "/"
  }
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">NotFound</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-8 md:p-12 mb-6">
            <div className="relative">
              <header className="text-center mx-auto mb-6">
                <h1 className="text-4xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">
                  {parse(data_notfound.title)}
                </h1>
                <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
                <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{data_notfound.description}</p>
              </header>

              <div className="relative text-center">
                <img src={data_notfound.img} className="max-w-full h-auto mx-auto mb-6" alt="404 Not found" />
                <a href={data_notfound.btn_link} className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                  <HouseDoor className="inline-block ltr:mr-2 rtl:ml-2" /> {data_notfound.btn_text}</a>
              </div>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}