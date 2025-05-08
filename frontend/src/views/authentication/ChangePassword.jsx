import React from 'react';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { Button, Heading, InputLabel } from '@/components/reactdash-ui';

export default function ChangePassword() {
  return (
    <>
      <Heading variant="h3" className="text-center">Change Password</Heading>
      <hr className="block w-12 h-0.5 mx-auto my-5 bg-gray-700 border-gray-700" />
      <form>
        <InputLabel type="password" name="password" label="New Password" />
        <InputLabel type="password" name="repassword" label="Repeat Password" />
        <div className="grid mb-4">
          <Button type="submit">
            <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" /> Save Password
          </Button>
        </div>
      </form>
    </>
  );
}