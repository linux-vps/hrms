import React from 'react';
import { Alarm,HouseDoor,Envelope,ChatDots,BarChart,Folder,
  ShopWindow,Airplane,Calendar,Facebook,Twitter,Youtube,
  Instagram,Tiktok,Linkedin,Pinterest,Whatsapp,Google } from 'react-bootstrap-icons';

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function IconsDocs() {
  // page title
  const page_title = "Bootstrap Icons";
  // prism code
  const datacode1 = `
import React from 'react';
import { Alarm,HouseDoor,Envelope,ChatDots,BarChart,Folder,
  ShopWindow,Airplane,Calendar,Facebook,Twitter,Youtube,
  Instagram,Tiktok,Linkedin,Pinterest,Whatsapp,Google } from 'react-bootstrap-icons';

export default function IconsExp() {

    return (
      <>
      {/* Example Icons */}
      <Alarm className="w-8 h-8 inline-block mr-4" />
      <HouseDoor className="w-8 h-8 inline-block mr-4" />
      <Envelope className="w-8 h-8 inline-block mr-4" />
      <ChatDots className="w-8 h-8 inline-block mr-4" />
      <BarChart className="w-8 h-8 inline-block mr-4" />
      <Folder className="w-8 h-8 inline-block mr-4" />
      <ShopWindow className="w-8 h-8 inline-block mr-4" />
      <Airplane className="w-8 h-8 inline-block mr-4" />
      <Calendar className="w-8 h-8 inline-block mr-4" />

      {/* Brands */}
      <Facebook className="w-8 h-8 inline-block mr-4"/>
      <Twitter className="w-8 h-8 inline-block mr-4"/>
      <Youtube className="w-8 h-8 inline-block mr-4"/>
      <Instagram className="w-8 h-8 inline-block mr-4"/>
      <Tiktok className="w-8 h-8 inline-block mr-4"/>
      <Linkedin className="w-8 h-8 inline-block mr-4"/>
      <Pinterest className="w-8 h-8 inline-block mr-4"/>
      <Whatsapp className="w-8 h-8 inline-block mr-4"/>
      <Google className="w-8 h-8 inline-block mr-4"/>
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
            <p className="text-lg mb-6 font-light">By default this theme uses font icons from Bootstrap </p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Icons</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-5">
              <Alarm className="w-8 h-8 inline-block mr-4" />
              <HouseDoor className="w-8 h-8 inline-block mr-4" />
              <Envelope className="w-8 h-8 inline-block mr-4" />
              <ChatDots className="w-8 h-8 inline-block mr-4" />
              <BarChart className="w-8 h-8 inline-block mr-4" />
              <Folder className="w-8 h-8 inline-block mr-4" />
              <ShopWindow className="w-8 h-8 inline-block mr-4" />
              <Airplane className="w-8 h-8 inline-block mr-4" />
              <Calendar className="w-8 h-8 inline-block mr-4" />
            </Card>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <Facebook className="w-8 h-8 inline-block mr-4"/>
              <Twitter className="w-8 h-8 inline-block mr-4"/>
              <Youtube className="w-8 h-8 inline-block mr-4"/>
              <Instagram className="w-8 h-8 inline-block mr-4"/>
              <Tiktok className="w-8 h-8 inline-block mr-4"/>
              <Linkedin className="w-8 h-8 inline-block mr-4"/>
              <Pinterest className="w-8 h-8 inline-block mr-4"/>
              <Whatsapp className="w-8 h-8 inline-block mr-4"/>
              <Google className="w-8 h-8 inline-block mr-4"/>
            </Card>
            <p>Complete icons available in here <a className="text-indigo-500 hover:underline" target="_blank" href="https://getbootstrap.com/">Bootstrap Icons</a></p>

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