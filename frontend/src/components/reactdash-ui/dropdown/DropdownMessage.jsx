import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { EnvelopeOpen, EnvelopeSlash } from 'react-bootstrap-icons';
import { Notif } from '@/components/reactdash-ui';
import TimeAgo from 'react-timeago';

export default function DropdownMessage(props) {
  // Data messages
  const allmessages = props.data;
  // Sort messages
  const datamessages = [...allmessages].sort((a, b) => b.id - a.id);
  const messagescount1 =  datamessages.filter(messages => messages.read === false).length;

  // Head & footer dropdown text and link
  const text_msg = props.data_text;
  const UserOnline = true;

  // delete Messages
  const [messagescount, setData] = useState(messagescount1);
  const data1 = 0;
  const resetMessages = () => {
    setData(data1);
  };

  return (
    <Menu>
      <MenuButton className="py-3 px-4 flex text-sm rounded-full focus:outline-none" id="user-messages">
        <div className="relative inline-block">
          <Notif count={messagescount} icon={text_msg.notificon}/>
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
        <MenuItems as="div" className="w-72 transform translate-x-28 lg:translate-x-0 origin-top-right absolute ltr:right-0 rtl:left-0 rounded top-full z-50 py-0.5 ltr:text-left rtl:text-right bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md">
          {/* Head messages */}
          <div className="p-3 font-normal border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="font-bold">{text_msg.title}</div>
              <div className="absolute top-0 ltr:right-0 rtl:left-0">
                <div className="flex flex-row items-center">
                  <Link to={text_msg.new_url} className="ltr:mr-4 rtl:ml-4" title="Send message">
                    {text_msg.new_icon}
                  </Link>
                  <button onClick={resetMessages} className="ltr:mr-2 rtl:ml-2" title="Mark all as read">
                    <EnvelopeOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Body messages */}
          <div className="max-h-60 overflow-y-auto scrollbars show">
          {messagescount > 0 ?
            datamessages.filter(messages => messages.read === false).map(filteredmessages => (
            <Link key={filteredmessages.id} to={filteredmessages.url} className="relative">
              <div className="flex flex-wrap flex-row items-center border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-40 dark:hover:bg-opacity-20 py-2 hover:bg-gray-100 bg-gray-50">
                <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                  <div className="relative">
                    <img src={filteredmessages.img} className="h-10 w-10 rounded-full mx-auto" alt={filteredmessages.name} />
                    {/* online status  */}
                    {UserOnline === true ?
                    <span title="online" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-green-500 border border-white w-3 h-3 rounded-full"></span>
                    :
                    <span title="offline" className="flex justify-center absolute -bottom-0.5 ltr:right-2 rtl:left-2 text-center bg-gray-500 border border-white w-3 h-3 rounded-full"></span>
                    }
                  </div>
                </div>
                <div className="flex-shrink max-w-full px-2 w-3/4">
                  <div className="text-sm font-bold">{filteredmessages.name}</div>
                  <div className="text-gray-500 text-sm mt-1">{filteredmessages.msg}</div>
                  <div className="text-gray-500 text-sm mt-1"><TimeAgo date={filteredmessages.time} /></div>
                </div>
              </div>
            </Link>
          ))
          :
          <div className="relative">
            <div className="flex flex-wrap flex-row items-center border-b border-gray-200 dark:border-gray-700 dark:bg-opacity-40 dark:hover:bg-opacity-20 py-3">
              <div className="flex-shrink max-w-full px-2 w-1/4 text-center">
                <div className="flex justify-center mx-auto w-8 h-8 rounded-full bg-gray-400 text-white">
                  <div className="self-center w-4 h-4"><EnvelopeSlash /></div>
                </div>
              </div>
              <div className="flex-shrink max-w-full px-2 w-3/4">
                <div className="text-gray-600 text-sm mt-1">{text_msg.noMsg}</div>
              </div>
            </div>
          </div>
          }
          </div>

          {/* footer messages */}
          <div className="p-3 text-center font-normal">
            <Link to={text_msg.footer_url} className="hover:underline">{text_msg.footer_text}</Link>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}