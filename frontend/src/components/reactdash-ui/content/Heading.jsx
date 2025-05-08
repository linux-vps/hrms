import React from 'react';

export default function Heading(props) {
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <>
      {props.variant === "h1" ?
      <h1 className={`text-4xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h1>
      : props.variant === "h2" ?
      <h2 className={`text-3xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h2>
      : props.variant === "h3" ?
      <h3 className={`text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h3>
      : props.variant === "h4" ?
      <h4 className={`text-xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h4>
      : props.variant === "h5" ?
      <h5 className={`text-lg leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h5>
      : props.variant === "h6" ?
      <h6 className={`text-base leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300${addClass}`}>{props.children}</h6>
      : ''}
      </>
  );
}