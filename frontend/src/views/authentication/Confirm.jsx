import React from 'react';
import { BoxArrowInRight, EnvelopeOpen } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function Confirm() {
  const confirm = {
    title: "Check your email", description: "A email has been send to email@domain.com. Please check for an email and click on the included link to reset your password.", login_link: "/auth2/login", relogin: "Relogin"
  }

  return (
    <>
      <div className="text-center">
        <EnvelopeOpen className="text-indigo-500 mx-auto w-16 h-16 mb-6" />
        <h1 className="text-2xl font-bold mb-2">{confirm.title}</h1>
        <p className="text-gray-500 mb-6">{confirm.description}</p>
        <Link to={confirm.login_link} className="py-2 px-4 inline-block text-center mb-3 rounded leading-normal text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
          <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" /> {confirm.relogin}
        </Link>
      </div>
    </>
  );
}