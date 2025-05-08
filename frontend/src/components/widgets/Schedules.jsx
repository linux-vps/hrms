import React from 'react';
import { CalendarWeek } from 'react-bootstrap-icons';

export default function Schedules(props) {
  const list_event = [
    {img: "/img/avatar/avatar2.png", title: "Meeting with Mr Daniel", date: "Aug 17, 2025 02.21 am"},
    {img: "/img/avatar/avatar3.png", title: "Meeting with Mr Davis", date: "Aug 18, 2025 02.21 am"},
    {img: "/img/avatar/avatar4.png", title: "Meeting with Mr Roman", date: "Aug 19, 2025 02.21 am"},
    {img: "/img/avatar/avatar5.png", title: "Meeting with Mr Son", date: "Aug 20, 2025 02.21 am"},
    {img: "/img/avatar/avatar6.png", title: "Meeting with Mr Njoma", date: "Aug 21, 2025 02.21 am"},
    {img: "/img/avatar/avatar7.png", title: "Meeting with Mr Michael", date: "Aug 22, 2025 02.21 am"},
    {img: "/img/avatar/avatar.png", title: "Meeting with Mr Renan", date: "Aug 23, 2025 02.21 am"},
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-4">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div> 
      </div>
      <div className="relative">
        <ol className="h-72 overflow-y-auto scrollbars show mb-6">
          {/* list event  */}
          {list_event.map((event, index) =>
          <li key={index} className="flex mb-2">
            <div className="relative flex-shrink-0 w-12 text-center">
              <span className="absolute ltr:left-1/2 ltr:-ml-1 top-10 -bottom-4 ltr:border-l-2 rtl:right-1/2 rtl:-mr-1 rtl:border-r-2 border-dashed border-gray-200 dark:border-gray-700"></span>
              <div className="ltr:mr-auto rtl:ml-auto">
                <img src={event.img} className="h-10 w-10 rounded-full border border-gray-700 bg-gray-700 dark:border-gray-200 dark:bg-gray-200" />
              </div>
            </div>

            <div className="ltr:ml-4 rtl:mr-4 mb-4">
              <div className="flex flex-row justify-between pb-2">
                <div className="text-xs text-gray-500 self-center mr-3">
                  <CalendarWeek className="inline ltr:mr-1 rtl:ml-1" />
                  {event.date}
                </div>
              </div>
              <p className="text-sm">{event.title}</p>
            </div>
          </li>
          )}
        </ol>
      </div>
    </div>
  );
}