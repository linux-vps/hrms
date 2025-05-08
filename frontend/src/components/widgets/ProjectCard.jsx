import React from "react";
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Card, AvatarGroup, Progress } from "@/components/reactdash-ui";

export default function ProjectCard(props) {
  const projects = { name: "Web Development", img: "/img/brand/brand2.jpg", 
    description: "Creating a website redesign project plan is vital to making your redesign go smoothly.There’s who you think your customers are, who you want your customers to be.", 
    progress: "On Progress", due: "15-11-2022", more: "More", more_url: "/", done: 12, target: 25, edit: "Edit", delete: "Delete",
    member: [
      {id: 1, name: "Antony", url: "/", img: "/img/avatar/avatar.png"},
      {id: 2, name: "Ramon", url: "/", img: "/img/avatar/avatar2.png"},
      {id: 3, name: "Renand", url: "/", img: "/img/avatar/avatar3.png"},
      {id: 4, name: "James", url: "/", img: "/img/avatar/avatar4.png"},
      {id: 5, name: "Rocky", url: "/", img: "/img/avatar/avatar5.png"},
    ],
    task: [
      {name: "Front End", color:"success"},
      {name: "UI/UX", color:"danger"},
      {name: "Web", color:"info"},
      {name: "Html", color:"warning"}
    ]
  }

  const member = projects.member;
  const tasks = projects.task;
  const show_user = 4;
  const more_user = member.length - show_user;
  const progress_percent = (projects.done/projects.target) * 100;
  const status_color = projects.progress === "On Progress" ? "text-yellow-700 bg-yellow-200" : projects.progress === "Complete" ? "text-green-700 bg-green-200" : "text-gray-700 bg-gray-100";

  return (
    <Card className="mb-6 h-full">
      <div className="flex flex-row justify-between pb-4">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{projects.name}</h3>
        </div>
        <Menu as="div" className="relative">
          <MenuButton className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
            <ThreeDots className="w-6 h-6" />
          </MenuButton>
          <MenuItems as="div" className="min-w-12 origin-top-right absolute ltr:right-0 rtl:left-0 rounded rounded-t-non bg-white dark:bg-gray-800 z-10 border border-gray-200 dark:border-gray-700">
          <a className="block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900" href="#">{projects.edit}</a>
            <a className="block px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900 dark:hover:bg-opacity-20 dark:focus:bg-gray-900" href="#">{projects.delete}</a>
          </MenuItems>
        </Menu>
      </div>

      <div className="flex flex-col pb-4">
        <div className="flex flex-row items-center">
          <img src={projects.img} className="w-20 h-auto max-w-full ltr:mr-3 rtl:ml-3" />
          <p className="text-sm text-gray-500">{projects.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 flex items-center font-semibold text-xs rounded ${status_color}`}>{projects.progress}</span>
        <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-red-400 border border-red-400  bg-white">Due: {projects.due}</span>
      </div>

      <div className="relative mb-4">
        <AvatarGroup data={member} size="small" count={show_user} />
        <a href={projects.more_url}>
          <span className="ltr:ml-5 rtl:mr-5 text-sm text-gray-500 font-semibold self-center">{more_user} {projects.more}</span>
        </a>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full mt-2">
        <Progress percent={progress_percent} model="horizontal" color="success" />
      </div>

      <div className="flex justify-between mt-3">
        <div>
          <span className="text-sm inline-block text-gray-500 dark:text-gray-100">Task done : <span className="text-gray-700 dark:text-white font-bold">{projects.done}</span>/{projects.target}</span>
        </div>
        <div>
          {tasks.map((task, index) =>
          <span key={index} className="px-2 py-1 mr-2 text-xs rounded font-semibold bg-gray-100 text-gray-500">{task.name}</span>
          )}
        </div>
      </div>
    </Card>
  );
}