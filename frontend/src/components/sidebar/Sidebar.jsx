import React from "react";
import {
  HouseDoor, Shop, Briefcase, FileEarmarkRichtext, BoxArrowInRight, WindowSidebar,
  LayoutSidebarInset, Layers, ColumnsGap, CardList, BlockquoteRight, BarChartLine,
  FileText
} from 'react-bootstrap-icons';
import { Banner } from "@/components/widgets";
import { SubmenuAccordion } from "@/components/reactdash-ui";

export default function Sidebar({ closeMobile, ...props }) {
  // Data sidebar menu (props.data)
  const sideitems = [
    {
      id: 1, title: 'Dashboards', url: '/dashboard/', icon: <HouseDoor />,
      submenu: [
        { id: 101, title: 'CMS', url: '/dashboard/cms', },
        { id: 102, title: 'Analytics', url: '/dashboard/analytics', },
        { id: 103, title: 'Ecommerce', url: '/dashboard/ecommerce', },
        { id: 104, title: 'Projects', url: '/dashboard/projects', },
        { id: 105, title: 'CRM', url: '/dashboard/crm', },
        { id: 106, title: 'Hosting', url: '/dashboard/hosting', },
        { id: 107, title: 'Saas', url: '/dashboard/saas', },
        { id: 108, title: 'Sales', url: '/dashboard/sales', },
        { id: 109, title: 'Marketing', url: '/dashboard/marketing', },
      ],
    },
    {
      id: 3, title: 'Ecommerce', url: '/ecommerce/', icon: <Shop />,
      submenu: [
        { id: 301, title: 'Products', url: '/ecommerce/products', },
        { id: 302, title: 'Product detail', url: '/ecommerce/product-detail', },
        { id: 303, title: 'Orders', url: '/ecommerce/orders', },
        { id: 304, title: 'Order detail', url: '/ecommerce/order-detail', },
        { id: 305, title: 'Customers', url: '/ecommerce/customers', },
        { id: 306, title: 'Shopping Cart', url: '/ecommerce/shopping-cart', },
        { id: 307, title: 'Checkout', url: '/ecommerce/checkout', },
        { id: 308, title: 'Sellers', url: '/ecommerce/sellers', },
        { id: 309, title: 'Invoice', url: '/ecommerce/invoice', },
      ],
    },
    {
      id: 4, title: 'Projects', url: '/project/', icon: <Briefcase />,
      submenu: [
        { id: 401, title: 'Lists', url: '/project/project-lists', },
        { id: 402, title: 'Details', url: '/project/project-detail', },
        { id: 403, title: 'Kanban', url: '/project/kanban', },
        { id: 404, title: 'Create', url: '/project/create-project', },
      ]
    },
    {
      id: 5, title: 'Pages', url: '/pages', icon: <FileEarmarkRichtext />,
      submenu: [
        { id: 501, title: 'Profile', url: '/pages/profile', },
        { id: 502, title: 'Services', url: '/pages/services', },
        { id: 503, title: 'Faq', url: '/pages/faq', },
        { id: 504, title: 'Pricing', url: '/pages/pricing', },
        { id: 505, title: 'Maintenance', url: '/maintenance', },
        { id: 506, title: '404', url: '/pages/404', },
        { id: 507, title: 'Starter', url: '/pages/starter', },
      ],
    },
    {
      id: 6, title: 'Auth', url: '/auth', icon: <BoxArrowInRight />,
      submenu: [
        { id: 601, title: 'Register Cover', url: '/auth2/register', },
        { id: 602, title: 'Login Cover', url: '/auth2/login', },
        { id: 603, title: 'Register Ilustration', url: '/auth3/register', },
        { id: 604, title: 'Login Ilustration', url: '/auth3/login', },
        { id: 605, title: 'Register Basic', url: '/auth/register', },
        { id: 606, title: 'Login Basic', url: '/auth/login', },
        { id: 607, title: 'Forgot Password', url: '/auth/forgot', },
        { id: 608, title: 'Confirm Email', url: '/auth/confirm', },
        { id: 609, title: 'Change Password', url: '/auth/change-password', },
        { id: 610, title: 'Logout Page', url: '/auth/logout', },
      ]
    },
    { id: 7, title: 'Landing Page', url: '/landing-page', icon: <WindowSidebar /> },
    {
      id: 8, title: 'Layouts', url: '/layouts', icon: <LayoutSidebarInset />,
      submenu: [
        { id: 801, title: 'Side Dark', url: '/side-dark', },
        { id: 802, title: 'Compact', url: '/compact', }
      ]
    },
    {
      id: 9, title: 'Components', url: '/components', icon: <Layers />,
      submenu: [
        { id: 901, title: 'Accordion', url: '/components/accordion', },
        { id: 902, title: 'Alerts', url: '/components/alerts', },
        { id: 903, title: 'Avatar', url: '/components/avatar', },
        { id: 904, title: 'Badge', url: '/components/badge', },
        { id: 905, title: 'Breadcrumb', url: '/components/breadcrumb', },
        { id: 906, title: 'Buttons', url: '/components/buttons', },
        { id: 907, title: 'Card', url: '/components/cards', },
        { id: 908, title: 'Carousel', url: '/components/carousel', },
        { id: 909, title: 'Collapse', url: '/components/collapse', },
        { id: 910, title: 'Devices', url: '/components/devices', },
        { id: 911, title: 'Dropdowns', url: '/components/dropdowns', },
        { id: 912, title: 'Grid', url: '/components/grid', },
        { id: 913, title: 'List Group', url: '/components/list-group', },
        { id: 915, title: 'Map', url: '/components/map', },
        { id: 916, title: 'Modal', url: '/components/modal', },
        { id: 917, title: 'Navbar', url: '/components/navbar', },
        { id: 918, title: 'Notification', url: '/components/notification', },
        { id: 920, title: 'Offcanvas', url: '/components/offcanvas', },
        { id: 921, title: 'Pagination', url: '/components/pagination', },
        { id: 922, title: 'Popovers', url: '/components/popovers', },
        { id: 923, title: 'Progress', url: '/components/progress', },
        { id: 924, title: 'Ribbon', url: '/components/ribbon', },
        { id: 925, title: 'Scrollbar', url: '/components/scrollbar', },
        { id: 926, title: 'Spinner', url: '/components/spinner', },
        { id: 927, title: 'Sweet Alert', url: '/components/sweetalert', },
        { id: 928, title: 'Tabs', url: '/components/tabs', },
        { id: 929, title: 'Tooltips', url: '/components/tooltips', },
        { id: 930, title: 'Submenu', url: '/components/submenu', },
        { id: 931, title: 'Formatter', url: '/components/formatter', },
        { id: 932, title: 'Rating', url: '/components/rating', },
      ]
    },
    { id: 10, title: 'Widgets', url: '/app/widgets', icon: <ColumnsGap /> },
    {
      id: 11, title: 'Forms', url: '/forms', icon: <CardList />,
      submenu: [
        { id: 1101, title: 'Input', url: '/forms/input', },
        { id: 1102, title: 'Input Label', url: '/forms/inputlabel', },
        { id: 1103, title: 'Input Group', url: '/forms/inputgroup', },
        { id: 1104, title: 'Select', url: '/forms/select', },
        { id: 1105, title: 'Checkbox Radio', url: '/forms/checkbox-radio', },
        { id: 1106, title: 'Switch Range', url: '/forms/switch-range', },
        { id: 1107, title: 'Advance', url: '/forms/advance', },
        { id: 1108, title: 'Example Forms', url: '/forms/forms-example', }
      ]
    },
    {
      id: 12, title: 'Content', url: '/content', icon: <BlockquoteRight />,
      submenu: [
        { id: 1201, title: 'Typography', url: '/content/typography', },
        { id: 1202, title: 'Tables', url: '/content/tables', },
        { id: 1203, title: 'Icons', url: '/content/icons', },
      ]
    },
    { id: 13, title: 'Charts', url: '/components/chart', icon: <BarChartLine /> },
    {
      id: 15, title: 'Documentation', url: '/start', icon: <FileText />,
      submenu: [
        { id: 1501, title: 'Introduction', url: '/start/introduction', },
        { id: 1503, title: 'Customize', url: '/start/customize', },
        { id: 1505, title: 'Credits', url: '/start/credits', },
        { id: 1506, title: 'Changelogs', url: '/start/changelogs', },
      ]
    }
  ]
  // logo (props.logo)
  const logo = { img: '/img/logo.png', text: 'Reactdash' }
  const models = {
    "compact": "sidebar-compact w-0 md:w-20",
    "default": "sidebar-area w-64"
  }
  const colors = {
    "dark": "dark",
    "light": "light"
  }
  const addmodel = props.model ? models[props.model] : 'sidebar-area w-64';
  const addcolor = props.color ? colors[props.color] : '';
  const addClass = props.className ? `${props.className} ` : '';

  return (
    <nav id="sidebar-menu" className={`${addClass}fixed ${addmodel} ${addcolor} transition-all duration-500 ease-in-out h-screen shadow-sm`}>
      <div className="h-full bg-white dark:bg-gray-800 overflow-y-auto scrollbars">
        {/* logo */}
        {logo ?
          <div className="mh-18 text-center py-5">
            <h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden hidden-compact">
              <img className="inline-block w-8 h-8 ltr:mr-2 rtl:ml-2 -mt-1" src={logo.img} />
              <span className="text-gray-700 dark:text-gray-200">{logo.text}</span>
            </h2>
            <h2 className="text-3xl font-semibold mx-auto logo-compact hidden">
              <img className="inline-block w-8 h-8 -mt-1" src={logo.img} />
            </h2>
          </div>
          : ''}

        {/* sidebar menu */}
        <ul id="side-menu" className="w-full float-none flex flex-col font-medium ltr:pl-1.5 rtl:pr-1.5">
          <SubmenuAccordion data={sideitems} closeMobile={closeMobile} />
        </ul>

        {/* Banner */}
        <div className="px-4">
          <Banner />
        </div>
      </div>
    </nav>
  )
}