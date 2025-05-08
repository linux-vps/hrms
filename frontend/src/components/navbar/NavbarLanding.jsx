import React from 'react';
import { Cart2 } from 'react-bootstrap-icons';
import { Button, Dropdown, OffCanvasMenu } from "@/components/reactdash-ui";
import Logo from '@/components/navbar/Logo';
import { Link } from 'react-router-dom';

export default function NavbarLanding(props) {
  // logo & list menu
  const content = { logo: "/img/logo.png", logo_text: "Reactdash", text: "Copyright Reactdash - All right reserved" }
  const list_menu = [
    { id: 1, title: "Home", url: "/landing-page" },
    { id: 2, title: "Demo", url: "/dashboard/cms" },
    {
      id: 3, title: "Layouts", url: "/layouts",
      submenu: [
        { id: 31, title: 'Default', url: '/dashboard/cms', },
        { id: 32, title: 'Compact', url: '/compact', },
        { id: 33, title: 'SideDark', url: '/side-dark', },
      ]
    },
    { id: 4, title: "Components", url: "/components/accordion" },
    { id: 5, title: "Widgets", url: "/app/widgets" },
  ]

  return (
    <nav className="nav-top flex flex-nowrap lg:flex-start items-center z-20 absolute top-0 left-0 right-0 bg-indigo-600 dark:bg-gray-800 overflow-y-auto max-h-screen lg:overflow-visible lg:max-h-full">
      <div className="container mx-auto px-4 xl:max-w-6xl">
        <div className="flex flex-row justify-between py-6 lg:py-4 lg:hidden">
          <Logo color="light" />
          {/* mobile offcanvas menu  */}
          <div className="right-0 flex items-center">
            <OffCanvasMenu data={list_menu} content={content} color="light" placement="right" />
          </div>
        </div>

        {/* Dekstop navbar  */}
        <div className="hidden lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:mt-0" id="desktp-menu">
          <Logo color="light" />

          {/* menu  */}
          <ul className="flex flex-col py-4 lg:mx-auto mt-2 lg:flex-row lg:mt-0 text-gray-200">
            {list_menu.map((item, index) =>
              <li key={index} className="relative">
                {item.submenu ?
                  <Dropdown title={item.title} data={item.submenu} />
                  :
                  <Link className="block py-3 px-6 hover:text-white focus:text-white" to={item.url}>
                    {item.title}
                  </Link>
                }
              </li>
            )}
          </ul>

          <div className="grid text-center lg:block my-4 lg:my-auto">
            <a href="https://aribudin.gumroad.com/l/reactdash?wanted=true&variant=Single%20License">
              <Button color="light">
                <Cart2 className="inline mr-1" /> Buy Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}