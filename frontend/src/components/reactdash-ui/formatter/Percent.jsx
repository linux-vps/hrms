import React from 'react';

export default function Percent(props) {
  const number = props.data;

  return (
    <>
      {number.toFixed(0) + '%'}
    </>
  );
}