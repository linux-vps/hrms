import React from 'react';
import { Heading, Input, InputPassword, Textarea } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function InputDocs() {
  // page title
  const page_title = "Form Input";

  // prism code
  const datacode1 = `
import React from 'react'
import { Input, InputPassword, Textarea } from "@/components/reactdash-ui";

export default function InputExp() {
    return (
      <>
        <form action="" className="flex flex-col space-y-4">
          {/* Input */}
          <Input id="input1" name="inputtext" placeholder="Input Text" />
          <Input type="email" id="input2" name="email" placeholder="Email" />
          <Input type="password" id="input3" name="password" placeholder="Password" />
          <InputPassword type="password" id="input33" name="password" placeholder="Password" />
          <Input type="url" id="input7" name="url" placeholder="https://" />
          <Input type="phone" id="input8" name="phone" placeholder="Phone" />
          <Input type="number" id="input9" name="number" placeholder="Number" />
          <Input type="time" id="input10" name="time" placeholder="Time" />
          <Input type="date" id="input4" name="date" placeholder="Date" />
          <Input type="file" id="input5" name="files" placeholder="Upload file" />
          <Input disabled={true} id="input6" name="example" placeholder="Disabled" />
          
          {/* Input Textarea */}
          <Textarea id="area1" name="textarea" placeholder="Input Textarea"></Textarea>

          {/* Input Size */}
          <Input id="input1" name="exp1" placeholder="Small" size="small" />
          <Input id="input1" name="exp2" placeholder="Default" />
          <Input id="input1" name="exp3" placeholder="Large" size="large" />

          {/* Input Floating */}
          <Input id="input4" name="inputtext" model="float" placeholder="Full name" />
          <Input type="email" id="input6" name="inputemail" model="float" placeholder="Email" />
          <Input type="password" id="input7" name="inputpass" model="float" placeholder="Password" />
          <InputPassword model="float" id="input34" name="password" placeholder="Password" />
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
            <p className="text-lg mb-6 font-light">Most common form control, text-based input fields.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Input</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" className="flex flex-col space-y-4" >
                {/* Input */}
                <Input id="input1" name="inputtext" placeholder="Input Text" />
                <Input type="email" id="input2" name="email" placeholder="Email" />
                <Input type="password" id="input3" name="password" placeholder="Password" />
                <InputPassword id="input33" name="password" placeholder="Password" />
                <Input type="url" id="input7" name="url" placeholder="https://" />
                <Input type="phone" id="input8" name="phone" placeholder="Phone" />
                <Input type="number" id="input9" name="number" placeholder="Number" />
                <Input type="time" id="input10" name="time" placeholder="Time" />
                <Input type="date" id="input4" name="date" placeholder="Date" />
                <Input type="file" id="input5" name="files" placeholder="Upload file" />
                <Input disabled={true} id="input6" name="example" placeholder="Disabled" />

                {/* Input Textarea */}
                <Textarea id="area1" name="textarea" placeholder="Input Textarea"></Textarea>
                
                {/* Input Size */}
                <Heading variant="h4" className="pt-6">Input Size</Heading>
                <Input id="input31" name="exp1" placeholder="Small" size="small" />
                <Input id="input32" name="exp2" placeholder="Default" />
                <Input id="input34" name="exp3" placeholder="Large" size="large" />
                
                {/* Input Floating */}
                <Heading variant="h4" className="pt-6">Floating label</Heading>
                <Input id="input44" name="inputtext" model="float" placeholder="Full name" />
                <Input type="email" id="input36" name="inputemail" model="float" placeholder="Email" />
                <Input type="password" id="input37" name="inputpass" model="float" placeholder="Password" />
                <InputPassword model="float" id="input35" name="password" placeholder="Password" />
              </form>
            </Card>

            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td><b>type</b></td>
                  <td>Input type</td>
                  <td><code>'text'</code> | <code>'password'</code> | <code>'email'</code> | <code>'date'</code>
                  | <code>'file'</code> | <code>'search'</code> | <code>'tel'</code> | <code>'url'</code>
                  | <code>'number'</code> | <code>'time'</code></td>
                  <td><code>'text'</code></td>
                </tr>
                <tr>
                  <td><b>id</b></td>
                  <td>id for input</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>name</b></td>
                  <td>name for input</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>placeholder</b></td>
                  <td>text placeholder input</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onChange</b></td>
                  <td>function input</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>value</b></td>
                  <td>value input</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>model</b></td>
                  <td>model for input</td>
                  <td><code>float</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>disabled</b></td>
                  <td>disabled input</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><b>readOnly</b></td>
                  <td>readOnly input</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><b>required</b></td>
                  <td>required input</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}