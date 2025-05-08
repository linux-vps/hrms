import React from 'react';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Button, Heading, Paragraph, InputLabel  } from '@/components/reactdash-ui';

export default function Forgot(props) {
  const forgots = {
    login: "Login", link_login: "/auth2/login", forgot_link: "/auth2/forgot", register: "Register", register_link: "/auth2/register", remember: "Remember me", or: "Or", dont: "Dont have an account?", login_fb: "Login with FB", login_twitter: "Login with Twitter"
  }

  return (
    <>
      <Heading variant="h3" className="text-center">Forgot Password</Heading>
      <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
      <form>
        <Paragraph>Enter your email address to reset your password</Paragraph>
        <InputLabel type="email" name="email" label="Email" />
        <div className="grid">
          <Button type="submit">
            <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" /> Reset Password
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <p className="text-center mb-3"><span>{forgots.or}</span></p>
        <p className="text-center mb-4">{forgots.dont} <Link to={forgots.register_link} className="hover:text-indigo-500">{forgots.register}</Link></p>
      </div>
    </>
  );
}