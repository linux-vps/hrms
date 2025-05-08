import React, { useState } from "react";
import { ChevronDown } from 'react-bootstrap-icons';

export default function Accordion( props ) {
  const [isActive, setActive] = useState(0);
  // Data questionsAnswers
  const questionsAnswers = props.data;

  return (
    <>
    {questionsAnswers.map((item, index) => {
      const ariaExpanded = index === isActive ? "true" : "false";
      const showContent = index === isActive ? "!block" : "";
      
      // open close accordion
      function openAcc() {
        setActive(index)
      }
      function closeAcc() {
        setActive(null)
      }
      const Toggler = showContent ? closeAcc : openAcc;
      
      return (
      <div key={index} id={`collapse${item.id}`} className="relative flex flex-wrap flex-col shadow mb-4 bg-white dark:bg-gray-800">
        <div className="border-b border-gray-200 mb-0 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 dark:border-gray-800 py-2 px-4">
          <button aria-expanded={ariaExpanded} aria-controls={`content${index}`} 
            onClick={Toggler} 
            className="py-3 px-0 w-full rounded leading-5 font-medium flex justify-between focus:outline-none focus:ring-0">
            {item.question}
            <ChevronDown className={`${ showContent ? '-rotate-180' : 'rotate-0' } w-3 h-3 transform transition duration-300 mt-1.5`} />
          </button>
        </div>

        <div className={`${showContent} hidden`}>
          <div className="flex-1 p-6">
            <p id={`content${index}`}>{item.answer}</p>
          </div>
        </div>
      </div>
      )
    })}
    </>
  )
}