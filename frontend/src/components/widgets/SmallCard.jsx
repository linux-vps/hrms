import React from 'react';
import { People } from 'react-bootstrap-icons';

export default function SmallCard({
  title = "Default title",
  data = {
    icon: <People className="w-8 h-8" />, 
    iconbig: <People className="opacity-10 w-36 h-auto" />, 
    count: 202
  },
  color = "primary"
}) {
  // Text colors
  const text_colors = {
    "primary": "bg-indigo-100 text-indigo-500",
    "secondary": "bg-pink-100 text-pink-500",
    "success": "bg-green-100 text-green-500",
    "warning": "bg-yellow-100 text-yellow-500",
    "danger": "bg-red-100 text-red-500",
    "info": "bg-cyan-100 text-cyan-500",
    "light": "bg-gray-100 text-gray-500",
    "dark": "bg-gray-400 text-gray-800",
  };

  // Background colors
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

  const addcolor = colors[color] || colors["primary"];
  const addTextcolor = text_colors[color] || text_colors["primary"];

  return (
    <div className={`${addcolor} rounded-lg shadow-lg h-full p-6 relative overflow-hidden`}>
      <div className="absolute ltr:-right-8 rtl:-left-8 -bottom-8 text-white">
        {data.iconbig}
      </div>
      <div className="flex flex-row justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{title}</h3>
        </div>
      </div>
      <div className="flex flex-row justify-between py-3">
        <div className={`${addTextcolor} flex items-center justify-center w-20 h-20 rounded-full relative text-center`}>
          {data.icon}
        </div>
        <h2 className="self-center text-2xl font-bold">{data.count}</h2>
      </div>
    </div>
  );
}
