import React from 'react';
import { Envelope, Bell } from 'react-bootstrap-icons';

// components
import { Preloader, Row, Column, Card, Prism, Notif } from "@/components/reactdash-ui";

export default function NotificationDocs() {
  // page title
  const page_title = "Notification";
  const data_one = {count: 2, icon: <Envelope className="w-6 h-6" />}
  const data_two = {count: 3, icon: <Bell className="w-6 h-6" />}

  // prism code
  const datacode1 = `
import React from 'react';
import { Envelope, Bell } from 'react-bootstrap-icons';
import { Notif } from "@/components/reactdash-ui";

export default function Notifications() {
  const data_one = {count: 2, icon: <Envelope className="w-6 h-6" />}
  const data_two = {count: 3, icon: <Bell className="w-6 h-6" />}

  return (
    <>
      {/* notif icon */}
      <Notif count={data_one.count} icon={data_one.icon} className="mr-4"/>
      <Notif count={data_two.count} icon={data_two.icon}/>
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
            <p className="text-lg mb-6 font-light">Notifications are a small, urgent component to notify users that there are new incoming messages or notifications on their dashboard.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example notification</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Notif count={data_one.count} icon={data_one.icon} className="mr-4"/>
              <Notif count={data_two.count} icon={data_two.icon}/>
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
                  <td><b>count</b></td>
                  <td>Notification count</td>
                  <td>Number of notification ex: <code>1, 2, 3, 4, 5 or others</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>icon</b></td>
                  <td>Notification icon</td>
                  <td>( bootstrap icon )</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
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