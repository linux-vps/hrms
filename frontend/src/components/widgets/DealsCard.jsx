import React from 'react';
import { Currency } from '@/components/reactdash-ui';

export default function DealsCard(props) {
  // data deal
  const deals = { revenue: 1637, deal: 12, target: 20 }
  // model
  const text_total1 = { dealtext: "Won Deals",  targettext: "From Target"}
  const text_total2 = { dealtext: "Lost Deals",  targettext: "Won Traget"}
  const text_deal = props.model === "lost" ? text_total2 : text_total1;
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
  }
  const addcolor = props.color ? colors[props.color] : 'bg-indigo-500 text-indigo-100';

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
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative text-center">
        <h4 className="font-bold text-2xl text-white mb-3"><Currency data={deals.revenue} /></h4>
        <p className="text-sm mb-3">{text_deal.dealtext} <span className="font-bold">{deals.deal}</span></p>
        <p className="text-sm mt-3">{text_deal.targettext} <span className="font-bold">{deals.target}</span></p>
      </div>
    </div>
  );
}