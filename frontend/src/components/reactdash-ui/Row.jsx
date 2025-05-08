import React from 'react';

// flex row
export default function Row(props) {
  // Props ( className )
  const addClass = props.className ?  `${props.className}` : '';
  
  return (
    <div className={`flex flex-wrap flex-row ${addClass}`}>
      {props.children}
    </div>
  );
}