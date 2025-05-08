import React from 'react';
import { Star, Pencil, Gear, Facebook, Twitter, Youtube, Instagram, Tiktok, Linkedin, Whatsapp, Envelope } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Button, ButtonGroup, Card, Spinner, Prism } from "@/components/reactdash-ui";

export default function ButtonDocs() {
  // page title
  const page_title = "Button";
  const page_title1 = "Button Group";

  // prism code
  const datacode1 = `
import React from 'react'
import { Button } from "@/components/reactdash-ui";

export default function Buttons() {
    return (
      <>
      {/* colors */}
      <Button color="primary">Primary Button</Button>
      <Button color="secondary">Secondary Button</Button>
      <Button color="success">Success Button</Button>
      <Button color="info">Info Button</Button>
      <Button color="warning">Warning Button</Button>
      <Button color="danger">Danger Button</Button>
      <Button color="light">Light Button</Button>
      <Button color="dark">Dark Button</Button>

      {/* two tone colors */}
      <Button color="twotone-primary">Primary TwoTone</Button>
      <Button color="twotone-secondary">Secondary TwoTone</Button>
      <Button color="twotone-success">Success TwoTone</Button>
      <Button color="twotone-info">Info TwoTone</Button>
      <Button color="twotone-warning">Warning TwoTone</Button>
      <Button color="twotone-danger">Danger TwoTone</Button>
      <Button color="twotone-light">Light TwoTone</Button>
      <Button color="twotone-dark">Dark TwoTone</Button>
      </>
    )
}
  `;

  const datacode2 = `
import React from 'react'
import { Button } from "@/components/reactdash-ui";

export default function Buttons() {
    return (
      <>
      {/* outline colors */}
      <Button color="outline-primary">Primary Outline</Button>
      <Button color="outline-secondary">Secondary Outline</Button>
      <Button color="outline-success">Success Outline</Button>
      <Button color="outline-info">Info Outline</Button>
      <Button color="outline-warning">Warning Outline</Button>
      <Button color="outline-danger">Danger Outline</Button>
      <Button color="outline-light">Light Outline</Button>
      <Button color="outline-dark">Dark Outline</Button>

      {/* gradient colors */}
      <Button color="gradient-primary">Primary Gradient</Button>
      <Button color="gradient-secondary">Secondary Gradient</Button>
      <Button color="gradient-success">Success Gradient</Button>
      <Button color="gradient-info">Info Gradient</Button>
      <Button color="gradient-warning">Warning Gradient</Button>
      <Button color="gradient-danger">Danger Gradient</Button>
      <Button color="gradient-light">Light Gradient</Button>
      <Button color="gradient-dark">Dark Gradient</Button>
      </>
    )
}
  `;

  const datacode3 = `
import React from 'react'
import { Button, Spinner } from "@/components/reactdash-ui";
import { Star, Pencil, Gear } from 'react-bootstrap-icons';

export default function Buttons() {
    return (
      <>
        {/* button size  */}
        <Button size="small">Small Button</Button>
        <Button size="medium">Medium Button</Button>
        <Button size="large">Large Button</Button>
        
        {/* button shape  */}
        <Button shape="pill">Pill Button</Button>
        <Button shape="rounded">Rounded Button</Button>
        <Button shape="square">Square Button</Button>
        
        {/* button disabled, loading, icon, block an custom css  */}
        <Button color="disabled" disabled>Disabled Button</Button>
        <Button color="warning" className="inline-flex items-center">
          Rating<Star className="ml-1 w-4 h-4"/>
        </Button>
        <Button color="primary" className="inline-flex items-center">
          <Pencil className="mr-1 w-4 h-4"/>Edit
        </Button>
        <Button color="info" className="inline-flex items-center">
          <Gear className="mr-1 w-4 h-4"/>Setting
        </Button>
        <Button className="inline-flex items-center">
          <Spinner color="warning" size="x-small" className="mr-2"/>Loading...
        </Button>
        <Button className="!block w-full">Button Block</Button>
      </>
    )
}
  `;

  const datacode4 = `
  import React from 'react'
  import { Button } from "@/components/reactdash-ui";
  import { Facebook, Twitter, Youtube, Instagram, Tiktok, Linkedin, Whatsapp, Envelope } from 'react-bootstrap-icons';

  export default function Buttons() {
      return (
        <>
          {/* social media  */}
          <Button className="btn-twitter">
            <Twitter className="mr-1"/>Twitter
          </Button>
          <Button className="btn-facebook">
            <Facebook className="mr-1"/>Facebook
          </Button>
          <Button className="btn-youtube">
            <Youtube className="mr-1"/>Youtube
          </Button>
          <Button className="btn-instagram">
            <Instagram className="mr-1"/>Instagram
          </Button>
          <Button className="btn-linkedin">
            <Linkedin className="mr-1"/>Linkedin
          </Button>
          <Button className="btn-tiktok">
            <Tiktok className="mr-1"/>TikTok
          </Button>
          <Button className="btn-whatsapp">
            <Whatsapp className="mr-1"/>Whatsapp
          </Button>
          <Button color="light" className="inline-flex items-center">
            <Envelope className="mr-1"/>Email
          </Button>

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
        </>
      )
  }
    `;

    const datacode5 = `
  import React from 'react'
  import { Button, ButtonGroup } from "@/components/reactdash-ui";

  export default function ButtonsGroup() {
      return (
        <>
          {/* Button Group Vertical  */}
          <ButtonGroup direction="vertical">
            <Button color="primary">Left</Button>
            <Button color="primary">Center</Button>
            <Button color="primary">Right</Button>
          </ButtonGroup>

          {/* Button Group horizontal  */}
          <ButtonGroup direction="horizontal" >
            <Button color="outline-primary">Left</Button>
            <Button color="outline-primary">Center</Button>
            <Button color="outline-primary">Right</Button>
          </ButtonGroup>
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
            <p className="text-lg mb-6 font-light">Use Taildash custom button styles for actions in forms, dialogs, and more with multiple sizes, states, and more..</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Color</h2>
            <p className="mb-4 font-light">There are 33 choices of button 'color' colors like primary, secondary, warning, danger, light and dark. The default button color is primary.</p>
            <h2 className="text-base mb-2 font-semibold text-gray-800 dark:text-gray-300">Solid</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button color="primary" className="mr-3 mb-3">Primary Button</Button>
              <Button color="secondary" className="mr-3 mb-3">Secondary Button</Button>
              <Button color="success" className="mr-3 mb-3">Success Button</Button>
              <Button color="info" className="mr-3 mb-3">Info Button</Button>
              <Button color="warning" className="mr-3 mb-3">Warning Button</Button>
              <Button color="danger" className="mr-3 mb-3">Danger Button</Button>
              <Button color="light" className="mr-3 mb-3">Light Button</Button>
              <Button color="dark" className="mr-3 mb-3">Dark Button</Button>
            </Card>
            <h2 className="text-base mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">Two Tone</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button color="twotone-primary" className="mr-3 mb-3">Primary Two Tone</Button>
              <Button color="twotone-secondary" className="mr-3 mb-3">Secondary Two Tone</Button>
              <Button color="twotone-success" className="mr-3 mb-3">Success Two Tone</Button>
              <Button color="twotone-info" className="mr-3 mb-3">Info Two Tone</Button>
              <Button color="twotone-warning" className="mr-3 mb-3">Warning Two Tone</Button>
              <Button color="twotone-danger" className="mr-3 mb-3">Danger Two Tone</Button>
              <Button color="twotone-light" className="mr-3 mb-3">Light Two Tone</Button>
              <Button color="twotone-dark" className="mr-3 mb-3">Dark Two Tone</Button>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
            <h2 className="text-base mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">Outline</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button color="outline-primary" className="mr-3 mb-3">Primary Outline</Button>
              <Button color="outline-secondary" className="mr-3 mb-3">Secondary Outline</Button>
              <Button color="outline-success" className="mr-3 mb-3">Success Outline</Button>
              <Button color="outline-info" className="mr-3 mb-3">Info Outline</Button>
              <Button color="outline-warning" className="mr-3 mb-3">Warning Outline</Button>
              <Button color="outline-danger" className="mr-3 mb-3">Danger Outline</Button>
              <Button color="outline-light" className="mr-3 mb-3 bg-gray-500">Light Outline</Button>
              <Button color="outline-dark" className="mr-3 mb-3">Dark Outline</Button>
            </Card>
            <h2 className="text-base mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">Gradient</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button color="gradient-primary" className="mr-3 mb-3">Primary Gradient</Button>
              <Button color="gradient-secondary" className="mr-3 mb-3">Secondary Gradient</Button>
              <Button color="gradient-success" className="mr-3 mb-3">Success Gradient</Button>
              <Button color="gradient-info" className="mr-3 mb-3">Info Gradient</Button>
              <Button color="gradient-warning" className="mr-3 mb-3">Warning Gradient</Button>
              <Button color="gradient-danger" className="mr-3 mb-3">Danger Gradient</Button>
              <Button color="gradient-light" className="mr-3 mb-3">Light Gradient</Button>
              <Button color="gradient-dark" className="mr-3 mb-3">Dark Gradient</Button>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Size</h2>
            <p className="mb-4 font-light">Buttons come with three type of size, small, medium and large. The default size is medium.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button size="small" className="mr-3">Small Button</Button>
              <Button size="medium" className="mr-3">Medium Button</Button>
              <Button size="large" className="mr-3">Large Button</Button>
            </Card>
            <h2 className="text-lg mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">Shape</h2>
            <p className="mb-4 font-light">Border radius of the button.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button shape="pill" className="mr-3">Pill Button</Button>
              <Button shape="rounded" className="mr-3">Rounded Button</Button>
              <Button shape="square" className="mr-3">Square Button</Button>
              <Button shape="circle" className="mr-3"><Star /></Button>
            </Card>
            <h2 className="text-lg mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">className</h2>
            <p className="mb-4 font-light">Custom className for button.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button color="disabled" className="mr-3 mb-3" disabled>Disabled Button</Button>
              <Button color="warning" className="inline-flex items-center mr-3 mb-3">Rating<Star className="ml-1 w-4 h-4"/></Button>
              <Button color="primary" className="inline-flex items-center mr-3 mb-3"><Pencil className="mr-1 w-4 h-4"/>Edit</Button>
              <Button color="info" className="inline-flex items-center mr-3 mb-3"><Gear className="mr-1 w-4 h-4"/>Setting</Button>
              <Button className="inline-flex items-center mr-3 mb-3"><Spinner color="warning" size="x-small" className="mr-2"/>Loading...</Button>
              <Button className="!block w-full">Button Block</Button>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode3} />
            </div>
            <h2 className="text-lg mt-3 mb-2 font-semibold text-gray-800 dark:text-gray-300">Social Media</h2>
            <p className="mb-4 font-light">Social media button.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <Button className="btn-twitter mr-3 mb-3"><Twitter className="mr-1"/>Twitter</Button>
              <Button className="btn-facebook mr-3 mb-3"><Facebook className="mr-1"/>Facebook</Button>
              <Button className="btn-youtube mr-3 mb-3"><Youtube className="mr-1"/>Youtube</Button>
              <Button className="btn-instagram mr-3 mb-3"><Instagram className="mr-1"/>Instagram</Button>
              <Button className="btn-linkedin mr-3 mb-3"><Linkedin className="mr-1"/>Linkedin</Button>
              <Button className="btn-tiktok mr-3 mb-3"><Tiktok className="mr-1"/>TikTok</Button>
              <Button className="btn-whatsapp mr-3 mb-3"><Whatsapp className="mr-1"/>Whatsapp</Button>
              <Button color="light" className="inline-flex items-center mr-3 mb-3"><Envelope className="mr-1 w-4 h-4"/>Email</Button>
            </Card>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
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
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode4} />
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
                  <td><b>Color</b></td>
                  <td>Solid Color</td>
                  <td><code>'primary'</code> | <code>'secondary'</code> | <code>'success'</code> | <code>'info'</code> | <code>'warning'</code> | <code>'danger'</code> | <code>'light'</code> | <code>'dark'</code> | <code>'disabled'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Two tone Color</td>
                  <td><code>'twotone-primary'</code> | <code>'twotone-secondary'</code> | <code>'twotone-success'</code> | <code>'twotone-info'</code> | <code>'twotone-warning'</code> | <code>'twotone-danger'</code> | <code>'twotone-light'</code> | <code>'twotone-dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Outline Color</td>
                  <td><code>'outline-primary'</code> | <code>'outline-secondary'</code> | <code>'outline-success'</code> | <code>'outline-info'</code> | <code>'outline-warning'</code> | <code>'outline-danger'</code> | <code>'outline-light'</code> | <code>'outline-dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>color</b></td>
                  <td>Gradient Color</td>
                  <td><code>'gradient-primary'</code> | <code>'gradient-secondary'</code> | <code>'gradient-success'</code> | <code>'gradient-info'</code> | <code>'gradient-warning'</code> | <code>'gradient-danger'</code> | <code>'gradient-light'</code> | <code>'gradient-dark'</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>shape</b></td>
                  <td>Border radius of the button</td>
                  <td><code>'pill'</code> | <code>'rounded'</code> | <code>'square'</code> | <code>'circle'</code></td>
                  <td><code>'rounded'</code></td>
                </tr>
                <tr>
                  <td><b>size</b></td>
                  <td>Button size</td>
                  <td><code>'small'</code> | <code>'medium'</code> | <code>'large'</code></td>
                  <td><code>'medium'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>children</b></td>
                  <td>Custom content children</td>
                  <td><code>text, html, img, icon and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>onClick</b></td>
                  <td>Trigger parent components from button</td>
                  <td><code>function</code></td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>

      {/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4 mt-6">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title1}</p>
				</Column>
			</Row>

			{/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Used to group buttons with a predefined direction.</p>
            <h2 className="text-lg mb-2 font-semibold text-gray-800 dark:text-gray-300">Direction</h2>
            <p className="mb-4 font-light">There are 2 choices of button group 'direction' vertical and horizontal. The default direction is horizontal.</p>
            <h2 className="text-base mb-2 font-semibold text-gray-600 dark:text-gray-400">Vertical</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <ButtonGroup direction="vertical" className="mr-3" >
                <Button color="primary">Left</Button>
                <Button color="primary">Center</Button>
                <Button color="primary">Right</Button>
              </ButtonGroup>
              <ButtonGroup direction="vertical" >
                <Button color="outline-primary">Left</Button>
                <Button color="outline-primary">Center</Button>
                <Button color="outline-primary">Right</Button>
              </ButtonGroup>
            </Card>
            <h2 className="text-base mb-2 font-semibold text-gray-600 dark:text-gray-400">Horizontal</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-4">
              <ButtonGroup direction="horizontal" className="mr-3" >
                <Button color="primary">Left</Button>
                <Button color="primary">Center</Button>
                <Button color="primary">Right</Button>
              </ButtonGroup>
              <ButtonGroup direction="horizontal" >
                <Button color="outline-primary">Left</Button>
                <Button color="outline-primary">Center</Button>
                <Button color="outline-primary">Right</Button>
              </ButtonGroup>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode5} />
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
                  <td><b>direction</b></td>
                  <td>Button group direction</td>
                  <td><code>'vertical'</code> | <code>'horizontal'</code></td>
                  <td><code>'horizontal'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className for Alert</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
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