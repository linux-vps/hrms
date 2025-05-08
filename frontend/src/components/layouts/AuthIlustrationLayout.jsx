import React from 'react';
import NavbarLogin from '@/components/navbar/NavbarLogin';
import Footer from '@/components/footer/Footer';
import { Column, Row } from '@/components/reactdash-ui';

export default function AuthIlustrationLayout(props) {
  const cover = {img:"/img/ilustration/presentation.png", alt:"welcome",title:"Manage your business easily and safely", description:"Managing a business is not as easy as it is today. You can view and manage all reports in a simple and practical way."}
  
  return (
    <>
      <NavbarLogin />
      <main>
        <div className="relative py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
          <div className="container mx-auto px-4 xl:max-w-6xl">
            <Row className="-mx-4">
              <Column className="px-4 w-full lg:w-1/2">
                <div className="max-w-full w-full px-2 sm:px-12 lg:pr-20 mb-12 lg:mb-0">
                  <div className="relative">
                    <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                      {props.children}
                    </div>
                  </div>
                </div>
              </Column>
              <Column className="px-4 w-full lg:w-1/2">
                <div className="text-center mt-6 lg:mt-0">
                  <img src={cover.img} alt={cover.alt} className="max-w-full h-auto mx-auto" />
                  <div className="px-4 mt-12">
                    <h1 className="text-bold text-4xl mb-2">{cover.title}</h1>
                    <p className="text-lg mb-4 text-gray-500">{cover.description}</p>
                  </div>
                </div>
              </Column>
            </Row>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}