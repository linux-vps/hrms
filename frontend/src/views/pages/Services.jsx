import React from "react";
import { Laptop, BarChart, Globe2, Image, Facebook, Phone } from 'react-bootstrap-icons';
import parse from 'html-react-parser';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function Services() {
  const service_title = `<span className="font-light">Our</span> Services`;
  const data_services = [
    {icon: <Laptop className="w-8 h-8" />, title: "Web Development", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {icon: <BarChart className="w-8 h-8" />, title: "Digital Marketing", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {icon: <Globe2 className="w-8 h-8" />, title: "Search Engine Optimization", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {icon: <Image className="w-8 h-8" />, title: "Brand Identity", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {icon: <Facebook className="w-8 h-8" />, title: "Social Media Marketing", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {icon: <Phone className="w-8 h-8" />, title: "Mobile Apps Development", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
  ]

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Services</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-8 md:p-12 mb-6">
            <div className="relative">
              <header className="text-center mx-auto mb-12">
                <h1 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">{parse( service_title )}</h1>
                <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
              </header>
              
              <div className="flex flex-wrap flex-row -mx-4 text-center">
                {data_services.map(( service, index ) =>
                <div key={index} className="flex-shrink max-w-full px-4 w-full sm:w-1/2 xl:w-1/3">
                  <div className="px-4 mb-12">
                    <div className="relative flex justify-center items-center w-20 h-20 mx-auto text-indigo-500 p-6 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-900 dark:bg-opacity-40 dark:border-gray-700 mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold dark:text-gray-300 mb-1">{service.title}</h3>
                    <p className="text-gray-500">{service.description}</p>
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