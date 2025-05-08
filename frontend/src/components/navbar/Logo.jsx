import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  const colors = {
    "dark": "text-gray-700",
    "light": "text-gray-200",
    "dark_light": "text-gray-700 dark:text-gray-200",
    "light_dark": "text-gray-200 dark:text-gray-700",
  }
  const addcolor = props.color ? colors[props.color] : 'text-gray-700';
  const addClass = props.className ?  `${props.className}` : '';

  const logo = {img:"/img/logo.png", text: "Reactdash", url: "/"}
  
  return (
    <div className={`text-center ${addClass}`}>
      <Link className="py-2 text-2xl" to={logo.url}>
        <h2 className="text-2xl font-semibold max-h-9 flex items-center">
          <img src={logo.img} className="inline-block w-8 h-8 ltr:mr-2 rtl:ml-2 -mt-1" />
          <span className={`${addcolor}`}>{logo.text}</span>
        </h2>
      </Link>
    </div>
  );
}