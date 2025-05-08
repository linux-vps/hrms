import React from 'react';
import {
  ChevronBarDown, ExclamationTriangle, PersonCircle, BadgeAr, Link45deg, MenuButton, CardHeading, Sliders,
  ArrowsCollapse, Phone, MenuDown, Grid1x2, CardList, GlobeAmericas, ChatSquare, LayoutSidebar,
  Bell, LayoutSidebarInset, SignTurnLeft, ChatSquareText, BatteryHalf, BookmarkStar, Mouse2, ArrowRepeat,
  ExclamationOctagon, SegmentedNav, ChatLeftDotsFill, BarChartSteps, Stars, StarHalf, BarChart, UiChecks,
  Fonts, Grid, LayoutSidebarReverse
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function ComponentSection(props) {
  const faq_title = { title: "Prebuilt Component", description: "A React js component built with Tailwind css. Reactdash provides many basic UI components that can be used for front-end development." }

  const data_components = [
    { title: 'Accordion', icon: <ChevronBarDown className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/accordion' },
    { title: 'Alerts', icon: <ExclamationTriangle className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/alerts' },
    { title: 'Avatar', icon: <PersonCircle className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/avatar' },
    { title: 'Badge', icon: <BadgeAr className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/badge' },
    { title: 'Breadcrumb', icon: <Link45deg className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/breadcrumb' },
    { title: 'Buttons', icon: <MenuButton className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/buttons' },
    { title: 'Card', icon: <CardHeading className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/cards' },
    { title: 'Carousel', icon: <Sliders className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/carousel' },
    { title: 'Collapse', icon: <ArrowsCollapse className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/collapse' },
    { title: 'Devices', icon: <Phone className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/devices' },
    { title: 'Dropdowns', icon: <MenuDown className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/dropdowns' },
    { title: 'Grid', icon: <Grid1x2 className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/grid' },
    { title: 'List Group', icon: <CardList className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/list-group' },
    { title: 'Map', icon: <GlobeAmericas className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/map' },
    { title: 'Modal', icon: <ChatSquare className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/modal' },
    { title: 'Navbar', icon: <LayoutSidebar className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/navbar' },
    { title: 'Notification', icon: <Bell className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/notification' },
    { title: 'Offcanvas', icon: <LayoutSidebarInset className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/offcanvas' },
    { title: 'Pagination', icon: <SignTurnLeft className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/pagination' },
    { title: 'Popovers', icon: <ChatSquareText className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/popovers' },
    { title: 'Progress', icon: <BatteryHalf className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/progress' },
    { title: 'Ribbon', icon: <BookmarkStar className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/ribbon' },
    { title: 'Scrollbar', icon: <Mouse2 className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/scrollbar' },
    { title: 'Spinner', icon: <ArrowRepeat className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/spinner' },
    { title: 'Sweet Alert', icon: <ExclamationOctagon className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/sweetalert' },
    { title: 'Tabs', icon: <SegmentedNav className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/tabs' },
    { title: 'Tooltips', icon: <ChatLeftDotsFill className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/tooltips' },
    { title: 'Submenu', icon: <BarChartSteps className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/submenu' },
    { title: 'Formatter', icon: <Stars className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/formatter' },
    { title: 'Rating', icon: <StarHalf className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/rating' },
    { title: 'Chart js', icon: <BarChart className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/components/chart' },
    { title: 'Input & Forms', icon: <UiChecks className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/forms/input' },
    { title: 'Typography', icon: <Fonts className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/content/typography' },
    { title: '29 Widgets', icon: <Grid className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/app/widgets' },
    { title: 'Layout', icon: <LayoutSidebarReverse className="w-6 h-6 ltr:mr-2.5 rtl:ml-2.5" />, url: '/compact' },
  ]

  return (
    <div id="about-us" className="relative py-14 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center lg:w-8/12 mx-auto mb-12">
          <h1 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">{faq_title.title}</h1>
          <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">{faq_title.description}</p>
        </header>

        <div className="flex flex-wrap flex-row -mx-4">
          {data_components.map((item, index) =>
            <div key={index} className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4">
              <Link to={item.url}>
                <div className="py-3 px-6 bg-white dark:bg-gray-900 rounded-lg transform transition duration-300 ease-in-out hover:-translate-y-1 shadow mb-8 flex items-center">
                  {item.icon}
                  <h3 className="text-lg leading-normal font-semibold dark:text-gray-300">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}