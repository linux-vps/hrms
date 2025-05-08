import React from 'react';
import { Avatar, Currency, ProgressSmall } from  "@/components/reactdash-ui";

function SalesLeaderboard(props) {
  // data table
  const table_title = {rank: "Rank", name: "Name", percent: "Progress",sales: "Sales",revenue: "Revenue", profit: "Profit"}
  const data_table = [
    {rank: 1, name: "John Thomas", img: "/img/avatar/avatar2.png", sales: 310, target: 250, revenue: 3600, profit: 560},
    {rank: 2, name: "Carlos Garcia", img: "/img/avatar/avatar3.png", sales: 290, target: 250, revenue: 3200, profit: 430},
    {rank: 3, name: "Daniel Esteban", img: "/img/avatar/avatar4.png", sales: 170, target: 250, revenue: 2800, profit: 360},
    {rank: 4, name: "Steven Rey", img: "/img/avatar/avatar5.png", sales: 160, target: 250, revenue: 2600, profit: 310},
    {rank: 5, name: "Roman Davis", img: "/img/avatar/avatar6.png", sales: 120, target: 250, revenue: 1900, profit: 260}
  ]
  const target_text = "Target";
  const achieved_text = "achieved";
  const not_reached_text = "not reached";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="table-bordered-bottom table-sm w-full ltr:text-left rtl:text-right text-sm">
            <thead>
              <tr>
                <th className="hidden lg:block">{table_title.rank}</th>
                <th>{table_title.name}</th>
                <th>{table_title.percent}</th>
                <th>{table_title.sales}</th>
                <th>{table_title.revenue}</th>
                <th>{table_title.profit}</th>
              </tr>
            </thead>
            <tbody>
              {data_table.map((list, index) => {
              const data_avatar = {img:list.img, name:list.name}
              const percent = ( list.sales / list.target ) * 100;
              return(
              <tr key={index}>
                <td className="hidden lg:table-cell">
                  <div>#{list.rank}</div>
                </td>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <Avatar data={data_avatar} size="small"/>
                    <div className="lg:ml-4">
                      <div className="font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full mb-1">
                        {list.name}
                      </div>
                      <div className="italic text-gray-500 flex-shrink max-w-full">
                        {target_text}: {list.target} {percent > 100 ? <span className="text-green-500">{achieved_text}</span> : <span className="text-pink-500">{not_reached_text}</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <ProgressSmall data={percent} />
                </td>
                <td>
                  {list.sales}
                </td>
                <td>
                <Currency data={list.revenue} />
                </td>
                <td>
                <Currency data={list.profit} />
                </td>
              </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesLeaderboard;