import React from 'react';

// column
export default function Column(props) {
  // props ( className )
  const addClass = props.className ?  `${props.className}` : '';
  
  return (
    <div className={`flex-shrink max-w-full ${addClass}`}>
      {props.children}
    </div>
  );
}