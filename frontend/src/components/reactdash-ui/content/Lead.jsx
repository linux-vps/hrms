import React from 'react';

export default function Lead(props) {
  return (
    <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{props.children}</p>
  );
}