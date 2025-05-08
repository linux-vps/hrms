import React from 'react';
import { Wallet2 } from 'react-bootstrap-icons';
import { Card, Tooltip, ShortFormat } from '@/components/reactdash-ui';

export default function SmallBox({
  title = "Default title",
  data = {
    new: 1254,
    old: 1465,
    url: "/",
    text: "View more",
    icon: <Wallet2 className="w-8 h-8" />
  },
  color = "primary"
}) {
  // Colors
  const colors = {
    "primary": "text-indigo-500 bg-indigo-100 dark:bg-indigo-900",
    "secondary": "text-pink-500 bg-pink-100 dark:bg-pink-900",
    "success": "text-green-500 bg-green-100 dark:bg-green-900",
    "warning": "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
    "danger": "text-red-500 bg-red-100 dark:bg-red-900",
    "info": "text-cyan-500 bg-cyan-100 dark:bg-cyan-900",
    "light": "bg-gray-50 text-gray-500",
    "dark": "bg-gray-700 text-gray-100",
  };
  const addcolor = colors[color] || colors["primary"];
  const data_progress = ((data.new - data.old) / data.new) * 100;

  return (
    <Card className="!p-0">
      <div className="flex justify-between pt-6 px-6 relative text-sm font-semibold">
        <p>{title}</p>
        <div className="ltr:float-right rtl:float-left">
          {data_progress > 1 ? 
            <Tooltip title="Since last month"><p className="text-green-500">+{data_progress.toFixed(0)}%</p></Tooltip>
            :
            <Tooltip title="Since last month"><p className="text-red-500">{data_progress.toFixed(0)}%</p></Tooltip>
          }
        </div>
      </div>
      <div className="flex flex-row justify-between px-6 py-4">
        <div className={`flex items-center justify-center w-14 h-14 rounded-full dark:bg-opacity-40 relative text-center ${addcolor}`}>
          {data.icon}
        </div>
        <h2 className="self-center text-3xl"><ShortFormat data={data.new} /></h2>
      </div>
      <div className="px-6 pb-6">
        <a className="hover:text-indigo-500 text-sm" href={data.url}>{data.text}</a>
      </div>
    </Card>
  );
}
