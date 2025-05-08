import React, { useState } from "react";
import { ChevronDown } from 'react-bootstrap-icons';
import { useLocation, NavLink } from 'react-router-dom';

export default function SubmenuAccordion({ closeMobile, ...props }) {
  const [isOpen, setOpen] = useState(null);
  const [isActive, setActive] = useState(true);
  // Data Sidebar menu
  const menu = props.data;
  const location = useLocation();

  return (
    <>
      {menu.map((menuitem, index) => {
        const ariaExpanded = index === isOpen ? "true" : "false";
        const showContent = index === isOpen ? "!block " : "";

        // open close accordion
        function openAbb() {
          isActive === true ? setOpen(false) : setOpen(index)
          setActive(false);
        }
        function openAcc() {
          setOpen(index)
          setActive(false);
        }
        function closeAcc() {
          setOpen(null);
          setActive(false);
        }
        const Toggler = showContent ? closeAcc : openAcc;
        const Toggles = showContent ? closeAcc : openAbb;

        // active dropdown
        const getNavLinkClass = path => {
          return location.pathname.includes(path) ? isActive : '';
        }

        return (
          <React.Fragment key={index}>
            {menuitem.submenu ? (
              <li className={`${getNavLinkClass(menuitem.url) ? 'relative active' : 'relative'}`}>
                <button aria-expanded={ariaExpanded} aria-controls={`content${index}`}
                  onClick={getNavLinkClass(menuitem.url) ? Toggles : Toggler} className="w-full flex flex-row justify-between items-center py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300">
                  <span className={`${showContent ? 'text-indigo-500' : ''} flex items-center`}>
                    {menuitem.icon ?
                      <span className="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">{menuitem.icon}</span>
                      : ''}
                    <span className="text">{menuitem.title}</span>
                  </span>

                  <span className="text inline-block ltr:float-right rtl:float-left">
                    <ChevronDown className={`${showContent ? 'rotate-0' : '-rotate-90 rtl:rotate-90'} w-3 h-3 transform transition duration-300 mt-1.5`} />
                  </span>
                </button>
                <ul aria-expanded={ariaExpanded} className={`${showContent ? '!block ' : ''}cpt hidden rounded rounded-t-none top-full z-50 ltr:pl-7 rtl:pr-7 py-0.5 ltr:text-left rtl:text-right mb-1 font-normal`}>
                  {menuitem.submenu.map(submenuitem => {
                    return <li key={`si-${submenuitem.id}`}><NavLink onClick={closeMobile} to={submenuitem.url} className={({ isActive }) => isActive ? 'text-indigo-600 block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500 dark:hover:text-gray-300' : 'block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500 dark:hover:text-gray-300'}>{submenuitem.title}</NavLink></li>;
                  })}
                </ul>
              </li>
            ) : (
              <li>
                <NavLink onClick={closeMobile} to={menuitem.url} className={({ isActive }) => isActive ? 'text-indigo-600 block py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300' : 'block py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300'} >
                  <span className="flex items-center">
                    {menuitem.icon ?
                      <span className="inline-block ltr:mr-3 rtl:ml-3">{menuitem.icon}</span>
                      : ''}
                    <span className="text">{menuitem.title}</span>
                  </span>
                </NavLink>
              </li>
            )}
          </React.Fragment>
        )
      }
      )}
    </>
  );
}