import React from 'react';

export default function ButtonGroup(props) {
  // group style
  const directions = {
    "vertical": "btn-group-vertical flex-col",
    "horizontal": "btn-group-horizontal flex-row",
  }
  // Props ( direction, className )
  const adddirection = props.direction ? directions[props.direction] : 'btn-group-horizontal inline-flex flex-row';
  const addClass = props.className ?  `${props.className}` : '';

  return (
    <div className={`inline-flex ${adddirection} ${addClass}`}>
      {props.children}
    </div>
  );
}