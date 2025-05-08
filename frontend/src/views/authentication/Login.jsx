import React from 'react';
import { Link } from 'react-router-dom';
import { BoxArrowInRight, Facebook, Twitter } from 'react-bootstrap-icons';
import { Button, Heading, Checkbox, InputLabel, InputPassword  } from '@/components/reactdash-ui';

export default function Login() {
  const logins = {
    login: "Login", link_login: "/auth2/login", forgot_link: "/auth2/forgot", register: "Register", register_link: "/auth2/register", remember: "Remember me", or: "Or", dont: "Dont have an account?", login_fb: "Login with FB", login_twitter: "Login with Twitter"
  }

  return (
    <>
      <Heading variant="h3" className="text-center">Login</Heading>
      <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
      <form>
        <InputLabel type="email" name="email" label="Email" />
        <div className="mb-4">
          <div className="flex flex-row justify-between items-center mb-2">
            <label htmlFor="inputpass" className="inline-block">Password</label>
            <Link to={logins.forgot_link} className="hover:text-blue-700">Forgot password?</Link>
          </div>
          <InputPassword type="password" name="password" />
        </div>
        <Checkbox name="remember" label="Remember me" value="1"/>

        <div className="grid">
          <Button type="submit">
            <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" />Login
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-center mb-3"><span>{logins.or}</span></p>
        <div className="text-center mb-6 sm:space-x-4">
          <a className="p-2 block sm:inline-block rounded lg:rounded-full leading-5 text-gray-100 bg-indigo-900 border border-indigo-900 hover:text-white hover:opacity-90 hover:ring-0 hover:border-indigo-900 focus:bg-indigo-900 focus:border-indigo-800 focus:outline-none focus:ring-0 mb-3" href="#">
            <Facebook className="inline-block w-4 h-4 mx-1" />
            <span className="inline-block lg:hidden">{logins.login_fb}</span>
          </a>
          <a className="p-2 block sm:inline-block rounded lg:rounded-full leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0 mb-3" href="#">
            <Twitter className="inline-block w-4 h-4 mx-1" />
            <span className="inline-block lg:hidden">{logins.login_twitter}</span>
          </a>
        </div>
        <p className="text-center mb-4">{logins.dont} <Link to={logins.register_link} className="hover:text-indigo-500">{logins.register}</Link></p>
      </div>
    </>
  );
}