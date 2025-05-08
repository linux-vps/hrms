import React from 'react';

export default function Currency(props) {
  const number = props.data;

  return (
    <>
      { number.toLocaleString("en-US", {style:"currency", currency:"USD", maximumFractionDigits: 0})}
    </>
  );
}