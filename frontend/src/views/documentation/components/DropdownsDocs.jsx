import React from 'react';
import { Envelope, PencilSquare, HandThumbsUp, Calendar, Gear, ChatDots, Bell, Translate, BoxArrowRight, QuestionCircle  } from 'react-bootstrap-icons';

// components
import { Preloader, Row, Column, Card, Prism, Dropdown, DropdownUser, DropdownNotif, DropdownMessage, DropdownCustom } from "@/components/reactdash-ui";

export default function DropdownsDocs() {
  // page title
  const page_title = "Dropdowns";
  
  // Data dropdown list
  const data_dropdown_list = [
    { title: 'Dropdown item1', url: '/1' },
    { title: 'Dropdown item2', url: '/2' },
    { title: 'Dropdown item3', url: '/3' },
    { title: 'Dropdown item4', url: '/4' },
    { title: 'Dropdown item5', url: '/5' }
  ];
  
  // Dropdown text Messages
  const text_msg = { 
    title: "Messages", noMsg: "No Messages Yet", 
    notificon: <Envelope className="w-6 h-6" />,
    new_icon: <PencilSquare />, new_url: "/new-message", 
    footer_text: "See all Mesaages", footer_url : "/messages/" 
  }
  // Data messages
  const data_dropdown_message = [
    { id: 1, name: 'Daniel Zuric', msg: 'What do you think about this project?', time: '2022-06-09T23:50:21.817Z', img: '/img/avatar/avatar2.png', url: '/',  read: true },
    { id: 2, name: 'Carlos Garcia', msg: 'Hello, how are you friends?', time: '2022-07-09T23:50:21.817Z', img: '/img/avatar/avatar3.png', url: '/',  read: true },
    { id: 3, name: 'Fernando', msg: 'Thank you for your help today.', time: '2022-07-09T23:50:21.817Z', img: '/img/avatar/avatar4.png', url: '/',  read: false },
    { id: 4, name: 'Luis Diaz', msg: 'Do you have time? I want to call you.', time: '2022-08-09T23:50:21.817Z', img: '/img/avatar/avatar5.png', url: '/',  read: false },
    { id: 5, name: 'Ronald Zonin', msg: 'How are you today?', time: '2022-09-09T23:50:21.817Z', img: '/img/avatar/avatar6.png', url: '/',  read: false }
  ];

  // Data notification
  const data_dropdown_notif = [
    { id: 1, title: 'Event will coming', msg: 'Meeting with Mr.John Navas at:10.00Am', time: '2022-06-09T23:50:21.817Z', icon: <Calendar />, url: '/',  read: true },
    { id: 2, title: 'Maintenance', msg: 'Server Maintenance', time: '2022-07-09T23:50:21.817Z', icon: <Gear />, url: '/',  read: true },
    { id: 3, title: 'Carlos Comment', msg: 'Carlos Comment in your post', time: '2022-07-09T23:50:21.817Z', icon: <ChatDots />, url: '/',  read: true },
    { id: 4, title: 'Daniel Comment', msg: 'Daniel Comment in your post', time: '2022-08-09T23:50:21.817Z', icon: <ChatDots />, url: '/',  read: false },
    { id: 5, title: 'New Like', msg: 'Danilo Like your Post', time: '2022-09-09T23:50:21.817Z', icon: <HandThumbsUp />, url: '/',  read: false }
  ];
  // Head & footer text notification
  const text_notif = { 
    title: "Notification", noNotif: "No Notifications Yet", 
    notificon: <Bell className="w-6 h-6" />,
    footer_text: "See all Notification", footer_url : "/notification/"
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

  // prism code
  const datacode1 = `
import React from 'react';
import { Dropdown, DropdownCustom } from "@/components/reactdash-ui";

export default function Dropdowns() {
  // Data dropdown list
  const data_dropdown_list = [
    { title: 'Dropdown item1', url: '/1' },
    { title: 'Dropdown item2', url: '/2' }
  ]

  return (
    <>
    {/* dropdown custom and dropdown listmenu */}
    <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
      <li className="relative">
        <DropdownCustom title="Dropdown custom" >
          <p className="p-4">Your custom html in here</p>
        </DropdownCustom>
      </li>

      <li className="relative">
        <Dropdown title="Dropdown title" data={data_dropdown_list} />
      </li>
    </ul>
    </>
  )
}
  `;

  const datacode2 = `
  import React from 'react';
  import { Envelope, PencilSquare, HandThumbsUp, Calendar, Gear, ChatDots, Bell, Translate, BoxArrowRight, QuestionCircle } 'react-bootstrap-icons';
  import { DropdownUser, DropdownNotif, DropdownMessage } from "@/components/reactdash-ui";
  
  export default function Dropdowns() {
    // Dropdown text Messages ( DropdownMessage )
    const text_msg = { 
      title: "Messages", noMsg: "No Messages Yet", 
      notificon: <Envelope className="w-6 h-6" />,
      new_icon: <PencilSquare />, new_url: "/new-message", 
      footer_text: "See all Mesaages", footer_url : "/messages/" 
    }
    // Data messages
    const data_dropdown_message = [
      { id: 1, name: 'Daniel Zuric', msg: 'What do you think about this project?', time: '2022-06-09T23:50:21.817Z', img: '/img/avatar/avatar2.png', url: '/',  read: true },
      { id: 2, name: 'Carlos Garcia', msg: 'Hello, how are you friends?', time: '2022-07-09T23:50:21.817Z', img: '/img/avatar/avatar3.png', url: '/',  read: true },
      { id: 3, name: 'Fernando', msg: 'Thank you for your help today.', time: '2022-07-09T23:50:21.817Z', img: '/img/avatar/avatar4.png', url: '/',  read: false }
    ];

    // Data notification ( DropdownNotif )
    const data_dropdown_notif = [
      { id: 1, title: 'Event will coming', msg: 'Meeting with Mr.John Navas at:10.00Am', time: '2022-06-09T23:50:21.817Z', icon: <Calendar />, url: '/',  read: true },
      { id: 2, title: 'Maintenance', msg: 'Server Maintenance', time: '2022-07-09T23:50:21.817Z', icon: <Gear />, url: '/',  read: true },
      { id: 3, title: 'Carlos Comment', msg: 'Carlos Comment in your post', time: '2022-07-09T23:50:21.817Z', icon: <ChatDots />, url: '/',  read: true }
    ];
    // Head & footer text notification
    const text_notif = { 
      title: "Notification", noNotif: "No Notifications Yet", 
      notificon: <Bell className="w-6 h-6" />,
      footer_text: "See all Notification", footer_url : "/notification/"
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

    return (
      <>
      <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
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
      </>
    )
  }
    `;

  return (
    <Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title}</p>
				</Column>
			</Row>

			{/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Toggle contextual overlays for displaying lists of links and more with Headless UI.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-700 dark:text-gray-300">Dropdown and Dropdown Custom</h2>
            
            <Card className="relative p-6 mb-6 border shadow-none">
              <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
                <li className="relative">
                  <DropdownCustom title="Dropdown custom" >
                    <p className="p-4">Your custom html in here</p>
                  </DropdownCustom>
                </li>
                <li className="relative">
                  <Dropdown title="Dropdown title" data={data_dropdown_list} />
                </li>
              </ul>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>title</b></td>
                  <td>Dropdown title / trigger text</td>
                  <td><code>your custom text</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>children</b></td>
                  <td>Custom content children</td>
                  <td><code>text, html, img, icon and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data for Dropdown list menu</td>
                  <td>Data ( <code>title | url</code> )</td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
            
            <h2 className="text-lg mb-4 font-semibold text-gray-700 dark:text-gray-300">DropdownMessage, DropdownNotif and DropdownUser</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <ul className="flex ltr:ml-auto rtl:mr-auto mt-2">
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
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>
            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>data</b></td>
                  <td>Data for dropdownMessagge</td>
                  <td>data ( <code>id | name | img | msg | time | url | read</code> ) </td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data_text</b></td>
                  <td>Data text & url for dropdownMessagge</td>
                  <td>data ( <code>title | noMsg | notificon | new_icon | new_url | footer_text | footer_url</code> ) </td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data for dropdownNotif</td>
                  <td>data ( <code>id | title | icon | msg | time | url | read</code> ) </td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data_text</b></td>
                  <td>Data text & url for dropdownNotif</td>
                  <td>data ( <code>title | noNotif | notificon | footer_text | footer_url</code> ) </td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data for dropdownUser</td>
                  <td>data ( <code>title | icon | url</code> ) </td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>user</b></td>
                  <td>Data user for dropdownUser</td>
                  <td>Data user ( <code>name | img | info</code> )</td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}