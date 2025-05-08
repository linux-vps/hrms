import React from 'react';
import { GeoAltFill, TelephoneFill, EnvelopeFill, Facebook, Twitter, Instagram, Youtube, Tiktok  } from 'react-bootstrap-icons';
import { Row, Column, Button, Input } from '@/components/reactdash-ui';

export default function FooterCompany(props) {
  // footer text
  const footer_text = {
    about: "About Us",
    popular: "Popular Links",
    newsletter: "Newsletter",
    newsletter_info: "Subscribe to our mailing list to receives daily updates direct to your inbox!",
    subcribe: "Subcribe",
    copyright: "Copyright Your Company | All rights reserved."
  }
  // about us
  const about = {
    description: "Reactdash is react admin template with flat design and fast loading. This template is perfect for make awesome dasboard admin for your site.",
    street: "Amphitheatre, Mountain View",
    address: "San Francisco, CA 9321, United States",
    phone: "+(123) 456-7890",
    email: "support@example.com",
    social: [
      { title: "Facebook", icon: <Facebook className="w-6 h-6" />, url:"/"},
      { title: "Twitter", icon: <Twitter className="w-6 h-6" />, url:"/"},
      { title: "Instagram", icon: <Instagram className="w-6 h-6" />, url:"/"},
      { title: "Youtube", icon: <Youtube className="w-6 h-6" />, url:"/"},
      { title: "Tiktok", icon: <Tiktok className="w-6 h-6" />, url:"/"}
    ]
  }
  // footer menu
  const menu = {
    item_one: [
      { title: "About us", url:"/"},
      { title: "Contact us", url:"/"},
      { title: "Privacy policy", url:"/"},
      { title: "Term of use", url:"/"},
      { title: "GDPR", url:"/"},
      { title: "Career", url:"/"}
    ],
    item_two: [
      { title: "Latest post", url:"/"},
      { title: "Popular post", url:"/"},
      { title: "Blogs", url:"/"},
      { title: "Events", url:"/"},
      { title: "Fax", url:"/"},
      { title: "Category", url:"/"}
    ]
  }
  const social = about.social;
  const menu_one = menu.item_one;
  const menu_two = menu.item_two;

  return (
    <footer className="bg-gray-800 text-gray-400 dark:bg-gray-900">
      <div className="container xl:max-w-6xl mx-auto px-4 pt-16 pb-5 lg:pb-16">
        <Row className="-mx-4">
          <Column className="w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
            <div className="leading-relaxed">
              <h4 className="font-semibold text-xl mb-6 text-gray-300">{footer_text.about}</h4>
              <p className="mb-3">{about.description}</p>
              <address className="mb-3">
                <GeoAltFill className="inline-block ltr:mr-1 rtl:ml-1" />
                {about.street},<br/>
                {about.address}
              </address>
              <p className="mb-3">
                <TelephoneFill className="inline-block ltr:mr-1 rtl:ml-1" />
                {about.phone}</p>
              <p className="mb-3">
                <EnvelopeFill className="inline-block ltr:mr-1 rtl:ml-1" />
                {about.email}</p>
            </div>
          </Column>

          <Column className="w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
            <div className="leading-relaxed">
              <h4 className="font-semibold text-xl mb-6 text-gray-300">{footer_text.popular}</h4>
              <Row className="-mx-4">
                <Column className="w-1/2 px-4">
                  <ul className="space-y-2">
                    {menu_one.map((list, index)=>
                    <li key={index}>
                      <a className="hover:text-gray-300" href={list.url}>{list.title}</a>
                    </li>
                    )}
                  </ul>
                </Column>
                <Column className="w-1/2 px-4">
                  <ul className="space-y-2">
                    {menu_two.map((list, index)=>
                    <li key={index}>
                      <a className="hover:text-gray-300" href={list.url}>{list.title}</a>
                    </li>
                    )}
                  </ul>
                </Column>
              </Row>
            </div>
          </Column>

          <Column className="w-full lg:w-1/3 px-4 mb-7 lg:mb-0">
            <div className="leading-relaxed">
              <h4 className="font-semibold text-xl mb-6 text-gray-300">{footer_text.newsletter}</h4>
              <p className="mb-6">{footer_text.newsletter_info}</p>
              <div className="mx-auto mb-7">
                <form className="relative" action="#">
                  <div className="flex flex-wrap items-stretch w-full relative">
                    <Input type="email" className="flex-shrink flex-grow max-w-full leading-5 w-px flex-1 rounded-r-none" name="email" required={true} placeholder="Enter you email address" />
                    <div className="flex -mr-px">
                      <Button type="submit" className="flex items-center ltr:-ml-1 ltr:rounded-r rtl:-mr-1 rtl:rounded-l">{footer_text.subcribe}</Button>
                    </div>
                  </div>
                </form>
              </div>

              <ul className="space-x-3">
                {social.map((list,index) =>
                <li key={index} className="inline-block">
                  <a target="_blank" className="hover:text-gray-300 mr-4" rel="noopener noreferrer" href={list.url} title={list.title}>
                    {list.icon}
                  </a>
                </li>
                )}
              </ul>
            </div>
          </Column>
        </Row>
      </div>

      <div className="container xl:max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap lg:flex-row -mx-4 py-9">
          <div className="w-full text-center">
            <p>{footer_text.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}