import React from 'react';
import Logo from '@/components/navbar/Logo';

export default function Maintenance() {
  const data_main = {
    title: "Site is Under Maintenance", 
    description:"We're making the system more awesome. We'll be back shortly. If you have any questions, please contact us.", 
    img: "/img/ilustration/maintenance.png", alt: "Maintenance", 
    phone: "(+123) 456 7890", copyright: "Copyright Your Company | All rights reserved.",
    contact: "Contact Us", contact_link: "/"}

  return (
    <div className="min-h-screen font-sans text-base font-normal text-gray-600 dark:text-gray-400 pt-20 bg-indigo-600 bg-gradient-to-r from-indigo-800 via-indigo-700 to-green-500 dark:from-gray-800 dark:via-gray-700 dark:to-green-700">
      <header>
        <nav className="nav-top flex flex-nowrap lg:flex-start items-center bg-indigo-600 bg-gradient-to-r from-indigo-800 via-indigo-700 to-green-500 dark:from-gray-800 dark:via-gray-700 dark:to-green-700 z-20 fixed top-0 left-0 right-0  overflow-y-auto max-h-screen lg:overflow-visible lg:max-h-full">
          <div className="container mx-auto px-4 xl:max-w-6xl py-2">
            <div className="flex flex-row justify-between py-6">
              <Logo color="light" />
              
              <div className="flex items-center">
                <p className="self-center font-bold text-white pr-8">{data_main.phone}</p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main id="content">
        <div id="hero" className="relative z-0 py-12 lg:py-20 text-gray-300 overflow-hidden">
          <div className="container xl:max-w-6xl mx-auto px-4 z-10">
            <div className="flex flex-wrap flex-row -mx-4 justify-center">
              <div className="flex-shrink max-w-full px-4 w-full md:w-9/12 lg:w-1/2 self-center lg:pr-12">
                <div className="text-center lg:ltr:text-left lg:rtl:text-right mt-6 lg:mt-0">
                  <div className="mb-6">
                    <h1 className="text-white text-4xl leading-normal mb-3 font-bold">
                      {data_main.title}
                    </h1>
                    <p className="text-gray-400 leading-relaxed font-light text-xl mx-auto pb-2">
                      {data_main.description}
                    </p>
                  </div>
                  <a href={data_main.contact_link} className="py-2 px-4 inline-block text-center rounded leading-5 text-gray-100 bg-pink-500 border border-pink-500 hover:text-white hover:bg-pink-600 hover:ring-0 hover:border-pink-600 focus:bg-pink-600 focus:border-pink-600 focus:outline-none focus:ring-0 mr-4">
                    {data_main.contact}
                  </a>
                </div>
              </div>

              <div className="flex-shrink max-w-full px-4 w-full md:w-9/12 lg:w-1/2 self-center">
                <div className="relative px-6 md:ml-8 md:pr-0 mt-4">
                  <img src={data_main.img} alt={data_main.alt} className="max-w-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-gray-400">
        <div className="container xl:max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap lg:flex-row -mx-4 py-9">
            <div className="w-full text-center">
              <p>{data_main.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}