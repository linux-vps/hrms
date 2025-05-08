import React from 'react';

export default function InputColor(props) {
  const addClass = props.className ?  `${props.className} ` : '';

  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="block mb-2">{props.label}</label>
      <input
        type="color"
        aria-label={props.label}
        id={props.id}
        name={props.name}
        value={props.value}
        className={`${addClass}leading-5 relative w-10 h-10 text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600`}
        disabled={props.disabled}
        readOnly={props.readOnly}
        required={props.required}
      />
    </div>
  );
}