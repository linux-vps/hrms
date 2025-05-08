import { Tab } from '@headlessui/react'

export default function Tabs(props) {
  // props ( data, model, className )
  const tabitem = props.data;
  const model = props.model;
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <>
    {model === "vertical" ?
    <Tab.Group as="div" className={`flex justify-between inline-block${addClass}`}>
      <Tab.List as="ul">
        { tabitem.map( (item, index) =>
          <Tab as="li" key={index} className="mr-1">
          {({ selected }) => (
            <button className={
              selected ? 'w-full block py-2 px-4 focus:ring-0 focus:outline-none text-center bg-indigo-500 text-gray-100 rounded' : 'w-full block py-2 px-4 focus:ring-0 focus:outline-none bg-white dark:bg-gray-800 text-center text-gray-500'
            } >{item.title}</button>
          )}
          </Tab>
        )}
      </Tab.List>

      <Tab.Panels className="py-1.5 px-3">
        { tabitem.map( (item, index ) =>
        <Tab.Panel key={index} className="px-3">{item.description}</Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
    :
    <Tab.Group as="div" className={`relative${addClass}`}>
      <Tab.List as="ul" className="flex border-b border-gray-200 dark:border-gray-700">
        { tabitem.map( (item, index) =>
          <Tab as="li" key={index} className="mr-1">
          {({ selected }) => (
            <button className={
              selected ? 'py-2 px-4 -mb-px bg-white dark:bg-gray-800 inline-block border-l border-t border-r rounded-t focus:ring-0 focus:outline-none text-indigo-500 dark:border-gray-700' : 'bg-white dark:bg-gray-800 inline-block py-2 px-4 focus:ring-0 focus:outline-none hover:text-indigo-500 font-semibold dark:border-gray-700 -mb-px border-b text-gray-500'
            } >{item.title}</button>
          )}
          </Tab>
        )}
      </Tab.List>

      <Tab.Panels className="py-1.5 px-3">
        { tabitem.map( (item, index ) =>
        <Tab.Panel key={index} className="py-3">{item.description}</Tab.Panel>
        )}
      </Tab.Panels>
    </Tab.Group>
    }
    </>
  )
}