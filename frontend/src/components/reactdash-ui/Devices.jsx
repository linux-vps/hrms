import React from 'react';

export default function Devices(props) {
  //  props ( variant, className ,img )
  const device = props.variant;
  const addClass = props.className ?  `${props.className}` : '';

  return (
    <>
      <figure className={`relative ${addClass}`}>
        { device === "macbook" ?
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960.000000 574.000000">
            <defs>
              <clipPath id="svgf77">
                <rect y="0" x="5" className="macrect"></rect>
              </clipPath>
            </defs>
            <image clipPath="url(#svgf77)" xlinkHref={props.img} className="macpath"></image>
            <image xlinkHref="/img/app/device/macbook.png" className="w-full h-full"></image>
          </svg>
        :
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.000000 906.000000">
            <defs>
              <clipPath id="svgf2">
                <rect x="52" y="10" className='iprect'/>
              </clipPath>
            </defs>
            <image clipPath="url(#svgf2)" xlinkHref={props.img} className='ippath'></image>
            <image xlinkHref="/img/app/device/iphone-dark.png" className='w-full h-full'></image>
          </svg>
        }
      </figure>
    </>
  );
}