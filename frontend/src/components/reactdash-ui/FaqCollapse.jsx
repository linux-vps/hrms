import React from "react";
import { ChevronDown } from 'react-bootstrap-icons';
import { Disclosure, Transition } from '@headlessui/react'

export default function FaqCollapse(props) {
  // Props ( data, className )
  const faqitem = props.data;
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <>
      { faqitem.map( (item, index) =>
      <div key={index} className={`relative flex flex-wrap flex-col shadow mb-4 bg-white dark:bg-gray-800${addClass}`}>
        <Disclosure>
          {({ open }) => (
            <>
            <Disclosure.Button as="div" className="border-b border-gray-200 mb-0 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 dark:border-gray-800 py-2 px-4" id="HeadingOnee">
              <button className="py-3 px-0 w-full rounded leading-5 font-medium flex justify-between focus:outline-none focus:ring-0">
                {item.question}
                <ChevronDown className={`${ open ? '-rotate-180' : 'rotate-0' } w-3 h-3 transform transition duration-300 mt-1.5`} />
              </button>
            </Disclosure.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
              <Disclosure.Panel >
                <div className="p-6">
                  <p>{item.answer}</p>
                </div>
              </Disclosure.Panel>
            </Transition>
            </>
          )}
        </Disclosure>
      </div>
      )}
    </>
  );
}