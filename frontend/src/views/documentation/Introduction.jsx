import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function Introduction() {
  // prism code
  const datacode1 = `
reactdash/
├── node_modules/ ( All modules )
│
├── dist/  ( Production files )
│
├── public/
│   │   ├── img/ ( All source images )
│   │   │ 
├── src
│   ├── assets/
│   │   ├── css/
│   │   │   ├── app.css ( Tailwind & All source css )
│   │   │   
│   ├── components/ ( all components )
│   │   ├── chart/
│   │   ├── content/
│   │   ├── layouts/
│   │   ├── reactdash-ui/ ( UI Components )
│   │   ├── ******
│   │   │
│   │   │
│   │   │
│   ├── views/ ( demo page in here )
│   │   ├── app/
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   ├── documentation/
│   │   ├── ecommerce/
│   │   ├── pages/
│   │   ├── project/
│   │   ├── ******
│   │   │
│   ├── App.jsx
│   ├── Main.jsx
│   │   │
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs 
├── vite.config.js  
└── 
  `;

  return (
    <Preloader>
      {/* content */}
      <Row>
        <Column className="w-full px-4 mt-6">
          <Card className="relative p-6">
            <h1 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-300">Introduction</h1>
            <p className="text-lg mb-6 font-light">Reactdash is React dashboard template for start build your awesome dasboard with React js framework.</p>
            <div className="border-l-4 border-pink-700 p-4 bg-pink-50 dark:bg-pink-900 mb-8">
              <p className="leading-relaxed font-light text-lg mx-auto pb-2"><span className="font-bold">Note:</span> 'Reactdash' template you are currently viewing is a React Template. NOT a Html or WordPress Theme!. Please DO NOT try to install files into WordPress this will not work.</p>
            </div>
            <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-gray-300">Prerequisites</h2>
            <p className="mb-4">Before you begin with 'Reactdash', you may need to install the following tools make sure your development environment able to run the template.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6 flex flex-col">
              <p className="mb-2 font-bold">Software</p>
              <a href="https://nodejs.org/" className="py-2" target="_blank"><code className="text-gray-500">Node.js</code></a>
              <a href="https://www.npmjs.com/" className="py-2" target="_blank"><code className="text-gray-500">Npm</code></a>
            </Card>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6 flex flex-col">
              <p className="mb-2 font-bold">Knoledge</p>
              <a href="https://reactjs.org/tutorial/tutorial.html#what-is-react" className="py-2" target="_blank"><code className="text-gray-500">React js</code></a>
              <a href="https://tailwindcss.com/docs/utility-first" className="py-2" target="_blank"><code className="text-gray-500">Tailwind Css</code></a>
            </Card>

            <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-gray-300">Start Development</h2>
            <p className="mb-4">Reactdash uses the modern tool <code className="text-pink-500">'Vite'</code> for the development process.</p>
            <Card className="relative p-6 border mb-6 border-gray-200 dark:border-gray-700 shadow-none flex flex-col">
              <code className="text-gray-500 py-2 px-4 bg-gray-50 mb-4">open <b>'reactdash'</b> folder from terminal</code>
              <code className="text-pink-400 py-2 px-4 bg-gray-900 mb-4">npm install</code>
              <code className="text-pink-400 py-2 px-4 bg-gray-900 mb-4">npm run dev</code>
              <code className="text-gray-500 py-2 px-4 bg-gray-50 mb-4">open local server <a className="text-indigo-500" href="http://localhost:5173">http://localhost:5173/</a></code>
              <code className="text-pink-400 py-2 px-4 bg-gray-900 mb-4">npm run build <span className="text-gray-500">(production)</span></code>
            </Card>
            <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-gray-300">Components</h2>
            <p className="mb-2">All React examples are provided as a simple single component and make no assumptions about how you want to break things down, what API prop you want to display, or where you get your data from.</p>
            <p className="mb-12">We have attached sample data in each component, you can break data into props.</p>
            <h2 className="text-xl mb-2 font-semibold text-gray-800 dark:text-gray-300">File Structured</h2>
            <p className="mb-2">All React examples are provided as a simple single component and make no assumptions about how you want to break things down, what API prop you want to display, or where you get your data from.</p>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}