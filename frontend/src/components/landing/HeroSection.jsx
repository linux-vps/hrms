import React from 'react';
import { Link45deg } from 'react-bootstrap-icons';
import { Button, Devices } from '@/components/reactdash-ui';
import { Link } from 'react-router-dom';

export default function HeroSection(props) {
  // hero
  const hero = {
    title: "React dashboard admin template",
    description: "Reactdash comes with Vite the most popular build system. Components are built with the latest version of Tailwind CSS.",
    img: "/img/app/macbook-screen2.jpg",
    btn_link: "/dashboard/cms",
    btn_text: "View Demo"
  }

  return (
    <div id="hero" className="relative z-0 pt-36 lg:pt-52 pb-20 lg:pb-40 text-gray-300 bg-indigo-600 bg-gradient-to-b from-indigo-600 via-indigo-500 to-teal-500 dark:from-gray-800 dark:via-gray-700 dark:to-teal-700 overflow-hidden">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap flex-row -mx-4 justify-center">
          <div className="flex-shrink max-w-full px-4 w-full sm:w-8/12 md:w-9/12 lg:w-1/2 self-center lg:ltr:pr-12 lg:rtl:pl-12">
            <div className="text-center lg:ltr:text-left lg:rtl:text-right mt-6 lg:mt-0">
              <div className="mb-8">
                <h1 className="text-4xl sm:text-5xl capitalize sm:leading-tight mb-6 md:mb-3 font-bold text-white">{hero.title}</h1>
                <p className="text-gray-300 leading-relaxed font-light text-xl mx-auto pb-2">{hero.description}</p>
              </div>
              <Link to={hero.btn_link}>
                <Button color="secondary" className="mb-4"><Link45deg className="inline w-6 h-6 mr-2" />{hero.btn_text}</Button>
              </Link>
            </div>
          </div>

          <div className="flex-shrink max-w-full px-4 w-full md:w-9/12 lg:w-1/2 self-center">
            <div className="px-6 md:ml-6 md:pr-0 mt-4">
              {/* macbook */}
              <Devices variant="macbook" img={hero.img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}