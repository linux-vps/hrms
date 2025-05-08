import React from 'react';
import { Select } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function SelectDocs() {
  // page title
  const page_title = "Select";
  const data_options = [
    {title: "Orange", value: "orange"},
    {title: "Banana", value: "banana"},
    {title: "Apple", value: "apple"}
  ]
  // prism code
  const datacode1 = `
import React from 'react'
import { Select } from "@/components/reactdash-ui";

export default function SelectExp() {
    // data options
    const data_options = [
      {title: "Orange", value: "orange"},
      {title: "Banana", value: "banana"},
      {title: "Apple", value: "apple"}
    ]

    return (
      <>
        <form action="" className="flex flex-col space-y-4">
          <Select id="input1" options={data_options} name="select1" label="Select" />
          <Select id="input2" options={data_options} name="select2" label="Disabled" disabled={true} />
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
            <p className="text-lg mb-6 font-light">Customize the native select with custom CSS that changes the elements initial appearance.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Select</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" className="flex flex-col space-y-4" >
                {/* Select */}
                <Select id="input1" options={data_options} name="select1" label="Select" />
                <Select id="input2" options={data_options} name="select2" label="Disabled" disabled={true} />
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
                  <td>id for select</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>name</b></td>
                  <td>name for select</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>label</b></td>
                  <td>label for select</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onChange</b></td>
                  <td>function select</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>options</b></td>
                  <td>select options</td>
                  <td>string (<code>title</code> | <code>value</code>)</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>disabled</b></td>
                  <td>disabled select</td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><b>required</b></td>
                  <td>required select</td>
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