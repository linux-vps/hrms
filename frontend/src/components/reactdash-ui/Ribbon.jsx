import React from 'react';

export default function Ribbon(props) {
  // colors
  const colors = {
    "primary": "text-gray-100 bg-indigo-500",
    "secondary": "text-gray-100 bg-pink-500",
    "success": "text-gray-100 bg-green-500",
    "warning": "text-gray-800 bg-yellow-300",
    "danger": "text-gray-100 bg-red-500",
    "info": "text-gray-100 bg-cyan-500",
    "light": "text-gray-800 bg-gray-100",
    "dark": "text-gray-100 bg-gray-900",
    "outline-primary": "text-indigo-800 bg-indigo-50",
    "outline-secondary": "text-pink-800 bg-pink-50",
    "outline-success": "text-green-800 bg-green-50",
    "outline-warning": "text-yellow-800 bg-yellow-50",
    "outline-danger": "text-red-800 bg-red-50",
    "outline-info": "text-cyan-800 bg-cyan-50",
    "outline-light": "text-gray-800 bg-gray-50",
    "outline-dark": "text-gray-900 bg-gray-500",
    "gradient-primary": "text-gray-100 bg-indigo-500 bg-gradient-to-b from-indigo-400 to-indigo-600",
    "gradient-secondary": "text-gray-100 bg-pink-500 bg-gradient-to-b from-pink-400 to-pink-600",
    "gradient-success": "text-gray-100 bg-green-500 bg-gradient-to-b from-green-400 to-green-600",
    "gradient-warning": "text-gray-100 bg-yellow-500 bg-gradient-to-b from-yellow-400 to-yellow-600",
    "gradient-danger": "text-gray-100 bg-red-500 bg-gradient-to-b from-red-400 to-red-600",
    "gradient-info": "text-gray-100 bg-cyan-500 bg-gradient-to-b from-cyan-400 to-cyan-600",
    "gradient-light": "text-gray-800 bg-gray-100 bg-gradient-to-b from-gray-100 to-gray-300",
    "gradient-dark": "text-gray-100 bg-gray-700 bg-gradient-to-b from-gray-600 to-gray-800",
  }
  // placement
  const placements = {
    "left": "ltr:left-0 ltr:text-left rtl:right-0 rtl:text-right ltr:rounded-r rtl:rounded-l overflow-hidden",
    "right": "ltr:right-0 ltr:text-right rtl:left-0 rtl:text-left ltr:rounded-l rtl:rounded-r overflow-hidden",
  }
  
  // default props ( color, placement, className )
  const addcolor = props.color ? colors[props.color] : 'text-gray-100 bg-indigo-500';
  const addplacement = props.placement ? placements[props.placement] : 'ltr:right-0 ltr:text-right rtl:left-0 rtl:text-left ltr:rounded-l rtl:rounded-r overflow-hidden';
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <div className={`absolute top-4 text-sm ${addplacement}${addClass}`}>
      <span className={`px-4 py-2 block align-center shadow ${addcolor}`}>
        {props.children}
      </span>
    </div>
  );
}