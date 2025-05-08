import React from 'react';

export default function Tooltip(props) {
  // Props ( placement )
  const placement = props.placement ? props.placement : 'top';
  const addClass = props.className ?  `${props.className}` : '';

  return (
    <>
      <div className="relative inline-block" aria-label={props.title} data-microtip-position={placement} role="tooltip">
        <div className={`relative ${addClass}`}>{props.children}</div>
      </div>
    </>
  );
}