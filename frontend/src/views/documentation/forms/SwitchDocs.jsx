import React from 'react';
import { Switch, Range } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function SwitchDocs() {
  // page title
  const page_title = "Switch and Range";
  // prism code
  const datacode1 = `
import React from 'react'
import { Switch, Range } from "@/components/reactdash-ui";

export default function SwitchExp() {

    return (
      <>
        <form action="" className="flex flex-col space-y-4">
          {/* Switch and Range */}
          <Switch id="input1" name="switch1" label="Switch" />
          <Range id="input2" name="range2" label="Range" />
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
            <p className="text-lg mb-6 font-light">Switch and Range.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" className="flex flex-col space-y-4" >
                {/* Switch and Range */}
                <Switch id="input1" name="switch1" label="Switch" />
                <Range id="input2" name="range2" label="Range" />
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
                  <td>id for range and switch</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>name</b></td>
                  <td>name for range and switch</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>label</b></td>
                  <td>label for range and switch</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onChange</b></td>
                  <td>function switch</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>value</b></td>
                  <td>value range and switch</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>checked</b></td>
                  <td>switch checked</td>
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