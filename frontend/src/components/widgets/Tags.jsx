import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/reactdash-ui';

export default function Tags( props ) {
  // Data Tags ( props.data )
  const tagitems = [
    { title: 'Taildash', url: '/' },
    { title: 'Tailwind Css', url: '/' },
    { title: 'Alpine Js', url: '/' },
    { title: 'Tailpro', url: '/' },
    { title: 'Html', url: '/' },
    { title: 'CSS', url: '/' },
    { title: 'Javascript', url: '/' },
  ]

  return (
    <>
    <Card className="h-full">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div>
      <div className="relative w-full text-sm">
      {tagitems.map( (tagitem, index) =>
        <Link to={tagitem.url} key={index} className="inline-block py-1.5 px-3 ltr:mr-2 rtl:ml-2 mb-3 border bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:bg-opacity-40 dark:hover:bg-opacity-90 dark:border-gray-700">{tagitem.title}</Link>
      )}
      </div>
    </Card>
    </>
  );
}