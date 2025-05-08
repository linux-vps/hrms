import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Submenu, SubmenuAccordion } from "@/components/reactdash-ui";

export default function SubmenuDocs() {
  // page title
  const page_title = "Submenu";
  const list_menu = [
    {id: 1, title: "List Item 1", url: "/1"},
    {id: 2, title: "Dropdown 1", url: "/2",
      submenu: [
        { id: 21, title: 'Sub item', url: '/21', },
        { id: 22, title: 'Sub item', url: '/22', },
        { id: 23, title: 'Sub item', url: '/23', },
      ]
    },
    {id: 3, title: "Dropdown 2", url: "/3",
      submenu: [
        { id: 31, title: 'Sub item', url: '/31', },
        { id: 32, title: 'Sub item', url: '/32', },
        { id: 33, title: 'Sub item', url: '/33', },
      ]
    },
    {id: 4, title: "List Item 3", url: "/4"},
    {id: 5, title: "List Item 4", url: "/5"},
    {id: 6, title: "List Item 5", url: "/6"},
  ]

  // prism code
  const datacode1 = `
import React from 'react';
import { SubmenuAccordion } from "@/components/reactdash-ui";

export default function Submenus() {
  // list menu
  const list_menu = [
    {id: 1, title: "List Item 1", url: "/1"},
    {id: 2, title: "Dropdown 1", url: "/2",
      submenu: [
        { id: 21, title: 'Sub item', url: '/21', },
        { id: 22, title: 'Sub item', url: '/22', },
        { id: 23, title: 'Sub item', url: '/23', },
      ]
    },
    {id: 3, title: "Dropdown 2", url: "/3",
      submenu: [
        { id: 31, title: 'Sub item', url: '/31', },
        { id: 32, title: 'Sub item', url: '/32', },
        { id: 33, title: 'Sub item', url: '/33', },
      ]
    },
    {id: 4, title: "List Item 3", url: "/4"},
    {id: 5, title: "List Item 4", url: "/5"},
    {id: 6, title: "List Item 5", url: "/6"},
  ]

  return (
    <>
    {/* submenu accordion */}
    <ul id="side-menu" className="w-full float-none flex flex-col font-medium ltr:pl-1.5 rtl:pr-1.5">
      <SubmenuAccordion data={list_menu} />
    </ul>
    </>
  )
}
  `;

  const datacode2 = `
import React from 'react';
import { Submenu } from "@/components/reactdash-ui";

export default function Submenus() {
  // list menu
  const list_menu = [
    {id: 1, title: "List Item 1", url: "/1"},
    {id: 2, title: "Dropdown 1", url: "/2",
      submenu: [
        { id: 21, title: 'Sub item', url: '/21', },
        { id: 22, title: 'Sub item', url: '/22', },
        { id: 23, title: 'Sub item', url: '/23', },
      ]
    },
    {id: 3, title: "Dropdown 2", url: "/3",
      submenu: [
        { id: 31, title: 'Sub item', url: '/31', },
        { id: 32, title: 'Sub item', url: '/32', },
        { id: 33, title: 'Sub item', url: '/33', },
      ]
    },
    {id: 4, title: "List Item 3", url: "/4"},
    {id: 5, title: "List Item 4", url: "/5"},
    {id: 6, title: "List Item 5", url: "/6"},
  ]

  return (
    <>
    {/* submenu collapse */}
    <ul id="side-menu" className="w-full float-none flex flex-col font-medium ltr:pl-1.5 rtl:pr-1.5">
      <Submenu data={list_menu} />
    </ul>
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
            <p className="text-lg mb-6 font-light">Add submenu in your list with easy way.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Submenu Accordion</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              {/* submenu accordion */}
              <ul id="side-menu" className="w-full float-none flex flex-col font-medium ltr:pl-1.5 rtl:pr-1.5">
                <SubmenuAccordion data={list_menu} />
              </ul>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Submenu Collapse</h2>
            <Card className="relative p-6 border shadow-none">
              {/* submenu collapse */}
              <ul id="side-menu" className="w-full float-none flex flex-col font-medium ltr:pl-1.5 rtl:pr-1.5">
                <Submenu data={list_menu} />
              </ul>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
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
                  <td><b>data</b></td>
                  <td>data submenu</td>
                  <td>data ( <code>id | title | icon | url</code> )</td>
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