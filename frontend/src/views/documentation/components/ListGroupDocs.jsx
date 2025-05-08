import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, ListGroup } from "@/components/reactdash-ui";

export default function ListGroupDocs() {
  // page title
  const page_title = "ListGroup";
  const data_list = [
    { title: 'An item', url: '/', count: 12  },
    { title: 'A second item', url: '/', count: 14  },
    { title: 'A third item', url: '/', count: 16  },
    { title: 'A fourth item', url: '/', count: 1  },
    { title: 'And a fifth one', url: '/', count: 0  }
  ]

  // prism code
  const datacode1 = `
import React from 'react'
import { ListGroup } from "@/components/reactdash-ui";

export default function ListGroups() {
    // data list
    const data_list = [
      { title: 'An item', url: '/', count: 12  },
      { title: 'A second item', url: '/', count: 14  },
      { title: 'A third item', url: '/', count: 16  },
      { title: 'A fourth item', url: '/', count: 1  },
      { title: 'And a fifth one', url: '/', count: 0  }
    ]

    return (
      <>
      <ListGroup data={data_list} className="mb-4"/>
      <ListGroup data={data_list} variant="lessborder" />
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
            <p className="text-lg mb-6 font-light">The most basic list group is an unordered list with list items and the proper classes..</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example List Group</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <h4 className="font-bold mb-2">Bordered</h4>
              <ListGroup data={data_list} className="mb-12"/>
              <h4 className="font-bold mb-2">Less Border</h4>
              <ListGroup data={data_list} variant="lessborder" />
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
                  <td><b>variant</b></td>
                  <td>List group Variant</td>
                  <td><code>'bordered' | 'lessborder'</code></td>
                  <td><code>'bordered'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data List group</td>
                  <td>Data ( <code>title | url | count</code> )</td>
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