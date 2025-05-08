import React from 'react';
import { Link } from 'react-router-dom';
export default function DemoSection(props) {
  const demos = { title: "Demo Dashboard", description: "Check out our various dashboard examples." }

  const data_demos = [
    { title: "Cms Dashboard", url: "/dashboard/cms", img: "/img/demo/react-dashboard-sales.jpg" },
    { title: "Analytics Dashboard", url: "/dashboard/analytics", img: "/img/demo/react-dashboard-analytics.jpg" },
    { title: "Ecommerce Dashboard", url: "/dashboard/ecommerce", img: "/img/demo/react-dashboard-ecommerce.jpg" },
    { title: "Project Dashboard", url: "/dashboard/projects", img: "/img/demo/react-dashboard-project.jpg" },
    { title: "Crm Dashboard", url: "/dashboard/crm", img: "/img/demo/react-dashboard-crm.jpg" },
    { title: "Hosting Dashboard", url: "/dashboard/hosting", img: "/img/demo/react-dashboard-hosting.jpg" },
    { title: "Saas Dashboard", url: "/dashboard/saas", img: "/img/demo/react-dashboard-saas.jpg" },
    { title: "Sales Dashboard", url: "/dashboard/sales", img: "/img/demo/react-dashboard-sales.jpg" },
    { title: "Marketing Dashboard", url: "/dashboard/marketing", img: "/img/demo/react-dashboard-marketing.jpg" }
  ]

  return (
    <div id="demos" className="relative pt-14 pb-2 md:pt-16 md:pb-4 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center mx-auto mb-12">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">
            {demos.title}
          </h2>
          <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
          <p className="text-gray-500 leading-relaxed font-light text-lg mx-auto pb-2">
            {demos.description}
          </p>
        </header>

        <div className="flex flex-wrap flex-row -mx-4 text-center">
          {data_demos.map((demo, index) =>
            <div key={index} className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6">
              <Link to={demo.url}>
                <div className="mb-12 shadow-lg overflow-hidden rounded-lg bg-white dark:bg-gray-800 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-full bg-gradient-to-r from-indigo-50 to-pink-50 px-4 pt-4 text-indigo-500">
                    <img src={demo.img} className="max-w-full w-full mx-auto" alt={demo.title} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base text-center leading-normal mb-1 font-bold text-gray-800 dark:text-gray-300">
                      {demo.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}