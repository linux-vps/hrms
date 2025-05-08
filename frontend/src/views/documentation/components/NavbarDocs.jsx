import React, { useState } from 'react';
// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function NavbarDocs() {
  // page title
  const page_title = "Navbar";

  // prism code
  const datacode1 = `
import React, { useState } from 'react';
import NavbarAdmin from "@/components/navbar/NavbarAdmin";

export default function Navbars() {
  // set toggle
  const [isToggle, setToggle] = useState(false);

  return (
    <>
    {/* navbar admin */}
    <NavbarAdmin dataToggle = {()=>setToggle(!isToggle)} />
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
            <p className="text-lg mb-6 font-light">Responsive navigation header, the navbar with link and dropdown menu.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">NavbarAdmin Code</h2>

            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
            <p className="mb-6">Edit all data dropdown from <code className="text-pink-500">'src/components/navbar/NavbarAdmin.jsx'</code></p>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}