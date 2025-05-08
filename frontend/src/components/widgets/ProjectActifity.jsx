import React from 'react';
import { Card } from "@/components/reactdash-ui";

export default function ProjectActifity(props) {
  const project_actifities = {
    title: "Latest Actifities",
    actifities: [
      { name: "Carlos Garcia", img: "/img/avatar/avatar4.png", date: "Aug 26, 2025 03.21 am",
      status: "Assigned task", task: "Create landing page design with Figma"},
      { name: "Carlos Garcia", img: "/img/avatar/avatar5.png", date: "Aug 26, 2025 03.21 am",
      status: "Completed", task: "Convert Figma footer design to HTML file"},
      { name: "John Doe", img: "/img/avatar/avatar6.png", date: "Aug 26, 2025 03.21 am",
      status: "Completed", task: "Fix bugs on Login page form"},
      { name: "Veronika Westley", img: "/img/avatar/avatar7.png", date: "Aug 26, 2025 03.21 am",
      status: "Assigned task", task: "Fix bugs on Comments form"},
      { name: "Carlos Garcia", img: "/img/avatar/avatar8.png", date: "Aug 26, 2025 03.21 am",
      status: "Completed", task: "Redesign Services page"},
      ],
      productifity: "Productifity",
  }
  const data_actifities = project_actifities.actifities;

  return (
    <Card className="h-full p-6">
      <div className="flex flex-row pb-6">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </div>
      <div className="relative">
        <ol className="h-72 overflow-y-auto scrollbars show mb-6">
          {data_actifities.map((list,index) =>
          <li key={index} className="flex mb-2">
            <div className="relative flex-shrink-0 w-12 text-center">
              <span className="absolute ltr:left-1/2 rtl:right-1/2 ltr:-ml-1 rtl:-mr-1 top-10 -bottom-4 ltr:border-l-2 rtl:border-r-2 border-dashed border-gray-200 dark:border-gray-700"></span>
              <div className="mr-auto">
                <img src={list.img} className="h-10 w-10 rounded-full border border-gray-300 bg-gray-700 dark:border-gray-200 dark:bg-gray-200" />
              </div>
            </div>

            <div className="w-full ml-4 mb-4">
              <div className="flex flex-row justify-between pb-2">
                <h4 className="text-base font-semibold">{list.name}</h4>
                <div className="text-xs text-gray-500 self-center ltr:mr-3 rtl:ml-3">{list.date}</div>
              </div>
              <p className="text-sm">{list.status} <span className="itaic font-semibold text-gray-500">"{list.task}"</span></p>
            </div>
          </li>
          )}
        </ol>
      </div>
    </Card>
  );
}