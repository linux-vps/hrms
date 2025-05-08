import React from 'react';
import { Tab } from '@headlessui/react';
// components
import { Preloader, Row, Column, Card, Prism, Tabs } from "@/components/reactdash-ui";

export default function TabsDocs() {
  // page title
  const page_title = "Tabs";
  const tabitem = [
    {
      title: 'Home',
      description: 'Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile. ',
    },
    {
      title: "Profile",
      description: 'Never planned that one day Id be losing you. She eats your heart out. Your kiss is cosmic, every move is magic. ',
    },
    {
      title: "Services",
      description: 'Greetings loved ones lets take a journey. Just own the night like the 4th of July! But youd rather get wasted. ',
    },
  ]

  // prism code
  const datacode1 = `
import React from 'react';
import { Tabs } from "@/components/reactdash-ui/";

export default function Tabss() {
  // data tabs
  const tabitem = [
    {
      title: 'Home',
      description: 'Placeholder content for the tab panel. This one relates to the home tab. Takes you miles high, so high, cause she got that one international smile. ',
    },
    {
      title: "Profile",
      description: 'Never planned that one day Id be losing you. She eats your heart out. Your kiss is cosmic, every move is magic. ',
    },
    {
      title: "Services",
      description: 'Greetings loved ones lets take a journey. Just own the night like the 4th of July! But youd rather get wasted. ',
    },
  ]

  return (
    <>
    {/* horizontal tabs */}
    <Tabs data={tabitem} />
    
    {/* vertical tabs */}
    <Tabs data={tabitem} model="vertical" />
    </>
  )
}
  `;

  const datacode2 = `
  import React from 'react';
  import { Tab } from "@/components/reactdash-ui";
  
  export default function UiTabs() {
  
    return (
      <>
      <Tab.Group>
        <Tab.List as="ul" className="list-unstyled flex flex-row space-x-2">
          <Tab as="li">
          {({ selected }) => (
            <button className={ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}>
              Tab 1
            </button>
          )}
          </Tab>
          <Tab as="li">
          {({ selected }) => (
            <button className={ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}>
              Tab 2
            </button>
          )}
          </Tab>
          <Tab as="li">
          {({ selected }) => (
            <button className={ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}>
              Tab 3
            </button>
          )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-3">
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
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
            <p className="text-lg mb-6 font-light">Documentation and examples for how to use tabs with Headless UI.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Simple Tabs</h2>
            <p className="mb-4 font-light">There are 2 choices of tabs 'model' horizontal and vertical. The default tabs model is horizontal.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <Tabs data={tabitem} />
            </Card>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Tabs data={tabitem} model="vertical" />
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
                  <td><b>model</b></td>
                  <td>Tabs model</td>
                  <td><code>'horizontal'</code> | <code>'vertical'</code></td>
                  <td><code>'horizontal'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>data tabs</td>
                  <td>data ( <code>title | description</code> )</td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Headless UI tabs</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
            <Tab.Group>
              <Tab.List as="ul" className="list-unstyled flex flex-row space-x-2">
                <Tab as="li">
                {({ selected }) => (
                  <button className={`${ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} py-2 px-6 rounded-lg`}>
                    Tab 1
                  </button>
                )}
                </Tab>
                <Tab as="li">
                {({ selected }) => (
                  <button className={`${ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} py-2 px-6 rounded-lg`}>
                    Tab 2
                  </button>
                )}
                </Tab>
                <Tab as="li">
                {({ selected }) => (
                  <button className={`${ selected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} py-2 px-6 rounded-lg`}>
                    Tab 3
                  </button>
                )}
                </Tab>
              </Tab.List>
              <Tab.Panels className="py-3">
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>
            <p className="mb-6">More details about Headless UI tabs read in here <a href="https://headlessui.com/react/tabs" target="_blank" className="text-indigo-500 hover:underline">Headless UI Tabs</a></p>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}