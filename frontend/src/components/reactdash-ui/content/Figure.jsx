import React from 'react';

export default function Figure(props) {
  const aligns = {
    "left": "lg:ltr:float-left lg:rtl:float-right ltr:ml-0 rtl:mr-0 lg:pr-6",
    "center": "w-full",
    "right": "lg:ltr:float-right lg:rtl:float-left ltr:ml-0 rtl:mr-0 lg:pl-6"
  }
  const addAlign = props.align ? aligns[props.align] : 'w-full';

  return (
    <figure className={`${addAlign} text-center mb-5`}>
      <img className="max-w-full h-auto mx-auto" src={props.img} alt={props.alt} />
      <figcaption>{props.description}</figcaption>
    </figure>
  );
}