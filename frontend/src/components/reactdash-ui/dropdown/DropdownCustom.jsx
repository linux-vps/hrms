import React from 'react';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { ChevronDown } from 'react-bootstrap-icons';

export default function DropdownCustom(props) {  
  return (
    <Menu>
      <MenuButton className="flex items-center py-3 px-6" >
          {props.title}
          <span className="inline-block ltr:ml-2 rtl:mr-2">
            <ChevronDown className="w-3 h-3" />
          </span>
      </MenuButton>
      <Transition 
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems as="ul" className="min-w-12 origin-top-right absolute ltr:right-0 rtl:left-0 rounded top-full z-60 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
          {props.children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}