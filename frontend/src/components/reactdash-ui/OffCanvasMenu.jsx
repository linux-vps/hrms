import React, {useState} from 'react';
import { List } from 'react-bootstrap-icons';
import { SubmenuAccordion } from '@/components/reactdash-ui';
import Logo from '@/components/navbar/Logo';

export default function OffCanvasMenu(props) {
  // set toggle
  const [isToggle, setToggle] = useState(false);
  function closeCanvas() {
    setToggle(false)
  }
  // colors
  const colors = {
    "light": "text-gray-300 hover:text-gray-100",
    "dark": "text-gray-800 hover:text-gray-700",
    "light_dark": "text-gray-300 hover:text-gray-100 dark:text-gray-800 dark:hover:text-gray-700",
    "dark_light": "text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100",
  }
  // placement
  const placements = {
    "left": "left-0",
    "right": "right-0",
  }
  const placementstwo = {
    "left": "-left-64",
    "right": "-right-64",
  }
  
  // props ( logo, copyright, data )
  const copyright = props.content.text;
  const addcolor = props.color ? colors[props.color] : 'text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100';
  const listmenu =  props.data;

  const addplacement = props.placement ? placements[props.placement] : 'right-0';
  const addplacementtwo = props.placement ? placementstwo[props.placement] : '-right-64';

  return (
    <div>
      <button onClick={()=>setToggle(!isToggle)} type="button" className={`inline-flex items-center justify-center focus:outline-none focus:ring-0 ${addcolor}`}>
        <span className="sr-only">Menu</span>
        <List className="w-8 h-8" />
      </button>

      <div className={`fixed inset-0 z-50 ${isToggle ? "w-full h-full": "w-0 h-0"}`}>
        {/* bg canvas  */}
        <span onClick={closeCanvas} className={`fixed bg-gray-900 bg-opacity-70 inset-x-0 top-0 ${isToggle ? "w-full h-full": "w-0 h-0"}`}></span>

        <nav className={`flex flex-col fixed top-0 py-4 bg-white dark:bg-gray-800 h-full overflow-auto z-40 transition-all duration-300 ease-in-out w-64 ${isToggle ? `${addplacement}`: `${addplacementtwo}`}`}>
          <div className="mb-auto">
            {/* logo  */}
            <div className="mh-18 text-center px-12 mb-8">
              <div className="relative">
                <Logo color="dark_light" />
              </div>
            </div>

            {/* menu */}
            <div className="mb-4">
              <nav className="relative flex flex-wrap items-center justify-between">
                <ul id="side-menu" className="w-full float-none flex flex-col">
                  {/* list menu  */}
                  <SubmenuAccordion data={listmenu} />
                </ul>
              </nav>
            </div>
          </div>

          {/* copyright */}
          {copyright ?
          <div className="mt-5 text-center">
            <p>{copyright}</p>
          </div>
          :''}
        </nav>
      </div>
    </div>
  );
}