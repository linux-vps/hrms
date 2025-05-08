import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';

export default function DropdownUser(props) {
  // data admin
  const userAdmin = props.user;
  // list dropdown
  const menuAdmin = props.data;

  return (
    <Menu>
      <MenuButton className="px-3 flex text-sm rounded-full focus:outline-none" id="user-menu-button">
        <div className="relative">
          <img className="h-10 w-10 rounded-full border border-gray-700 bg-gray-700" src={userAdmin.img} alt={userAdmin.name} />
          <span title="online" className="flex justify-center absolute -bottom-0.5 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"></span>
        </div>
        <span className="hidden md:block ltr:ml-1 rtl:mr-1 self-center">{userAdmin.name}</span>
      </MenuButton>
      <Transition 
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems as="ul" className="origin-top-right min-w-12 absolute ltr:right-0 rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
        <li className="relative">
          <div className="flex flex-wrap flex-row -mx-4 px-3 py-4 items-center">
            <div className="flex-shrink max-w-full px-4 w-1/3">
              <img src={userAdmin.img} className="h-10 w-10 rounded-full" alt={userAdmin.name} />
            </div>
            <div className="flex-shrink max-w-full px-4 w-2/3 ltr:pl-1 rtl:pr-1">
              <div className="font-bold">
                <Link to={userAdmin.url} className="text-gray-800 dark:text-gray-300 hover:text-indigo-500">{userAdmin.name}</Link>
              </div>
              <div className="text-gray text-sm mt-1">{userAdmin.info}</div>
            </div>
          </div>
        </li>
        <li className="relative">
          <hr className="border-t border-gray-200 dark:border-gray-700 my-0" />
        </li>
        
        { menuAdmin.map( ( menuitem, index ) => (
        <li key={index}>
          <Link to={menuitem.url} className="flex items-center w-full py-2 px-6 clear-both whitespace-nowrap hover:text-indigo-500">
            <span className="ltr:mr-2 rtl:ml-2 w-4 h-4 bi bi-gear">{menuitem.icon}</span>{menuitem.title}
          </Link>
        </li>
        ))}

        </MenuItems>
      </Transition>
    </Menu>
  );
}