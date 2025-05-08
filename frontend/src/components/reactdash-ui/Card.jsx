import React from 'react';
// Card
export default function Card(props) {
  // Props className
  const addClass = props.className ?  `${props.className}` : '';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-indigo-300/10 p-6 ${addClass}`}>
      {props.children}
    </div>
  );
}