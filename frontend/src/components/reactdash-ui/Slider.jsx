import React from 'react';
import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
// Splide
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

export default function Slider(props) {
  // props ( title, options, data )
  const title = props.title;
  const default_opt = { type: 'loop', perPage   : '1', gap: '1rem' }

  const data_options = props.options ? props.options : default_opt ;
  const sliders = props.data;
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <Splide options={data_options} aria-label={title} className={`relative${addClass}`}>

      { sliders.map( (slider, index) =>
      <SplideSlide key={index}>
        <Link to={slider.url}>
          <img className="w-full h-auto max-w-auto" src={slider.img} alt={slider.title}/>
        </Link>
      </SplideSlide>
      )}
      
    </Splide>
  );
}