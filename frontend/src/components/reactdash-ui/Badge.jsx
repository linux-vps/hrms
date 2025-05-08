import React from 'react';

export default function Badge(props) {
  // shapes
  const shapes = {
    "rounded": "rounded",
    "square": "rounded-none",
    "pill": "rounded-xl"
  }
  // colors
  const colors = {
    "primary": "bg-indigo-500 text-gray-100",
    "secondary": "bg-pink-500 text-gray-100",
    "success": "bg-green-500 text-gray-100",
    "info": "bg-cyan-500 text-gray-100",
    "warning": "bg-yellow-300 text-gray-800",
    "danger": "bg-red-500 text-gray-100",
    "light": "bg-gray-100 text-gray-900",
    "dark": "bg-black text-gray-100",
  }
  // props ( shape, color, className )
  const addshape = props.shape ? shapes[props.shape] : 'rounded';
  const addcolor = props.color ? colors[props.color] : 'bg-gray-100 text-gray-900';
  const addClass = props.className ?  `${props.className}` : '';

  return (
    <span className={`inline-block leading-none text-center py-1 px-2 font-bold text-small ${addcolor} ${addshape} ${addClass}`}>
      {props.children}
    </span>
  );
}