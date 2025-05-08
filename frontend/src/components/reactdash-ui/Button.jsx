import React from 'react';

export default function Button(props) {
  // colors button
  const colors = {
    "primary": "text-gray-100 bg-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 font-semibold",
    "secondary": "text-gray-100 bg-pink-500 border-pink-500 hover:text-white hover:bg-pink-600 hover:border-pink-600 focus:bg-pink-600 focus:border-pink-600 font-semibold",
    "success": "text-gray-100 bg-green-500 border-green-500 hover:text-white hover:bg-green-600 hover:border-green-600 focus:bg-green-600 focus:border-green-600 font-semibold",
    "warning": "text-gray-800 bg-yellow-300 border-yellow-300 hover:text-gray-900 hover:bg-yellow-400 hover:border-yellow-400 focus:bg-yellow-400 focus:border-yellow-400 font-semibold",
    "danger": "text-gray-100 bg-red-500 border-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 focus:bg-red-600 focus:border-red-600 font-semibold",
    "info": "text-gray-100 bg-cyan-500 border-cyan-500 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 focus:bg-cyan-600 focus:border-cyan-600 font-semibold",
    "light": "text-gray-800 bg-gray-100 border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 font-semibold",
    "dark": "text-gray-100 bg-gray-900 border-gray-900 hover:text-white hover:bg-black hover:border-black focus:bg-black focus:border-black font-semibold",
    "disabled": "cursor-not-allowed font-semibold",

    "twotone-primary": "text-indigo-600 hover:text-indigo-500 bg-indigo-50 border-indigo-50 hover:bg-indigo-100 hover:border-indigo-100 focus:bg-indigo-100 focus:border-indigo-100 font-semibold",
    "twotone-secondary": "text-pink-600 hover:text-pink-500 bg-pink-50 border-pink-50 hover:bg-pink-100 hover:border-pink-100 focus:bg-pink-100 focus:border-pink-100 font-semibold",
    "twotone-success": "text-green-600 hover:text-green-500 bg-green-50 border-green-50 hover:bg-green-100 hover:border-green-100 focus:bg-green-100 focus:border-green-100 font-semibold",
    "twotone-warning": "text-yellow-600 hover:text-yellow-500 bg-yellow-50 border-yellow-50 hover:bg-yellow-100 hover:border-yellow-100 focus:bg-yellow-100 focus:border-yellow-100 font-semibold",
    "twotone-danger": "text-red-600 hover:text-red-500 bg-red-50 border-red-50 hover:bg-red-100 hover:border-red-100 focus:bg-red-100 focus:border-red-100 font-semibold",
    "twotone-info": "text-cyan-600 hover:text-cyan-500 bg-cyan-50 border-cyan-50 hover:bg-cyan-100 hover:border-cyan-100 focus:bg-cyan-100 focus:border-cyan-100 font-semibold",
    "twotone-light": "text-gray-600 hover:text-gray-500 bg-gray-50 border-gray-50 hover:bg-gray-100 hover:border-gray-100 focus:bg-gray-100 focus:border-gray-100 font-semibold",
    "twotone-dark": "text-gray-50 hover:text-gray-100 bg-gray-600 border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:bg-gray-700 focus:border-gray-700 font-semibold",
    
    "outline-primary": "text-indigo-500 bg-transparent border-indigo-500 hover:text-gray-100 hover:bg-indigo-500  hover:border-indigo-500 focus:text-gray-100 focus:bg-indigo-500 focus:border-indigo-500 font-semibold",
    "outline-secondary": "text-pink-500 bg-transparent border-pink-500 hover:text-gray-100 hover:bg-pink-500  hover:border-pink-500 focus:text-gray-100 focus:bg-pink-500 focus:border-pink-500 font-semibold",
    "outline-success": "text-green-500 bg-transparent border-green-500 hover:text-gray-100 hover:bg-green-500  hover:border-green-500 focus:text-gray-100 focus:bg-green-500 focus:border-green-500 font-semibold",
    "outline-warning": "text-yellow-500 bg-transparent border-yellow-500 hover:text-gray-100 hover:bg-yellow-500  hover:border-yellow-500 focus:text-gray-100 focus:bg-yellow-500 focus:border-yellow-500 font-semibold",
    "outline-danger": "text-red-500 bg-transparent border-red-500 hover:text-gray-100 hover:bg-red-500  hover:border-red-500 focus:text-gray-100 focus:bg-red-500 focus:border-red-500 font-semibold",
    "outline-info": "text-cyan-500 bg-transparent border-cyan-500 hover:text-gray-100 hover:bg-cyan-500  hover:border-cyan-500 focus:text-gray-100 focus:bg-cyan-500 focus:border-cyan-500 font-semibold",
    "outline-light": "text-gray-100 bg-transparent border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:border-gray-200 focus:text-gray-900 focus:bg-gray-200 focus:border-gray-200 font-semibold",
    "outline-dark": "text-gray-900 bg-transparent border-gray-900 hover:text-white hover:bg-black hover:border-black focus:text-white focus:bg-black focus:border-black font-semibold",
    
    "gradient-primary": "text-gray-100 bg-indigo-500 border-indigo-500 bg-gradient-to-b from-indigo-400 to-indigo-600  hover:from-indigo-500 hover:to-indigo-600 focus:from-indigo-400 focus:to-indigo-600 hover:text-white  hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 font-semibold",
    "gradient-secondary": "text-gray-100 bg-pink-500 border-pink-500 bg-gradient-to-b from-pink-400 to-pink-600  hover:from-pink-500 hover:to-pink-600 focus:from-pink-400 focus:to-pink-600 hover:text-white  hover:border-pink-600 focus:bg-pink-600 focus:border-pink-600 font-semibold",
    "gradient-success": "text-gray-100 bg-green-500 border-green-500 bg-gradient-to-b from-green-400 to-green-600  hover:from-green-500 hover:to-green-600 focus:from-green-400 focus:to-green-600 hover:text-white  hover:border-green-600 focus:bg-green-600 focus:border-green-600 font-semibold",
    "gradient-warning": "text-gray-100 bg-yellow-500 border-yellow-500 bg-gradient-to-b from-yellow-400 to-yellow-600  hover:from-yellow-500 hover:to-yellow-600 focus:from-yellow-400 focus:to-yellow-600 hover:text-white  hover:border-yellow-600 focus:bg-yellow-600 focus:border-yellow-600 font-semibold",
    "gradient-danger": "text-gray-100 bg-red-500 border-red-500 bg-gradient-to-b from-red-400 to-red-600  hover:from-red-500 hover:to-red-600 focus:from-red-400 focus:to-red-600 hover:text-white  hover:border-red-600 focus:bg-red-600 focus:border-red-600 font-semibold",
    "gradient-info": "text-gray-100 bg-cyan-500 border-cyan-500 bg-gradient-to-b from-cyan-400 to-cyan-600  hover:from-cyan-500 hover:to-cyan-600 focus:from-cyan-400 focus:to-cyan-600 hover:text-white  hover:border-cyan-600 focus:bg-cyan-600 focus:border-cyan-600 font-semibold",
    "gradient-light": "text-gray-800 bg-gray-100 border-gray-100 bg-gradient-to-b from-gray-100 to-gray-300 hover:from-gray-300 hover:to-gray-100 focus:from-gray-300 focus:to-gray-100 hover:text-gray-900 hover:bg-gray-200  hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 font-semibold",
    "gradient-dark": "text-gray-100 bg-gray-700 border-gray-800 bg-gradient-to-b from-gray-600 to-gray-800  hover:from-gray-800 hover:to-black focus:from-gray-800 focus:to-black hover:text-white hover:border-black focus:bg-black focus:border-black font-semibold",
  }
  // shapes
  const shapes = {
    "rounded": "rounded",
    "square": "rounded-none",
    "pill": "rounded-3xl",
    "circle": "rounded-full !p-2.5"
  }
  const sizes = {
    "small": "py-1 px-2.5 text-sm",
    "medium": "py-2 px-4",
    "large": "py-3 px-6",
  }
  const types = {
    "button": "button",
    "submit": "submit"
  }
  // Props ( color, size, className, onClick )
  const addcolor = props.color ? colors[props.color] : 'text-gray-100 bg-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600';
  const addSize = props.size ? sizes[props.size] : 'py-2 px-4';
  const addshape = props.shape ? shapes[props.shape] : 'rounded';
  const addtype = props.type ? types[props.type] : 'button';
  const addClass = props.className ?  `${props.className} ` : '';
  const typeClick = props.onClick;
  return (
    <>
    {typeClick ?
    <button onClick={props.onClick} className={`${addClass}inline-block text-center border leading-5 hover:ring-0 focus:outline-none focus:ring-0 ${addSize} ${addcolor} ${addshape}`} type={`${addtype}`}>
      {props.children}
    </button>
    :
    <button className={`${addClass}inline-block text-center border leading-5 hover:ring-0 focus:outline-none focus:ring-0 ${addSize} ${addcolor} ${addshape}`} type={`${addtype}`}>
      {props.children}
    </button>
    }
    </>
  );
}