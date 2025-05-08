import React from 'react';

export default function AuthCoverLayout(props) {
  return (
  <div className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40" 
    style={{ 
      backgroundImage: "url('/img/blog/bg_cover.jpg')",
      backgroundColor: '#ffffff',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed' }}>
    <div className="flex flex-wrap flex-row">
      <span className="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0"></span>
      <div className="flex-shrink max-w-full w-full min-h-screen sm:w-2/3 lg:w-1/2 xl:w-1/3 z-30">
        <div className="max-w-full w-full h-full px-6 sm:px-12 bg-white dark:bg-gray-800 shadow-lg z-40">
          <div className="relative">
            <div className="p-6 sm:p-8">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}