import React from 'react';
import { Link } from 'react-router-dom';
import { BoxArrowInRight, Facebook, Twitter } from 'react-bootstrap-icons';
import { Button, Heading, InputLabel, Radio, Checkbox, InputPassword  } from '@/components/reactdash-ui';

export default function Register() {
  const register = {
    login: "Login", link_login: "/auth2/login", register: "Register", register_link: "/", agree_text: "I agree to the Terms and Conditions", or: "Or", already: "Already have an account?", join_fb: "Join with FB", join_twitter: "Join with Twitter", footer_copyright: "Tailnet | All right reserved"
  }
  const options = [
    { id: 123, value: 'blues', title: 'Blues' },
    { id: 124, value: 'rock', title: 'Rock' },
    { id: 125, value: 'jazz', title: 'Jazz' }
  ]
  
  return (
    <>
      <Heading variant="h3" className="text-center">Join Now</Heading>
      <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
      <form>
        <InputLabel label="Full Name" id="input1" name="fullname" />
        <InputLabel type="email" label="Email" id="input2" name="email" />
        <InputPassword type="password" label="Password" id="input3" name="password" />
        <InputPassword type="password" label="Repeat Password" id="input4" name="repassword" />
        <Radio options={options} name="music" checked="rock" label="Music" />
        <div className="mb-6">
          <label className="flex flex-row items-center">
            <Checkbox name="tos" value="1" required="true"/>
            <p className="ml-2">I agree to the <a href="#">Terms and Conditions</a></p>
          </label>
        </div>

        <div className="grid">
          <Button type="submit">
            <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" />Register
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-center mb-3"><span>{register.or}</span></p>
        <div className="text-center mb-6 sm:space-x-4">
          <a className="p-2 block sm:inline-block rounded lg:rounded-full leading-5 text-gray-100 bg-indigo-900 border border-indigo-900 hover:text-white hover:opacity-90 hover:ring-0 hover:border-indigo-900 focus:bg-indigo-900 focus:border-indigo-800 focus:outline-none focus:ring-0 mb-3" href="#">
            <Facebook className="inline-block w-4 h-4 mx-1" />
            <span className="inline-block lg:hidden">{register.join_fb}</span>
          </a>
          <a className="p-2 block sm:inline-block rounded lg:rounded-full leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0 mb-3" href="#">
            <Twitter className="inline-block w-4 h-4 mx-1" />
            <span className="inline-block lg:hidden">{register.join_twitter}</span>
          </a>
        </div>
        <p className="text-center mb-4">{register.already} <Link to={register.link_login} className="hover:text-indigo-500">{register.login}</Link></p>
      </div>
    </>
  );
}