import React from 'react';

export default function Spinner(props) {
  // model
  const model = props.model;
  // colors
  const colors = {
    "primary": "text-indigo-500",
    "secondary": "text-pink-500",
    "success": "text-green-500",
    "warning": "text-yellow-500",
    "danger": "text-red-500",
    "info": "text-cyan-500",
    "light": "text-gray-500",
    "dark": "text-gray-900",
  }
  const addcolor = props.color ? colors[props.color] : 'text-indigo-500';
  // bg color
  const colors_bg = {
    "primary": "bg-indigo-500",
    "secondary": "bg-pink-500",
    "success": "bg-green-500",
    "warning": "bg-yellow-500",
    "danger": "bg-red-500",
    "info": "bg-cyan-500",
    "light": "bg-gray-500",
    "dark": "bg-gray-900",
  }
  // size
  const sizes = {
    "x-small": "h-3 w-3",
    "small": "h-5 w-5",
    "medium": "h-8 w-8",
    "large": "h-20 w-20",
  }
  // Props ( color, size, className, model )
  const addcolorbg = props.color ? colors_bg[props.color] : 'bg-indigo-500';
  const addSize = props.size ? sizes[props.size] : 'h-8 w-8';
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <>
    { model === "ping" ?
      <div className={`inline-block${addClass}`}>
        <span className={`relative flex ${addSize}`}>
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${addcolorbg}`}></span>
          <span className={`relative inline-flex rounded-full ${addSize} ${addcolorbg}`}></span>
        </span>
      </div>
      :
      <div className={`inline-block${addClass}`}>
        <svg className={`animate-spin ${addSize} ${addcolor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      }
    </>
  );
}