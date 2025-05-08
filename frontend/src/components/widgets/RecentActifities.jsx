import React from 'react';
import TimeAgo from 'react-timeago';
import { Avatar, Card } from '@/components/reactdash-ui';

export default function RecentActifities(props) {
  const data_actifity = [
    { id: 1, name: "Daniel", img: "/img/avatar/avatar.png", title:"Assigned Task Redesign Homepage", url:"/", time: '2022-06-09T23:50:21.817Z' },
    { id: 2, name: "Carlos", img: "/img/avatar/avatar2.png", title:"Completed Task Fix Javascript bug", url:"/", time: '2022-07-09T23:50:21.817Z' },
    { id: 3, name: "David", img: "/img/avatar/avatar3.png", title:"Completed Task Build Sidebar", url:"/", time: '2022-08-09T23:50:21.817Z' },
    { id: 4, name: "Roman", img: "/img/avatar/avatar4.png", title:"Completed Task Build Navbar", url:"/", time: '2022-09-09T23:50:21.817Z' },
    { id: 5, name: "John", img: "/img/avatar/avatar5.png", title:"Completed Task Fix dropdown", url:"/", time: '2022-10-09T23:50:21.817Z' },
  ]
  return (
    <Card>
      <div className="flex flex-row justify-between pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <ol className="h-80 overflow-y-auto scrollbars show mb-6">
          {data_actifity.sort((a, b) => b.id - a.id).map( (item, index) => {
            const avatar = {name: item.name, img: item.img }
          return(
          <li key={index} className="flex">
            <div className="relative flex-shrink-0 w-12 text-center">
              <span className="absolute ltr:left-1/2 ltr:-ml-1 rtl:right-1/2 rtl:-mr-1 top-10 -bottom-4 ltr:border-l-2 rtl:border-r-2 border-dashed border-gray-200 dark:border-gray-700"></span>
              <div className="ltr:mr-auto rtl:ml-auto">
                <Avatar data={avatar} size="small" />
              </div>
            </div>

            <div className="ltr:ml-4 rtl:mr-4 mb-4">
              <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-col self-center">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-300">{item.name}</h3>
                </div>
                <div className="text-xs text-gray-500 self-center ltr:mr-3 rtl:ml-3"><TimeAgo date={item.time} /></div>
              </div>
              <p className="text-sm">{item.title}</p>
            </div>
          </li>
          )})}
        </ol>
      </div>
    </Card>
  );
}