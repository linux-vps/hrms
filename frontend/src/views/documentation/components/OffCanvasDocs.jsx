import React from 'react';
import { Twitter, Facebook, Instagram, Youtube } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card, Prism, OffCanvas, OffCanvasMenu, Avatar, ListGroup, Button } from "@/components/reactdash-ui";

export default function OffCanvasDocs() {
  // page title
  const page_title = "OffCanvas";
  // Offcanvas Menu
  const content = {logo: "/img/logo.png", text:"Copyright Taildash - All right reserved"}
  const list_menu = [
    {id: 1, title: "List Item 1", url: "/1"},
    {id: 2, title: "Dropdown 1", url: "/2",
      submenu: [
        { id: 21, title: 'Sub item', url: '/21', },
        { id: 22, title: 'Sub item', url: '/22', },
        { id: 23, title: 'Sub item', url: '/23', },
      ]
    },
    {id: 3, title: "Dropdown 2", url: "/3",
      submenu: [
        { id: 31, title: 'Sub item', url: '/31', },
        { id: 32, title: 'Sub item', url: '/32', },
        { id: 33, title: 'Sub item', url: '/33', },
      ]
    },
    {id: 4, title: "List Item 3", url: "/4"},
    {id: 5, title: "List Item 4", url: "/5"},
    {id: 6, title: "List Item 5", url: "/6"},
  ]

  const data_avatar = {img: '/img/avatar/avatar.png', name: 'Roman Davis'};
  // data list
  const data_list = [
    { title: 'About Us', url: '/' },
    { title: 'Portfolio', url: '/' },
    { title: 'Skill', url: '/' },
    { title: 'Contact', url: '/' },
    { title: 'History', url: '/' }
  ]

  // prism code
  const datacode1 = `
import React from 'react';
import { OffCanvasMenu } from "@/components/reactdash-ui";

export default function OffCanvass() {
  // Offcanvas Menu
  const content = {logo: "/img/logo.png", text:"Copyright Taildash - All right reserved"}
  const list_menu = [
    {id: 1, title: "List Item 1", url: "/1"},
    {id: 2, title: "Dropdown 1", url: "/2",
      submenu: [
        { id: 21, title: 'Sub item', url: '/21', },
        { id: 22, title: 'Sub item', url: '/22', },
        { id: 23, title: 'Sub item', url: '/23', },
      ]
    },
    {id: 3, title: "Dropdown 2", url: "/3",
      submenu: [
        { id: 31, title: 'Sub item', url: '/31', },
        { id: 32, title: 'Sub item', url: '/32', },
        { id: 33, title: 'Sub item', url: '/33', },
      ]
    },
    {id: 4, title: "List Item 3", url: "/4"},
    {id: 5, title: "List Item 4", url: "/5"},
    {id: 6, title: "List Item 5", url: "/6"},
  ]

  return (
    <>
      <OffCanvasMenu data={list_menu} content={content} placement="right" />
    </>
  )
}
  `;
  const datacode2 = `
import React from 'react';
import { Twitter, Facebook, Instagram, Youtube } from 'react-bootstrap-icons';
import { OffCanvas, Avatar, ListGroup, Button } from "@/components/reactdash-ui";

export default function OffCanvass() {
  const data_avatar = {img: '/img/avatar/avatar.png', name: 'Roman Davis'};
  // data list
  const data_list = [
    { title: 'About Us', url: '/' },
    { title: 'Portfolio', url: '/' },
    { title: 'Skill', url: '/' },
    { title: 'Contact', url: '/' },
    { title: 'History', url: '/' }
  ]

  return (
    <>
    <OffCanvas placement="left">
      <div className="p-6 text-center">
        <Avatar data={data_avatar} size="small" />
        <h3 className="heading-6 mt-4 mb-6 font-bold">{data_avatar.name}</h3>
        <ListGroup data={data_list} variant="lessborder" className="mb-6"/>
        <div className="flex justify-center">
          {/* social media  */}
          <a href="https://facebook.com">
            <Button shape="circle" className="btn-twitter flex items-center mr-1">
              <Twitter />
            </Button>
          </a>
          <a href="https://twitter.com">
            <Button shape="circle" className="btn-facebook flex items-center mr-1">
              <Facebook />
            </Button>
          </a>
          <a href="https://youtube.com">
            <Button shape="circle" className="btn-youtube flex items-center mr-1">
              <Youtube />
            </Button>
          </a>
          <a href="https://instagram.com">
            <Button shape="circle" className="btn-instagram flex items-center mr-1">
              <Instagram />
            </Button>
          </a>
        </div>
      </div>
    </OffCanvas>
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
            <p className="text-lg mb-6 font-light">Build hidden sidebars into your project for navigation, shopping carts, and more with a few classes and React Hook.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">OffcanvasMenu</h2>
            
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <OffCanvasMenu data={list_menu} content={content} placement="right" />
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
                  <td><b>data</b></td>
                  <td>Data listmenu</td>
                  <td>data ( <code>id</code> | <code>title</code> | <code>url</code> )</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>content</b></td>
                  <td>Content logo and text</td>
                  <td>data ( <code>logo | text</code> )</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>placement</b></td>
                  <td>Offcanvas Placement</td>
                  <td><code>'left' | 'right'</code></td>
                  <td><code>'right'</code></td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Offcanvas Custom</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <OffCanvas placement="left">
                <div className="p-6 text-center">
                  <Avatar data={data_avatar} size="small" />
                  <h3 className="heading-6 mt-4 mb-6 font-bold">{data_avatar.name}</h3>
                  <ListGroup data={data_list} variant="lessborder" className="mb-6"/>
                  <div className="flex justify-center">
                    {/* social media  */}
                    <a href="https://facebook.com">
                      <Button shape="circle" className="btn-twitter flex items-center mr-1">
                        <Twitter />
                      </Button>
                    </a>
                    <a href="https://twitter.com">
                      <Button shape="circle" className="btn-facebook flex items-center mr-1">
                        <Facebook />
                      </Button>
                    </a>
                    <a href="https://youtube.com">
                      <Button shape="circle" className="btn-youtube flex items-center mr-1">
                        <Youtube />
                      </Button>
                    </a>
                    <a href="https://instagram.com">
                      <Button shape="circle" className="btn-instagram flex items-center mr-1">
                        <Instagram />
                      </Button>
                    </a>
                  </div>
                </div>
              </OffCanvas>
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
                  <td><b>placement</b></td>
                  <td>Offcanvas Placement</td>
                  <td><code>'left' | 'right'</code></td>
                  <td><code>'right'</code></td>
                </tr>
                <tr>
                  <td><b>children</b></td>
                  <td>Custom content children</td>
                  <td><code>text, html, img, icon and etc</code></td>
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