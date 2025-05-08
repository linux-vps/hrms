import React from 'react';
import { LightningCharge } from 'react-bootstrap-icons';
import { Card, Tooltip, Currency, ProgressUpDown } from '@/components/reactdash-ui';

export default function SalesSmallBox({
  title = "Default title",
  data = { count: 100, target: 100 },
  color = "primary",
  model
}) {
  // Progress data
  const data_percent = { new: data.count, old: data.target };

  // Colors
  const colors = {
    "primary": "bg-indigo-500",
    "secondary": "bg-pink-500",
    "success": "bg-green-500",
    "warning": "bg-yellow-500",
    "danger": "bg-red-500",
    "info": "bg-cyan-500",
    "light": "bg-gray-300",
    "dark": "bg-gray-800",
  };
  const addcolor = colors[color] || colors["primary"];

  return (
    <Card className="relative overflow-hidden">
      <h3 className="text-base font-bold mb-2">{title}</h3>
      <h2 className="text-3xl font-bold mb-4">
        {model === "currency" ? <Currency data={data.count} /> : data.count}
      </h2>

      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center">
          <LightningCharge className="inline-block ltr:mr-1 rtl:ml-1" />
          {model === "currency" ? <Currency data={data.target} /> : data.target}
        </div>
        <div className="relative">
          <Tooltip title="Vs target">
            <ProgressUpDown data={data_percent} />
          </Tooltip>
        </div>
      </div>

      <div className="absolute ltr:-right-16 rtl:-left-16 -top-16">
        <div className={`${addcolor} opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10`}></div>
      </div>
      <div className="absolute ltr:-right-4 rtl:-left-4 -top-24">
        <div className={`${addcolor} opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10`}></div>
      </div>
    </Card>
  );
}
