import React from 'react';
import { Camera } from 'react-bootstrap-icons';
import { Button } from '@/components/reactdash-ui';

export default function ProfileCard(props) {
  const profile_text = {
    edit: "Edit cover", bg: "Background cover", change: "Change avatar",
    project: "Projects", team: "Team", task: "Tasks"
  }
  const profile = {
    name: "Ari Budin",
    img: "/img/avatar/avatar.png",
    cover: "/img/blog/bg.jpg",
    short: "Hello, i'm professional front end developer!",
    project: 12,
    team: 5,
    task: 124,
    target: 200
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
      <div className="group h-40 overflow-hidden relative">
        <img src={profile.cover} alt={profile_text.bg} className="w-full" />
        <div className="absolute top-4 ltr:right-4 rtl:left-4">
          <Button color="light" className="group-hover:opacity-80 opacity-0">
            {profile_text.edit} <Camera className="inline-block" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center -mt-10 relative">
        <a className="z-30 group" href="#">
          <img src={profile.img} alt={profile.name} className="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3" />
          <div title={profile_text.change} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white dark:text-gray-900">
            <Camera className="w-6 h-6" />
          </div>
        </a>
      </div>
      <div className="text-center px-3 pb-6 pt-2">
          <h3 className="text-gray-800 dark:text-gray-100 font-bold text-lg">{profile.name}</h3>
          <p className="mt-2 font-light">{profile.short}</p>
      </div>
      <div className="flex justify-center pb-6">
        <div className="text-center px-2.5">
          <p className="text-gray-500">{profile.project}</p>
          <span>{profile_text.project}</span>
        </div>
        <div className="text-center px-2.5">
          <p className="text-gray-500">{profile.team}</p>
          <span>{profile_text.team}</span>
        </div>
        <div className="text-center px-2.5">
          <p className="text-gray-500">{profile.task}</p>
          <span>{profile_text.task}</span>
        </div>
      </div>
    </div>
  );
}