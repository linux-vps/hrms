import React from 'react';

export default function Blockquote(props) {
  const title = props.title;
  const author = props.author;
  const by = props.by ? props.by : "Quote by";
  
  return (
    <blockquote className="relative p-4 ltr:border-l-4 rtl:border-r-4 border-indigo-500 bg-gray-100 dark:bg-gray-700 mb-4 text-xl">
      <span className="absolute opacity-80 w-8 h-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.000000 270.000000"><g transform="translate(0.000000,270.000000) scale(0.100000,-0.100000)" fill="#4f46e5" stroke="none"><path d="M920 2182 c-290 -124 -482 -341 -540 -610 -30 -140 -40 -296 -40 -644 l0 -328 370 0 370 0 0 370 0 370 -181 0 -181 0 7 63 c26 243 129 387 342 477 35 15 66 29 69 32 7 7 -132 298 -143 298 -4 0 -37 -13 -73 -28z"></path><path d="M2179 2186 c-249 -103 -442 -295 -520 -516 -50 -142 -61 -247 -66 -677 l-5 -393 371 0 371 0 0 370 0 370 -181 0 -181 0 7 53 c21 170 67 281 150 363 51 49 143 107 215 134 19 7 39 17 44 21 10 9 -124 298 -139 298 -5 0 -35 -10 -66 -23z"></path></g></svg>
      </span>
      <p className="ltr:ml-16 rtl:mr-16 mb-4">{title}</p>
      <footer className="ltr:ml-16 rtl:mr-16 text-base">{by} <cite title={author}>{author}</cite></footer>
    </blockquote>
  );
}