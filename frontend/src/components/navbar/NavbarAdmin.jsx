import React, { useState } from "react";
import { Envelope, PencilSquare, Calendar, Gear, ChatDots, HandThumbsUp, 
  QuestionCircle, Translate, BoxArrowRight, Bell, List, FilterLeft } from 'react-bootstrap-icons';
import { SearchForm, DropdownUser, DropdownNotif, DropdownMessage, Switch } from "@/components/reactdash-ui";

export default function NavbarAdmin(props) {
  // set toggle dark
  const [isDark, setDark] = useState(false);
  // dark mode on
  isDark === true ?
  document.documentElement.classList.add('dark')
  :
  document.documentElement.classList.remove('dark')

  // Dropdown text Messages
  const text_msg = { 
    title: "Messages", noMsg: "No Messages Yet", 
    notificon: <Envelope className="w-6 h-6" />,
    new_icon: <PencilSquare />, new_url: "/", 
    footer_text: "See all Mesaages", footer_url : "/" 
  }
  // Data messages
  const data_dropdown_message = [
    { id: 1, name: 'Daniel Zuric', msg: 'What do you think about this project?', time: '2024-04-09T23:50:21.817Z', img: '/img/avatar/avatar2.png', url: '/',  read: true },
    { id: 2, name: 'Carlos Garcia', msg: 'Hello, how are you friends?', time: '2024-05-09T23:50:21.817Z', img: '/img/avatar/avatar3.png', url: '/',  read: true },
    { id: 3, name: 'Fernando', msg: 'Thank you for your help today.', time: '2024-05-09T23:50:21.817Z', img: '/img/avatar/avatar4.png', url: '/',  read: false },
    { id: 4, name: 'Luis Diaz', msg: 'Do you have time? I want to call you.', time: '2024-05-09T23:50:21.817Z', img: '/img/avatar/avatar5.png', url: '/',  read: false },
    { id: 5, name: 'Ronald Zonin', msg: 'How are you today?', time: '2024-05-09T23:50:21.817Z', img: '/img/avatar/avatar6.png', url: '/',  read: false }
  ];

  // Data notification
  const data_dropdown_notif = [
    { id: 1, title: 'Event will coming', msg: 'Meeting with Mr.John Navas at:10.00Am', time: '2024-04-09T23:50:21.817Z', icon: <Calendar />, url: '/',  read: true },
    { id: 2, title: 'Maintenance', msg: 'Server Maintenance', time: '2024-05-09T23:50:21.817Z', icon: <Gear />, url: '/',  read: true },
    { id: 3, title: 'Carlos Comment', msg: 'Carlos Comment in your post', time: '2024-05-09T23:50:21.817Z', icon: <ChatDots />, url: '/',  read: true },
    { id: 4, title: 'Daniel Comment', msg: 'Daniel Comment in your post', time: '2024-05-09T23:50:21.817Z', icon: <ChatDots />, url: '/',  read: false },
    { id: 5, title: 'New Like', msg: 'Danilo Like your Post', time: '2024-05-09T23:50:21.817Z', icon: <HandThumbsUp />, url: '/',  read: false }
  ];
  // Head & footer text notification
  const text_notif = { 
    title: "Notification", noNotif: "No Notifications Yet", 
    notificon: <Bell className="w-6 h-6" />,
    footer_text: "See all Notification", footer_url : "/"
  }

  // Data admin ( DropdownUser )
  const data_user = {
    name: "Ari budin",
    img: "/img/avatar/avatar.png",
    info: "Professional Front end developer",
  }
  // list dropdown user
  const data_dropdown_user = [
    { title: 'Setting Privacy', url: '/', icon: <Gear /> },
    { title: 'Help Support', url: '/', icon: <QuestionCircle /> },
    { title: 'Change Language', url: '/', icon: <Translate /> },
    { title: 'Sign Out', url: '/', icon: <BoxArrowRight /> },
  ]
  const models = {
    "compact": "navtop-compact",
    "default": "navtop-area"
  }
  const addmodel = props.model ? models[props.model] : 'navtop-area';

  return (
    <nav className={`${addmodel} z-50 fixed flex flex-row flex-nowrap items-center justify-between mt-0 py-1 px-6 bg-white dark:bg-gray-800 shadow-sm transition-all duration-500 ease-in-out`} id="desktop-menu">
      {/* toggle button */}
      <button onClick={props.dataToggle} id="navbartoggle" type="button" className="inline-flex items-center justify-center text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none focus:ring-0">
        <span className="sr-only">Mobile menu</span>
        <List className="sidenav-hidden h-8 w-8" />
        <FilterLeft className="sidenav-block h-8 w-8" />
      </button>
      
      {/* Search Form */}
      <SearchForm />

      {/* top menu */}
      <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
        <li className="relative pr-4">
          <Switch name="lightdark" value="1" checked={isDark} id="labele" onChange={()=>setDark(!isDark)} />
        </li>
        <li className="relative">
          <DropdownMessage data={data_dropdown_message} data_text={text_msg} />
        </li>
        <li className="relative">
          <DropdownNotif data={data_dropdown_notif} data_text={text_notif} />
        </li>
        <li className="relative">
          <DropdownUser data={data_dropdown_user} user={data_user} />
        </li>
      </ul>
    </nav>
  )
}