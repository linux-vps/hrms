import React from "react";
import parse from 'html-react-parser';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function Pricing() {
  const pricing_text = {title: `<span className="font-light">Our</span> Pricing`, description: "No additional costs. Pay only one time and free for next update!", buy: "Buy Now", license: "Full license details", link_license: "/"}
  const data_pricing = [
    {name: "Regular", price: "29", currency: "$", features1: "1 Products", features2: "Personal or client", features3: "Lifetime Update", features4: "Supports 24/7", features5: "Cant product sold", features6: "Can't for generators", features7: "Most popular", link: "/"},
    {name: "Extended", price: "899", currency: "$", features1: "1 Products", features2: "Personal or client", features3: "Lifetime Update", features4: "Supports 24/7", features5: "Build Saas Business", features6: "Can't for generators", link: "/"}
  ]

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Pricing</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-8 md:p-12 mb-6">
            <div className="relative xl:px-16">
              <header className="text-center mx-auto mb-16">
                <h1 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">{parse(pricing_text.title)}</h1>
                <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
                <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{pricing_text.description}</p>
              </header>
              <div className="flex flex-wrap flex-row -mx-4 justify-center">
                {data_pricing.map((pricing, index) => {
                const bg_pricing = pricing.features7 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-900";
                return(
                <div key={index} className="flex-shrink max-w-full w-full sm:w-11/12 lg:w-1/2 px-4">
                  <div className="px-6 md:px-2 lg:px-4">
                    <div className={`${bg_pricing} relative py-16 px-12 mb-12 lg:-mt-6 dark:bg-opacity-40 transform transition duration-300 ease-in-out hover:-translate-y-1 shadow-lg text-center rounded-lg`}>
                      {pricing.features7 ?
                      <div className="absolute top-0 ltr:right-0 rtl:left-0 ltr:text-right rtl:text-left w-36 h-36 text-sm">
                        <span className="absolute top-4 ltr:right-0 rtl:left-0 px-4 py-2 block align-center shadow bg-indigo-500 text-gray-100">{pricing.features7}</span>
                      </div>: ''}

                      {pricing.name ?
                      <h3 className="text-lg mb-4 font-semibold uppercase">{pricing.name}</h3>:''}
                      <div className="pb-2">
                        {pricing.price ?
                        <h4 className="text-4xl mb-2 font-semibold"><small>{pricing.currency}</small>{pricing.price}</h4>:''}
                      </div>

                      <ul className="space-y-6 mt-4 mb-12">
                        {pricing.features1 ?
                        <li>{pricing.features1}</li>:''}
                        {pricing.features2 ?
                        <li>{pricing.features2}</li>:''}
                        {pricing.features3 ?
                        <li>{pricing.features3}</li>:''}
                        {pricing.features4 ?
                        <li>{pricing.features4}</li>:''}
                        {pricing.features5 ?
                        <li>{pricing.features5}</li>:''}
                        {pricing.features6 ?
                        <li>{pricing.features6}</li>:''}
                      </ul>

                      <div className="py-2">
                        {pricing.link ?
                        <a href={pricing.link} rel="noopener" className="py-2 px-4 -ml-1 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">{pricing_text.buy}</a>: ''}
                      </div>
                    </div>
                  </div>
                </div>
                )})}

                <div className="flex-shrink max-w-full w-full px-4">
                  <p className="text-center font-small mb-0">
                    {pricing_text.link_license ?
                    <a className="text-gray-500" rel="noopener" href={pricing_text.link_license} target="_blank">
                      <svg xmlns="http://www.w3.org/2000/svg" className="inline ltr:mr-2 rtl:ml-2" fill="currentColor" width="1rem" height="1rem" viewBox="0 0 640 512"><path d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                      {pricing_text.license}
                    </a>: ''}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}