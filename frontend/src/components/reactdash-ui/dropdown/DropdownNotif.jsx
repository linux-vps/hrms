import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { Trash, BellSlash } from 'react-bootstrap-icons';
import TimeAgo from 'react-timeago';
import { Notif } from '@/components/reactdash-ui';

export default function DropdownNotif(props) {
  // Data notif
  const allnotif = props.data;
  // Head & footer dropdown text and link
  const text_notif = props.data_text;

  // Sort notif
  const datanotif = [...allnotif].sort((a, b) => b.id - a.id);
  const notifcount1 =  datanotif.filter(notif => notif.read === false).length;

  // delete notif
  const [notifcount, setData] = useState(notifcount1);
  const data1 = 0;
  // reset value
  const resetNotif = () => {
    setData(data1);
  };

  return (
    <Menu>
      <MenuButton className="py-3 px-4 flex text-sm rounded-full focus:outline-none" id="user-menu-button">
        <div className="relative inline-block">
          <Notif count={notifcount} icon={text_notif.notificon}/>
        </div>
      </MenuButton>
      <Transition 
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems as="div" className="w-72 transform translate-x-16 lg:translate-x-0 origin-top-right absolute ltr:right-0 rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
          {/* Head notification */}
          <div className="p-3 font-normal border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="font-bold">{text_notif.title}</div>
              <div className="absolute top-0 ltr:right-0 rtl:left-0">
                <button onClick={resetNotif} className="inline-block ltr:mr-2 rtl:ml-2" title="Clear all notification">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body notification */}
          <div className="max-h-60 overflow-y-auto scrollbars show">
            {notifcount > 0 ?
            datanotif.filter(notif => notif.read === false).map(filterednotif => (
            <Link key={filterednotif.id} to={filterednotif.url} className="relative">
              <div className="flex flex-wrap flex-row items-center border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-40 dark:hover:bg-opacity-20 py-2 hover:bg-gray-100 bg-gray-50">
                <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                  <div className="flex justify-center mx-auto w-8 h-8 rounded-full bg-indigo-500 text-white">
                    <div className="self-center w-4 h-4">{filterednotif.icon}</div>
                  </div>
                </div>
                <div className="flex-shrink max-w-full px-2 w-3/4">
                  <div className="text-sm font-bold">{filterednotif.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{filterednotif.msg}</div>
                  <div className="text-gray-500 text-sm mt-1"><TimeAgo date={filterednotif.time} /></div>
                </div>
              </div>
            </Link>
            ))
            :
            <div className="relative">
              <div className="flex flex-wrap flex-row items-center border-b border-gray-200 dark:border-gray-700 dark:bg-opacity-40 dark:hover:bg-opacity-20 py-3">
                <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                  <div className="flex justify-center mx-auto w-8 h-8 rounded-full bg-gray-400 text-white">
                    <div className="self-center w-4 h-4"><BellSlash /></div>
                  </div>
                </div>
                <div className="flex-shrink max-w-full px-2 w-3/4">
                  <div className="text-gray-600 text-sm mt-1">{text_notif.noNotif}</div>
                </div>
              </div>
            </div>
            }
          </div>

          {/* footer notification */}
          <div className="p-3 text-center font-normal">
            <Link to={text_notif.footer_url} className="hover:underline">{text_notif.footer_text}</Link>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}