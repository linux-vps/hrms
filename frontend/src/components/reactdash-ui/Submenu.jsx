import React from "react";
import { ChevronDown } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react'

export default function Submenu(props) {
  // Props sidebar menu
  const menu = props.data;
  
  return (
    <>
      { menu.map(menuitem =>
      <li key={menuitem.id}>
        {menuitem.submenu ? (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex flex-row justify-between items-center py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300">
                  <span className={`${ open ? 'text-indigo-500' : '' } flex items-center`}>
                    {menuitem.icon ?
                    <span className="inline-block h-4 w-4 ltr:mr-3 rtl:ml-3">{menuitem.icon}</span>
                    : ''}
                    <span>{menuitem.title}</span>
                  </span>

                  <span className="inline-block ltr:float-right rtl:float-left">
                    <ChevronDown className={`${ open ? 'rotate-0' : '-rotate-90' } w-3 h-3 transform transition duration-300 mt-1.5`} />
                  </span>
                </Disclosure.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="ul" className="block rounded rounded-t-none top-full z-50 ltr:pl-6 rtl:pr-6 py-0.5 ltr:text-left rtl:text-right mb-1 font-normal">
                    {menuitem.submenu.map(submenuitem => {
                      return<li key={submenuitem.id}><NavLink to={submenuitem.url} className={({ isActive }) => isActive ? 'text-indigo-600 block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500 dark:hover:text-gray-300' : 'block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500 dark:hover:text-gray-300'}>{submenuitem.title}</NavLink></li>;
                    })}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ) : (
          <NavLink to={menuitem.url} className={({ isActive }) => isActive ? 'text-indigo-600 block py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300' : 'block py-2.5 px-6 hover:text-indigo-500 dark:hover:text-gray-300'} >
            <span className="flex items-center">
              {menuitem.icon ?
              <span className="inline-block ltr:mr-3 rtl:ml-3">{menuitem.icon}</span>
              : ''}
              <span>{menuitem.title}</span>
            </span>
          </NavLink>
        )}
      </li>
      )}
    </>
  );
}