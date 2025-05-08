import React from 'react';

export default function Lists(props) {
  return (
    <>
    {props.variant === "ol" ?
    <ol className="list-decimal list-inside ltr:pl-8 rtl:pr-8 my-2">
      {props.children}
    </ol>
    :
    <ul className="list-disc list-inside ltr:pl-8 rtl:pr-8 my-2">
      {props.children}
    </ul>
    }
    </>
  );
}