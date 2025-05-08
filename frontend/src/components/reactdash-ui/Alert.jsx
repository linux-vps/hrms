import  React, { useState } from 'react';
import { XCircle } from 'react-bootstrap-icons';

export default function Alert(props) {
  // close alert
  const [isOpen, setOpen] = useState(false);

  // Alert colors
  const colors = {
    "primary": "bg-gray-200 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100",
    "secondary": "bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100",
    "success": "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
    "warning": "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100",
    "danger": "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100",
    "info": "bg-cyan-200 text-gray-900 dark:bg-cyan-900 dark:text-cyan-100",
    "light": "bg-gray-50 text-gray-900",
    "dark": "bg-gray-500 text-gray-100",
  }
  // props ( color, className )
  const addcolor = props.color ? colors[props.color] : 'bg-gray-50 text-gray-900';
  const addClass = props.className ?  `${props.className}` : '';
  
  return (
    <div className={`flex justify-between items-center relative py-3 px-6 rounded mb-4 ${isOpen ? "hidden": ""} ${addcolor} ${addClass}`}>
      <div>{props.children}</div>
      <button onClick = {()=>setOpen(!isOpen)}>
        <XCircle className="hover:text-red-500"/>
      </button>
    </div>
  );
}