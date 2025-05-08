import React from 'react';
import { People } from 'react-bootstrap-icons';
import { Card } from '@/components/reactdash-ui';

export default function UserOnline(props) {
  // data online
  const title = { text: "Users online", count: 280 }
  const table_title = { url: "Active pages", user: "Users"}
  const data = [
    { url: "/", user: "88"},
    { url: "/tailwind-dashboard/", user: "76"},
    { url: "/tailwind-css/", user: "38"},
    { url: "/tailwind-admin/", user: "28"},
  ]
  const footer_link = {text: "All report", url: "/"}

  return (
    <>
    <Card className="!p-0 h-full">
      <div className="pt-6 px-6 relative">
      {title.text} <span className="ltr:float-right rtl:float-left w-2 h-2 rounded-full bg-green-500 mt-1 animate-pulse"></span>
      </div>
      <div className="flex flex-row justify-between p-6">
        <div className="flex justify-center items-center w-14 h-14 rounded-full bg-indigo-50 text-indigo-700 dark:bg-gray-900 dark:bg-opacity-20 relative text-center">
          <People className="w-8 h-8" />
        </div>
        <h2 className="self-center text-3xl">{title.count}</h2>
      </div>
      <div className="px-6">
        <div className="relative">
          <table className="table-bordered-bottom table-sm w-full text-sm ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th>
                {table_title.url}
                </th>
                <th className="ltr:text-right rtl:text-left">
                {table_title.user}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) =>
              <tr key={index}>
                <td>
                  <a href={item.url} target="_blank" className="hover:text-indigo-500 hover:underline">{item.url}</a>
                </td>
                <td className="ltr:text-right rtl:text-left">
                {item.user}
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-6">
        <a className="hover:text-indigo-500" href={footer_link.url}>{footer_link.text}</a>
      </div>
    </Card>
    </>
  );
}