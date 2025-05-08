import React, {useState} from 'react';

export default function Radio(props) {
  const options = props.options;
  const checked = props.checked;
  // radio default checked
  const [isCheck, setCheck] = useState( checked );
  const radioChanged = (e) => {
    setCheck(e.target.value);
  }
  const addClass = props.className ?  `${props.className} ` : '';

  return (
    <div className={`${addClass}relative`}>
      <label htmlFor={props.id} className="inline-block mb-2">{props.label}</label>
      <div id={props.id} className="flex flex-row space-x-4">
        {options.map((option, index) =>
        <div key={index} className="relative flex items-center mb-4 ltr:mr-2 rtl:ml-2">
          <input className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-full ltr:mr-2 rtl:ml-2" 
          type="radio" 
          id={option.id}
          onChange={radioChanged}
          name={props.name}
          checked={isCheck === option.value}
          value={option.value} />

          <label className="inline-block" htmlFor={option.id}>
            {option.title}
          </label>
        </div>
        )}
      </div>
    </div>
  );
}