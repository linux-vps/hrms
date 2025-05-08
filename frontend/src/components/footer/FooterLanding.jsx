import React from 'react';

export default function FooterLanding(props) {
  // footer text
  const footer_text = {
    copyright: "Copyright Reactdash | All rights reserved."
  }

  return (
    <footer className="bg-gray-800 text-gray-400 dark:bg-gray-900">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap lg:flex-row -mx-4 py-9">
          <div className="w-full text-center">
            <p>{footer_text.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}