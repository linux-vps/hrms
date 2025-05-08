import React from 'react';
import { Currency } from '@/components/reactdash-ui';

export default function Progress(props) {
  // Progress percent
  const percent = props.percent + "%";
  const addClass = props.className ?  ` ${props.className}` : '';
  const CustomValue = props.data;
  const typeProgress = props.type;
  const addCustom = props.data ?  ` custom-after` : '';
  // colors
  const colorsbg = {
    "primary": "bg-indigo-100",
    "secondary": "bg-pink-100",
    "success": "bg-green-100",
    "warning": "bg-yellow-100",
    "danger": "bg-red-100",
    "info": "bg-cyan-100",
    "light": "bg-gray-100",
    "dark": "bg-zinc-100",
  }
  const colors = {
    "primary": "bg-indigo-500",
    "secondary": "bg-pink-500",
    "success": "bg-green-500",
    "warning": "bg-yellow-500",
    "danger": "bg-red-500",
    "info": "bg-cyan-500",
    "light": "bg-gray-500",
    "dark": "bg-zinc-500",
  }
  const colorstrokesbg = {
    "primary": "stroke-indigo-100",
    "secondary": "stroke-pink-100",
    "success": "stroke-green-100",
    "warning": "stroke-yellow-100",
    "danger": "stroke-red-100",
    "info": "stroke-cyan-100",
    "light": "stroke-gray-100",
    "dark": "stroke-zinc-100",
  }
  const colorstrokes = {
    "primary": "stroke-indigo-500",
    "secondary": "stroke-pink-500",
    "success": "stroke-green-500",
    "warning": "stroke-yellow-500",
    "danger": "stroke-red-500",
    "info": "stroke-cyan-500",
    "light": "stroke-gray-500",
    "dark": "stroke-zinc-500",
  }
  // Props ( color, model, percent, className )
  const addcolor = props.color ? colors[props.color] : 'bg-indigo-500';
  const addcolorbg = props.color ? colorsbg[props.color] : 'bg-indigo-100';
  const addcolorstroke = props.color ? colorstrokes[props.color] : 'stroke-indigo-500';
  const addcolorstrokebg = props.color ? colorstrokesbg[props.color] : 'stroke-indigo-100';
  
  // model
  const model = props.model;

  // progress circle
  let val = props.percent;
  const c = Math.PI*(60*2);
  if (val < 0) { val = 0;}
  if (val > 100) { val = 100;}
  const pct = ((100-val)/100)*c;
  // circle value
  const DashOffset = pct + "px";

  return (
    <>
        { model === "circle" ?
          <div className={`circle-progress${addCustom} w-full h-40 px-3 flex justify-center items-center relative mx-auto${addClass}`} data-percent={props.percent}>
            <svg className="absolute w-36 h-36" viewport="0 0 70 70" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <circle className={`${addcolorstrokebg}`} r="60" cx="70" cy="70" fill="transparent" strokeDasharray="376.99" strokeDashoffset="0"></circle>
              <circle className={`circle-fill ${addcolorstroke}`} r="60" cx="70" cy="70" fill="transparent" strokeDasharray="376.99" strokeDashoffset="0" style={{strokeDashoffset: `${DashOffset}`}}></circle>
            </svg>
            {CustomValue ?  <span className="font-bold">{typeProgress === 'currency' ? <Currency data={CustomValue} /> : CustomValue }</span> : ''}
          </div>
          : model === "vertical" ?
          <div className={`flex flex-col flex-nowrap justify-end ${addcolorbg} dark:bg-opacity-40 w-12 h-48 rounded mb-4${addClass}`}>
            <div className={`progress-vertical relative ${addcolor}`} style={{ height: `${percent}` }}><span className="w-full text-white pt-2 absolute left=0 right-0 py-1 font-bold text-center">{percent}</span></div>
          </div>
          :
          <div className={`flex h-4 overflow-hidden ${addcolorbg} rounded mb-4${addClass}`}>
            <div className={`progress-horizontal flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap ${addcolor}`} role="progressbar" style={{width: `${percent}`}} >{percent}</div>
          </div>
        }
    </>
  );
}