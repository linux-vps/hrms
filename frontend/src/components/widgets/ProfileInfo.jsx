import React from 'react';
import { PencilSquare } from 'react-bootstrap-icons';

export default function ProfileInfo(props) {
  const profile_text = {
    title: "Information", url: "/", name: "Full Name",
    phone: "Phone", email: "Email", location: "Location", language: "Language"
  }
  const profile = {
    description: "Hey, I'm Ari Budin. I love making quality website template designs. Contact me for any questions",
    name: "Ari Budin",
    phone: "(+21) 123 1234 567",
    email: "yourmail@gmail.com",
    location: "San Fransisco, Usa",
    language: "English"
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-row justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
        <div className="relative">
          <a href={profile_text.url} title="edit information" className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
            <PencilSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="py-3">
        <p className="text-gray-500 mb-2">
          {profile.description}
        </p>
        <div className="border-t border-gray-200 my-3 dark:border-gray-700"></div>
        <div className="ltr:text-left rtl:text-right">
          <p className="mb-2"><strong>{profile_text.name} :</strong><span className="ml-2">{profile.name}</span></p>
          <p className="mb-2"><strong>{profile_text.phone} :</strong><span className="ml-2">{profile.phone}</span></p>
          <p className="mb-2"><strong>{profile_text.email} :</strong><span className="ml-2">{profile.email}</span></p>
          <p className="mb-2"><strong>{profile_text.location} :</strong><span className="ml-2">{profile.location}</span></p>
          <p className="mb-2"><strong>{profile_text.language} :</strong><span className="ml-2"> {profile.language}</span></p>
        </div>
      </div>
    </div>
  );
}