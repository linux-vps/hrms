import React, {useState} from 'react';
import { Button } from '@/components/reactdash-ui';

export default function Popover(props) {
  // set toggle
  const [isTogglepop, setTogglepop] = useState(false);
  // placement
  const placements = {
    "top": "top-auto bottom-full mb-3",
    "bottom": "top-full bottom-auto mt-3",
  }
  const carets = {
    "top": "border-l border-b bottom-0 -mb-1.5 bg-white dark:bg-gray-900",
    "bottom": `border-r border-t top-0 -mt-1.5 ${props.title ? "bg-gray-100 dark:bg-black" : "bg-white dark:bg-gray-900"}`,
  }
  const aligns = {
    "left": "text-left",
    "center": "text-center",
    "right": "text-right",
  }
  // Props ( placement, align ) 
  const addplacement = props.placement ? placements[props.placement] : 'top-auto bottom-full mb-3';
  const addcaret = props.placement ? carets[props.placement] : 'border-l border-b bottom-0 -mb-1.5 bg-white dark:bg-gray-900';
  const addalign = props.align ? aligns[props.align] : 'text-left';
  const addClass = props.className ?  `${props.className}` : 'relative';

  return (
    <div className="relative inline-block mb-3">
      <Button onClick={()=>setTogglepop(!isTogglepop)} variant={props.btn_variant} className={`${addClass}`}>{props.btn_text}</Button>

      <div className={`absolute ${addplacement} hidden ${isTogglepop ? "!block": ""}`}>
        <div className={`z-60 w-60 -mb-1 leading-tight text-gray-700 bg-white border border-gray-200 dark:text-gray-200 dark:bg-gray-900 dark:border-black rounded-lg shadow-lg ${addalign}`}>
          {props.title ?
          <div className="bg-gray-100 text-sm dark:bg-black px-4 py-2">{props.title}</div>
          : ''}
          <div className="px-4 py-3 text-sm bg-white dark:bg-gray-900">{props.description}</div>
        </div>
        <div className={`absolute transform -rotate-45 p-1 w-1 ${addcaret} border-gray-200 dark:border-black ltr:ml-6 rtl:mr-6`}></div>
      </div>

    </div>
  );
}