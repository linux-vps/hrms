import React from 'react';
import NavbarLogin from '@/components/navbar/NavbarLogin';
import Footer from '@/components/footer/Footer';

export default function AuthLayout(props) {
  return (
    <>
      <NavbarLogin />
      <main>
        <div className="relative py-12 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
          <div className="container xl:max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap flex-row -mx-4 justify-center">
              <div className="max-w-full w-full md:w-2/3 lg:w-1/2 px-6 sm:px-12">
                <div className="relative">
                  <div className="p-6 sm:py-8 sm:px-12 rounded-lg bg-white dark:bg-gray-800 shadow-xl">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}