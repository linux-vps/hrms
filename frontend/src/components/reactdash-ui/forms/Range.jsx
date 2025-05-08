import React from 'react';

export default function Range(props ) {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="inline-block">{props.label}</label>
      <input
        type="range"
        aria-label={props.label}
        id={props.id}
        name={props.name}
        value={props.value}
        className="w-full h-6 py-1 bg-transparent focus:outline-none focus:ring-0"
      />
      <span className="block clear-both"></span>
    </div>
  );
}