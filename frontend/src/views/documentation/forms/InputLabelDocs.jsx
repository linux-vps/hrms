import React from 'react';
import { Heading, InputLabel, InputPassword, InputColor, Textarea } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function InputDocs() {
  // page title
  const page_title = "Input Label";

  // prism code
  const datacode1 = `
import React from 'react'
import { InputLabel, InputPassword, InputColor, Textarea } from "@/components/reactdash-ui";

export default function InputLabelExp() {
    return (
      <>
        <form action="">
          {/* Input label */}
          <InputLabel id="input1" name="fullname" label="Full Name" />
          <InputLabel type="email" id="input2" name="email" label="Email" />
          <InputLabel type="password" id="input3" name="password" label="Password" />
          <InputPassword type="password" id="input33" name="password" label="Password" />
          <InputLabel type="url" id="input7" name="url" label="Website url" placeholder="https://" />
          <InputLabel type="phone" id="input8" name="phone" label="Phone" />
          <InputLabel type="number" id="input9" name="number" label="Number" />
          <InputLabel type="time" id="input10" name="time" label="Time" />
          <InputLabel type="date" id="input4" name="date" label="Date" />
          <InputLabel type="file" id="input5" name="files" label="Upload file" />
          <InputLabel disabled={true} id="input6" name="example" label="Disabled" />

          {/* Input Textarea */}
          <Textarea id="area1" name="textarea" label="Textarea" placeholder="Input Textarea"></Textarea>

          {/* Input Color */}
          <InputColor id="input11" name="color" label="Pick Color" />

          {/* Input label Size */}
          <InputLabel id="input21" name="exp1" label="Small" size="small" />
          <InputLabel id="input22" name="exp2" label="Default" />
          <InputLabel id="input23" name="exp3" label="Large" size="large" />
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
            <p className="text-lg mb-6 font-light">Input fields with label.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Input</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" >
                {/* Input label */}
                <InputLabel id="input1" name="fullname" label="Full Name" />
                <InputLabel type="email" id="input2" name="email" label="Email" />
                <InputLabel type="password" id="input3" name="password" label="Password" />
                <InputPassword type="password" id="input33" name="password" label="Password" />
                <InputLabel type="url" id="input7" name="url" label="Website url" placeholder="https://" />
                <InputLabel type="phone" id="input8" name="phone" label="Phone" />
                <InputLabel type="number" id="input9" name="number" label="Number" />
                <InputLabel type="time" id="input10" name="time" label="Time" />
                <InputLabel type="date" id="input4" name="date" label="Date" />
                <InputLabel type="file" id="input5" name="files" label="Upload file" />
                <InputLabel disabled={true} id="input6" name="example" label="Disabled" />

                {/* Input Textarea */}
                <Textarea id="area1" name="textarea" label="Textarea" placeholder="Input Textarea"></Textarea>

                {/* Input Color */}
                <InputColor id="input11" name="color" label="Pick Color" />

                {/* Input Size */}
                <Heading variant="h4" className="pt-6">Input Size</Heading>
                <InputLabel id="input21" name="exp1" label="Small" size="small" />
                <InputLabel id="input22" name="exp2" label="Default" />
                <InputLabel id="input23" name="exp3" label="Large" size="large" />
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
                  <td><b>label</b></td>
                  <td>label for input</td>
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