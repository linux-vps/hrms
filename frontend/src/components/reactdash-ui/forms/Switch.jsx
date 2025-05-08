import React, { useState } from "react";

export default function Switch({ checked, ...props }){
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const onChange = props.onChange;
  const onChecked = checked ? checked : isChecked ;
  const addClass = props.className ?  `${props.className} ` : '';
  const margin_bottom = props.label ? "inline-block mb-1" : 'mb-1';

  return (
    <div className={`${addClass}relative`}>
      <label htmlFor={`parent${props.id}`} className={`${margin_bottom}`}>{props.label}</label>

      <div id={`parent${props.id}`} className="relative w-8 py-3">
        {onChange ? 
        <input
          type="checkbox"
          name={props.name}
          id={props.id}
          value={props.value}
          checked={onChecked}
          onChange={onChange}
          className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-gray-700 border-2 dark:border-gray-700 appearance-none cursor-pointer"
        />
        :
        <input
          type="checkbox"
          name={props.name}
          id={props.id}
          value={props.value}
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-gray-700 border-2 dark:border-gray-700 appearance-none cursor-pointer"
        />
        }
        <label htmlFor={props.id} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-900 cursor-pointer"></label>
      </div>
    </div>
  );
}