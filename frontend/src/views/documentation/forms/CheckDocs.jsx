import React from 'react';
import { Checkbox, Radio } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function CheckDocs() {
  // page title
  const page_title = "Checkbox and Radio";
  const data_radio = [
    {title: "Orange", value: "orange", id: "opt1" },
    {title: "Banana", value: "banana", id: "opt2"},
    {title: "Apple", value: "apple", id: "opt3"}
  ]
  // prism code
  const datacode1 = `
import React from 'react'
import { Checkbox, Radio } from "@/components/reactdash-ui";

export default function CheckboxExp() {
    const data_radio = [
      {title: "Orange", value: "orange", id: "opt1" },
      {title: "Banana", value: "banana", id: "opt2"},
      {title: "Apple", value: "apple", id: "opt3"}
    ]

    return (
      <>
        <form action="" className="flex flex-col space-y-4">
          {/* Example radio and checkbox */}
          <Radio options={data_radio} name="fruit" checked="banana" id="fruit1" label="Fruits" />
          <Checkbox name="remember" value="1" label="Remember me"/>

          {/* Checkbox with link */}
          <div className="mb-6">
            <label className="flex flex-row items-center">
              <Checkbox name="tos" value="1" required="true"/>
              <p className="ml-2">I agree to the <a href="#">Terms and Conditions</a></p>
            </label>
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
            <p className="text-lg mb-6 font-light">Checkbox and Radio input field.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Checkbox & Radio</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" className="flex flex-col space-y-4" >
                {/* Example radio and checkbox */}
                <Radio options={data_radio} name="fruit" checked="banana" id="fruit1" label="Fruits" />
                <Checkbox name="remember" value="1" label="Remember me"/>

                 {/* Checkbox with link */}
                <div className="mb-6">
                  <label className="flex flex-row items-center">
                    <Checkbox name="tos" value="1" required="true"/>
                    <p className="ml-2">I agree to the <a href="#">Terms and Conditions</a></p>
                  </label>
                </div>
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
                  <td><b>id</b></td>
                  <td>id for checkbox & radio</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>name</b></td>
                  <td>name for checkbox & radio</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>options</b></td>
                  <td>options for radio</td>
                  <td><code>string ( id | title | value )</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>checked</b></td>
                  <td>default options for radio</td>
                  <td><code>value ( from options )</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onChange</b></td>
                  <td>function checkbox & radio</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>value</b></td>
                  <td>value checkbox</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>required</b></td>
                  <td>required checkbox</td>
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