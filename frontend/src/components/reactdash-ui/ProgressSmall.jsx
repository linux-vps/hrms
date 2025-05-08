import React from 'react';

export default function ProgressSmall(props) {
  // bg progress
  const data_percent = props.data;
  const percent = data_percent.toFixed(0) + "%";
  const bg_percent = data_percent > 80 ? "bg-green-500" : data_percent > 60 ? "bg-indigo-500" : data_percent > 40 ? "bg-yellow-500" : data_percent > 20 ? "bg-gray-500" : "bg-red-500";
  const bg_lightpercent = data_percent > 80 ? "bg-green-200" : data_percent > 60 ? "bg-indigo-200" : data_percent > 40 ? "bg-yellow-200" : data_percent > 20 ? "bg-gray-200" : "bg-red-200";
  return (
    <div className="flex items-center">
      <span className="ltr:mr-2 rtl:ml-2">{percent}</span>
      <div className="relative w-full">
        <div className={`overflow-hidden h-2 text-xs flex rounded ${bg_lightpercent}`}>
          <div style={{width: `${percent}` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${bg_percent}`}>
          </div>
        </div>
      </div>
    </div>
  );
}