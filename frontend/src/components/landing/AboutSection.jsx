import React from 'react';

export default function AboutSection(props) {
  const about = { title: "About Reactdash", 
  description: "Reactdash is provided as a simple single component and makes no assumptions about how you want to break down, what API props you want to display, or where you get your data from.",
  description_b: "Comes with a modern development tools and ready-to-use components that help to speed up the development.",  
  img:"/img/ilustration/presentation.png"}

  return (
    <div id="about-us" className="relative py-14 md:py-16 bg-white dark:bg-gray-800">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center mx-auto mb-12">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">
            {about.title}
          </h2>
          <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
        </header>

        <div className="flex flex-wrap flex-row -mx-4">
          <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 relative">
            <div className="pb-8 px-3 lg:px-12 text-center">
              <img className="mx-auto max-w-full h-auto" src={about.img} alt={about.title} />
            </div>
          </div>
          <div className="flex-shrink max-w-full px-4 w-full md:w-1/2">
            <div className="pb-8 px-3">
              <p className="leading-relaxed font-light text-xl mx-auto pb-2 mb-3">{about.description}</p>
              <p className="leading-relaxed font-light text-xl mx-auto pb-2 mb-3">{about.description_b}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}