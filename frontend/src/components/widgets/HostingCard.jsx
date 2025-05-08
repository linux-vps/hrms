import React from 'react';
import { Currency } from '@/components/reactdash-ui';

export default function HostingCard({
  title = "Default title",
  data = {
    count: 0,
    text: "Total point"
  },
  color
}) {
  const count = data.count || 0;
  const text = data.text || "Total point";

  // colors
  const colors = {
    "primary": "text-indigo-100 bg-indigo-500",
    "secondary": "text-pink-100 bg-pink-500",
    "success": "text-green-100 bg-green-500",
    "warning": "text-yellow-100 bg-yellow-500",
    "danger": "text-red-100 bg-red-500",
    "info": "text-cyan-100 bg-cyan-500",
    "light": "text-gray-100 bg-gray-500",
    "dark": "text-gray-400 bg-gray-800",
  };
  const addcolor = color ? colors[color] : 'bg-indigo-500 text-indigo-100';

  return (
    <div className={`rounded-lg shadow-lg p-6 mb-6 relative overflow-hidden ${addcolor}`}>
      <div className="absolute ltr:-right-10 rtl:-left-10 -top-10">
        <div className="bg-white opacity-10 w-36 h-36 rounded-full"></div>
      </div>
      <div className="absolute ltr:-right-8 rtl:-left-8 -top-8">
        <div className="bg-white opacity-20 w-24 h-24 rounded-full"></div>
      </div>

      <div className="flex flex-row justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{title}</h3>
        </div>
      </div>
      <div className="relative text-center">
        <h4 className="font-bold text-2xl text-white mb-3"><Currency data={count} /></h4>
        <p className="text-sm mb-3">{text}</p>
      </div>
    </div>
  );
}