import React from 'react';
import { Input, InputGroup } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function InputGroupDocs() {
  // page title
  const page_title = "Input Group";
  // prism code
  const datacode1 = `
import React from 'react'
import { Input, InputGroup } from "@/components/reactdash-ui";

export default function InputGroupExp() {
    return (
      <>
        <form action="" className="flex flex-col space-y-4">
          {/* Input group */}
          <InputGroup>
            <InputGroup.Prefix>@</InputGroup.Prefix>
            <InputGroup.Body>
              <Input name="username" className="rounded-l-none" />
            </InputGroup.Body>
          </InputGroup>

          <InputGroup>
            <InputGroup.Suffix>@domain.com</InputGroup.Suffix>
            <InputGroup.Body>
              <Input name="username1" className="rounded-r-none" />
            </InputGroup.Body>
          </InputGroup>

          <InputGroup>
            <InputGroup.Prefix>$</InputGroup.Prefix>
            <InputGroup.Suffix>.00</InputGroup.Suffix>
            <InputGroup.Body>
              <Input name="price1" className="rounded-none" />
            </InputGroup.Body>
          </InputGroup>

          <InputGroup>
            <InputGroup.Prefix>https://domain.com/user/</InputGroup.Prefix>
            <InputGroup.Body>
              <Input name="username" className="rounded-l-none" />
            </InputGroup.Body>
          </InputGroup>
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
            <p className="text-lg mb-6 font-light">Place one add-on or icon/text on either side of an input.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <form action="" >
                {/* Input group */}
                <InputGroup>
                  <InputGroup.Prefix>@</InputGroup.Prefix>
                  <InputGroup.Body>
                    <Input name="username" className="rounded-l-none" />
                  </InputGroup.Body>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Suffix>@domain.com</InputGroup.Suffix>
                  <InputGroup.Body>
                    <Input name="username1" className="rounded-r-none" />
                  </InputGroup.Body>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prefix>$</InputGroup.Prefix>
                  <InputGroup.Suffix>.00</InputGroup.Suffix>
                  <InputGroup.Body>
                    <Input name="price1" className="rounded-none" />
                  </InputGroup.Body>
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prefix>https://domain.com/user/</InputGroup.Prefix>
                  <InputGroup.Body>
                    <Input name="username" className="rounded-l-none" />
                  </InputGroup.Body>
                </InputGroup>
                             
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