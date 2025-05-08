import React from 'react';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Input, InputGroup, InputLabel, Radio, Select } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function FormsDocs() {
  // page title
  const page_title = "Example Forms";
  const options = [
    { id: 123, value: 'blues', title: 'Blues' },
    { id: 124, value: 'rock', title: 'Rock' },
    { id: 125, value: 'jazz', title: 'Jazz' }
  ]
  const gender_options = [
    { id: 1, value: 'male', title: 'Male' },
    { id: 2, value: 'female', title: 'Female' }
  ]
  // prism code
  const datacode1 = `
import React from 'react';
import { Link } from 'react-router-dom';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { InputLabel, Input, Checkbox, Button  } from "@/components/reactdash-ui";

export default function LoginExp() {
    return (
      <>
      <form action="">
        <InputLabel type="email" name="email" label="Email" />
        <div className="mb-4">
          <div className="flex flex-row justify-between items-center mb-2">
            <label htmlFor="inputpass" className="inline-block">Password</label>
            <Link to="/" className="hover:text-blue-700">Forgot password?</Link>
          </div>
          <Input type="password" id="inputpass" name="password" />
        </div>
        <Checkbox name="remember" label="Remember me" value="1"/>
        <div className="grid">
          <Button type="submit">
            <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" />Login
          </Button>
        </div>
      </form>
      </>
    )
}
  `;
  // prism code
  const datacode2 = `
import React from 'react';
import { Link } from 'react-router-dom';
import { BoxArrowInRight } from 'react-bootstrap-icons';
import { InputLabel, Input, InputGroup, Select, Radio, Checkbox, Button  } from "@/components/reactdash-ui";

export default function RegisterExp() {
    const options = [
      { id: 123, value: 'blues', title: 'Blues' },
      { id: 124, value: 'rock', title: 'Rock' },
      { id: 125, value: 'jazz', title: 'Jazz' }
    ]
    const gender_options = [
      { id: 1, value: 'male', title: 'Male' },
      { id: 2, value: 'female', title: 'Female' }
    ]
    
    return (
      <>
      <form action="">
        <InputLabel label="Full Name" id="input1" name="fullname" />
        <InputLabel type="email" label="Email" id="input2" name="email" />

        <InputGroup label="Usename" id="usernames">
          <InputGroup.Prefix>@</InputGroup.Prefix>
          <InputGroup.Body>
            <Input name="username" className="rounded-l-none" placeholder="Username" />
          </InputGroup.Body>
        </InputGroup>
        
        <Radio options={gender_options} name="gender" checked="male" label="Gender" />
        <Select options={options} name="music" checked="rock" label="Favorite Music" />
        <InputLabel type="password" label="Password" id="input3" name="password" />
        <InputLabel type="password" label="Repeat Password" id="input4" name="repassword" />
        
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
      </>
    )
}
  `;

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">{page_title}</p>
        </Column>
      </Row>

      {/* content */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Form Login</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="">
                <InputLabel type="email" name="email" label="Email" />
                <div className="mb-4">
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label htmlFor="inputpass" className="inline-block">Password</label>
                    <Link to="/" className="hover:text-blue-700">Forgot password?</Link>
                  </div>
                  <Input type="password" id="inputpass" name="password" />
                </div>
                <Checkbox name="remember" label="Remember me" value="1"/>
                <div className="grid">
                  <Button type="submit">
                    <BoxArrowInRight className="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2" />Login
                  </Button>
                </div>
              </form>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Form Register</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form>
                <InputLabel label="Full Name" id="input1" name="fullname" />
                <InputLabel type="email" label="Email" id="input2" name="email" />

                <InputGroup label="Usename" id="usernames">
                  <InputGroup.Prefix>@</InputGroup.Prefix>
                  <InputGroup.Body>
                    <Input name="username" className="rounded-l-none" placeholder="Username" />
                  </InputGroup.Body>
                </InputGroup>
                
                <Radio options={gender_options} name="gender" checked="male" label="Gender" />
                <Select options={options} name="music" checked="rock" label="Favorite Music" />
                <InputLabel type="password" label="Password" id="input3" name="password" />
                <InputLabel type="password" label="Repeat Password" id="input4" name="repassword" />
                
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
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>

          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}