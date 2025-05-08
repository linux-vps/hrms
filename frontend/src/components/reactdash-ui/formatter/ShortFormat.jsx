import React from 'react';

export default function ShortFormat(props) {
  const number = props.data;

  return (
    <>
      { number >= 1000000000 ?
        (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
      : number >= 1000000 ?
        (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      : number >= 1000 ?
        (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      :
        number
      }
    </>
  );
}