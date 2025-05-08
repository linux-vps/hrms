import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Row, Card } from '@/components/reactdash-ui';

export default function PopularPages( props ) {
  const title_text = { url: "Page url", views: "Views" }
  // data 
  const data1 = [
    {url: "/", views: 2234},
    {url: "/tailwind-css/", views: 1789},
    {url: "/tailwind-dashboard/", views: 1546},
    {url: "/react-dashboard/", views: 1254},
    {url: "/html/", views: 986},
    {url: "/javascript/", views: 876},
    {url: "/react/", views: 568},
    {url: "/next-js/", views: 378},
  ]
  const data2 = [
    {url: "/", views: 2134},
    {url: "/bootstrap/-5", views: 1489},
    {url: "/programmer/", views: 1246},
    {url: "/front-end/", views: 1454},
    {url: "/html/", views: 786},
    {url: "/javascript/", views: 676},
    {url: "/react/", views: 468},
    {url: "/react-dom/", views: 278},
  ]

  const [isData, setData] = useState(data1);
  const [isActive, setActive] = useState(1);

  // change value
  const updateValue = () => {
    setData(data2);
    setActive(2);
  };
  // reset value
  const resetValue = () => {
    setData(data1);
    setActive(1);
  };
  // text info
  const text_dropdown = {one: "Last month", two: "This month"}

  return (
    <Card className="h-full">
      <Row className="justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
        
        {/* dropdown filter  */}
        <Menu as="div" className="relative">
          <MenuButton className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
            <ThreeDots className="w-6 h-6" />
          </MenuButton>
          <MenuItems as="div" className="min-w-12 origin-top-right absolute ltr:right-0 rtl:left-0 rounded rounded-t-non bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700">
            <button onClick={resetValue} className={`${isActive === 1 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.two}</button>
            <button onClick={updateValue} className={`${isActive === 2 ? 'bg-gray-100 dark:bg-gray-900 ' : '' }w-full block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900`}>{text_dropdown.one}</button>
          </MenuItems>
        </Menu>
      </Row>

      <div className="relative">
        <table className="table-sm table-bordered-bottom w-full text-sm ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="thead-light">
            <tr>
              <th>
                {title_text.url}
              </th>
              <th className="ltr:text-right rtl:text-left">
                {title_text.views}
              </th>
            </tr>
          </thead>
          <tbody>
            {isData.map(( item, index ) =>
            <tr key={index}>
              <td>
                <a href={item.url} target="_blank" className="text-gray-500 hover:text-indigo-500 hover:underline">{item.url}</a>
              </td>
              <td className="ltr:text-right rtl:text-left">
              {item.views}
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}