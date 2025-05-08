import React from 'react';

export default function Avatar(props) {
  // avatar
  const avatar = props.data;
  // shapes
  const shapes = {
    "rounded": "rounded-lg",
    "square": "rounded-none",
    "circle": "rounded-full"
  }
  // avatar size
  const sizes = {
    "x-small": "w-8 h-8",
    "small": "w-12 h-12",
    "medium": "w-20 h-20",
    "large": "w-32 h-32",
  }
  // props ( shape, size, className )
  const addshape = props.shape ? shapes[props.shape] : 'rounded-full';
  const addSize = props.size ? sizes[props.size] : 'w-20 h-20';
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <>
      <img src={avatar.img} alt={avatar.name} className={`inline-block max-w-full bg-gray-300 dark:bg-gray-800 ${addSize} ${addshape}${addClass}`} />
    </>
  );
}