import React from 'react';

export default function Paragraph(props) {
  const aligns = {
    "left": "text-left",
    "center": "text-center",
    "right": "text-right",
    "justify": "text-justify"
  }
  const addAlign = props.align ? aligns[props.align] : '';

  return (
    <p className={`${addAlign} mb-4`}>{props.children}</p>
  );
}