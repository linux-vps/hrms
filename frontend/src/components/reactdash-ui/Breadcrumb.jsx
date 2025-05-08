import React from 'react';
import { Link } from 'react-router-dom';

function Breadcrumb(props) {
  // data breadcrumb
  const breadcrumbLists = props.data;
  
  // colors
  const colors = {
    "light": "text-gray-300 hover:text-white",
    "dark": "text-gray-500 hover:text-indigo-500"
  }
  // props ( color, className )
  const addcolor = props.color ? colors[props.color] : 'text-gray-500 hover:text-indigo-500';
  const addClass = props.className ?  `${props.className}` : '';

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className={`breadcrumb-lists flex flex-wrap justify-start bg-transparent mb-0 space-x-2 ${props.color}`}>
        {breadcrumbLists.map( (list , index) =>
        <li key={index}>
          <Link to={list.url} className={`${addcolor} ${addClass}`}>
            {list.title}
          </Link>
        </li>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumb;