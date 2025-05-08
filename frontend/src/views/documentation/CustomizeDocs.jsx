import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function CustomizeDocs() {

  // prism code
  const datacode1 = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  ********************
  
  your custom css in here
  `;

  return (
    <Preloader>
			{/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6 mt-6">
            <h1 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-300">Customize</h1>
            <p className="text-lg mb-6 font-light">How to easily edit and customize Reactdash template.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">CSS</h2>
            <p className="mb-4 font-light">To avoid file loss, overrides of your custom styles or any other conflicts during the upgrade process, create or modify your styles with add your custom css or precss in <code className="text-pink-500">src/assets/css/app.css</code> file. If you want to add other plugin css or remove some css, please edit this file.</p>
            <Card className="relative p-6 mb-12 border border-gray-200 dark:border-gray-700 shadow-none">
              <Prism data={datacode1} />
            </Card>
            <div className="relative mb-12">
              <h2 className="text-xl mb-3 font-semibold text-slate-800 dark:text-slate-300">Color and background?</h2>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">We use a subset of Tailwindcss color palette for generating color schemes. <br />You can use <code className="text-pink-500">text-</code> or <code className="text-pink-500">bg-</code> before color like this <code className="text-pink-500">text-indigo-500</code> or <code className="text-pink-500">bg-indigo-600</code> and customize color from .jsx file.</p>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">Our primary color is <code className="text-pink-500">text-indigo-</code>. You can change all primary color on html file with change <code className="text-pink-500">text-indigo-</code> and <code className="text-pink-500">bg-indigo-</code> with others color.</p>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">More complete color can see in Official <a href="https://tailwindcss.com/docs/customizing-colors" className="text-indigo-500" target="_blank">Tailwindcss</a></p>
            </div>
            <div className="relative mb-12">
              <h2 className="text-xl mb-3 font-semibold text-slate-800 dark:text-slate-300">Dark Mode</h2>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">Reactdash is ready in light and dark mode. Very simple to change color skin, just editing html file and add <b>"dark"</b> classes like this <code className="text-pink-500">&lt;html className="dark" lang="en"&gt;</code>.</p>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">Read more information about Tailwind dark mode in here <a target="_blank" className="text-indigo-500 hover:underline" href="https://tailwindcss.com/docs/dark-mode">https://tailwindcss.com/docs/dark-mode</a></p>
            </div>
            <div className="relative mb-12">
              <h2 className="text-xl mb-3 font-semibold text-slate-800 dark:text-slate-300">Theme Configuration</h2>
              <p className="leading-relaxed font-light text-lg mx-auto pb-2">You can change setting about Tailwindcss from this file. For example: Change Google fonts from <code className="text-pink-500">tailwind.config.js</code>.</p>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}