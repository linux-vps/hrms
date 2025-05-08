import React from 'react';
import { HddStack } from 'react-bootstrap-icons';
import parse from 'html-react-parser';

export default function HostingBanner(props) {
  // props data
  const banner = {title: "Upgrade your Hosting<br /> with Cloud Server!", description: "Very simple to upgrade your hosting package with Cloud Server. Discount 30% for first year subscription.", url: "/", btn: "Upgrade now"}

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-8 py-6 relative overflow-hidden">
      <div className="absolute ltr:-right-8 rtl:-left-8 -bottom-8 text-indigo-500">
        <HddStack className="opacity-10 w-36 h-auto" />
      </div>
      <div className="relative">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 text-2xl mb-3">{parse(banner.title)}</h4>
        <p className="text-gray-500 mb-6">{banner.description}</p>
        <a href={banner.url} className="py-2 px-4 inline-block text-center mb-3 rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">{banner.btn}</a>
      </div>
    </div>
  );
}