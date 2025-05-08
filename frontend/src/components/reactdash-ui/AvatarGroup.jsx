import React from 'react';
import { Link } from 'react-router-dom';

export default function AvatarGroup(props) {
  // Data Users
  const datauser = props.data;
  const userlists = [...datauser].sort((a, b) => b.id - a.id);
  const counts = props.count ? props.count : '5';

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
  // props ( shape, className )
  const addshape = props.shape ? shapes[props.shape] : 'rounded-full';
  const addSize = props.size ? sizes[props.size] : 'w-12 h-12';
  const addClass = props.className ?  ` ${props.className}` : '';
  
  return (
    <>
      {userlists.slice(0, counts ).map((userlist,index) =>
        <Link to={userlist.url} key={index}>
          <img src={userlist.img} alt={userlist.name} className={`inline-block shadow-xl max-w-full ltr:-mr-4 rtl:-ml-4 border-2 border-gray-200 bg-gray-300 dark:bg-gray-900 dark:border-gray-700 transform hover:-translate-y-1 ${addSize} ${addshape}${addClass}`} />
        </Link>
      )}
    </>
  );
}