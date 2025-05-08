import React from 'react';

export default function Display(props) {
  const sizes = {
    "1": "text-8xl",
    "2": "text-7xl",
    "3": "text-6xl",
    "4": "text-5xl",
  }
  const addSize = props.size ? sizes[props.size] : 'text-5xl';

  return (
    <>
      {props.variant === "h1" ?
      <h1 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h1>
      : props.variant === "h2" ?
      <h2 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h2>
      : props.variant === "h3" ?
      <h3 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h3>
      : props.variant === "h4" ?
      <h4 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h4>
      : props.variant === "h5" ?
      <h5 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h5>
      : props.variant === "h6" ?
      <h6 className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</h6>
      : 
      <p className={`${addSize} mb-6 font-normal text-gray-800 dark:text-gray-300`}>{props.children}</p>
      }
      </>
  );
}