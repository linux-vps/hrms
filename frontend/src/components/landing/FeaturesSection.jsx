import React from 'react';
import { FiletypeCss, FiletypeJsx, Lightning, MoonStarsFill, Tsunami, Phone, Palette, JournalText, QuestionSquare } from 'react-bootstrap-icons';

export default function FeaturesSection(props) {
  const features = {title: "Our Features", description: "Excellent features that will make it easier to develop React dashboards."}
  const data_features = [
    {title: "Latest Tailwind Css", icon: <FiletypeCss className="w-12 h-12" /> , description: "Supports latest version of Tailwind css framework"},
    {title: "Latest React", icon: <FiletypeJsx className="w-12 h-12" /> , description: "Built with latest version of React (version 18)"},
    {title: "Vite Tool", icon: <Lightning className="w-12 h-12" /> , description: "Build with next generation frontend tooling"},
    {title: "Dark Mode", icon: <MoonStarsFill className="w-12 h-12" /> , description: "Every UI was adaptable with light & dark mode"},
    {title: "React Hooks", icon: <Tsunami className="w-12 h-12" /> , description: "All component written in functional way and useState"},
    {title: "Fully Responsive", icon: <Phone className="w-12 h-12" /> , description: "Fully responsive and perfect in any screens"},
    {title: "Unlimited Colors", icon: <Palette className="w-12 h-12" /> , description: "Theme colors can be customized as needed"},
    {title: "Well Documented", icon: <JournalText className="w-12 h-12" /> , description: "Documentation helps developers understand code easily"},
    {title: "Excelent Support", icon: <QuestionSquare className="w-12 h-12" /> , description: "The support team is ready to help you 24 hours x 7 days"},  
  ]

  return (
    <div id="features" className="relative pt-14 pb-2 md:pt-16 md:pb-4 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
      <div className="container xl:max-w-6xl mx-auto px-4">
        <header className="text-center mx-auto mb-12">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-300">
            {features.title}
          </h2>
          <hr className="block w-12 h-0.5 mx-auto my-5 bg-indigo-500 border-indigo-500" />
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">
            {features.description}
          </p>
        </header>

        <div className="flex flex-wrap flex-row -mx-4 text-center">
          {data_features.map((feature, index) =>
          <div key={index} className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6">
            <div className="p-6 mb-12 shadow-lg rounded-lg bg-white dark:bg-gray-800 transform transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
              <div className="inline-block text-indigo-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl leading-normal mb-1 font-bold text-gray-800 dark:text-gray-300">
                {feature.title}
              </h3>
              <p>{feature.description}</p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}