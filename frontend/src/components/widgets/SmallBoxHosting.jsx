import React from 'react';
import { Card } from '@/components/reactdash-ui';
import { Server } from 'react-bootstrap-icons';

export default function SmallBoxHosting({
  title = "Default title",
  data = {
    icon: <Server className="w-8 h-8" />,
    count: 7
  },
  color = "primary"
}) {
  // Colors
  const colors = {
    "primary": "bg-indigo-100 text-indigo-500",
    "secondary": "bg-pink-100 text-pink-500",
    "success": "bg-green-100 text-green-500",
    "warning": "bg-yellow-100 text-yellow-500",
    "danger": "bg-red-100 text-red-500",
    "info": "bg-cyan-200 text-gray-500",
    "light": "bg-gray-50 text-gray-500",
    "dark": "bg-gray-500 text-gray-100",
  };
  const addcolor = colors[color] || colors["primary"];

  return (
    <Card>
      <div className="flex flex-row">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full dark:bg-gray-900 dark:bg-opacity-20 relative text-center ${addcolor}`}>
          {data.icon}
        </div>
        <div className="ltr:ml-3 rtl:mr-3">
          <h2 className="self-center mb-1">{title}</h2>
          <p className="text-xl font-semibold">{data.count}</p>
        </div>
      </div>
    </Card>
  );
}
