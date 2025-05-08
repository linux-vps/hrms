import React, { useState } from 'react';
// components
import Sidebar from "@/components/sidebar/Sidebar";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import FooterAdmin from '@/components/footer/FooterAdmin';

export default function AdminCompact(props) {
  // set toggle
  const [isToggle, setToggle] = useState(false);

  return (
    <div id="wrapper" className={`wrapper overflow-x-hidden bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 ${isToggle ? "show": ""}`}>
      {/* sidebar area */}
      <Sidebar model="compact"/>

      {/* content area */}
      <div className="content-compact relative min-h-screen flex flex-col transition-all duration-500 ease-in-out">
        {/* navbar top */}
        <NavbarAdmin model="compact" dataToggle = {()=>setToggle(!isToggle)} />

        {/* main */}
        <main className="relative pt-20 pb-24 lg:pb-20 -mt-2">
				  <div className="mx-auto p-2">
            {props.children}
          </div>
        </main>

        {/* footer */}
        <FooterAdmin />
      </div>
    </div>
  );
}
