import React, { useState } from "react";
import { EyeSlash, Eye } from 'react-bootstrap-icons';

export default function InputPassword(props) {
  // Initialize
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const shapes = {
    "rounded": "rounded",
    "square": "rounded-none",
    "pill": "rounded-3xl",
    "circle": "rounded-full !p-2.5"
  }
  const sizes = {
    "small": "py-1 px-2.5 text-sm",
    "medium": "py-2 px-4",
    "large": "py-3 px-6",
  }
  const addSize = props.size ? sizes[props.size] : 'py-2 px-4';
  const addShape = props.shape ? shapes[props.shape] : 'rounded';
  const addClass = props.className ?  `${props.className} ` : '';
  const disabled_css = props.disabled ?  ' !bg-gray-200 dark:!bg-gray-900 dark:bg-opacity-50 cursor-not-allowed' : '';

  return (
    <>
     {props.model === "float" ?
     <div className="relative z-0">
        <input 
          type={passwordShown ? "text" : "password"}
          aria-label={props.name}
          name={props.name}
          id={props.id} 
          onChange={props.onChange}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          className={`${addClass}w-full block leading-5 relative pt-5 pb-2 px-4 ${addShape} text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600 peer${disabled_css}`} 
          placeholder=" " />
        <label htmlFor={props.id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">{props.placeholder}</label>
        {passwordShown ? 
        <Eye title="Hide password" className="cursor-pointer w-5 h-5 absolute right-4 rtl:left-4 top-3" onClick={togglePassword}></Eye>
        :
        <EyeSlash title="Show password" className="cursor-pointer w-5 h-5 absolute right-4 rtl:left-4 top-3" onClick={togglePassword}></EyeSlash>
        }
      </div>
      :
      <div className="mb-4">
        {props.label ?
        <label htmlFor={props.id} className="inline-block mb-2">{props.label}</label>: ''}
        <div className="relative z-0">
          <input
            type={passwordShown ? "text" : "password"}
            aria-label={props.name}
            id={props.id}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            className={`${addClass}w-full leading-5 relative ${addSize} ${addShape} text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600${disabled_css}`}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
          />
          {passwordShown ? 
          <Eye title="Hide password" className="cursor-pointer w-5 h-5 absolute right-4 rtl:left-4 top-2" onClick={togglePassword}></Eye>
          :
          <EyeSlash title="Show password" className="cursor-pointer w-5 h-5 absolute right-4 rtl:left-4 top-2" onClick={togglePassword}></EyeSlash>
          }
        </div>
      </div>
     }
    </>
  );
}