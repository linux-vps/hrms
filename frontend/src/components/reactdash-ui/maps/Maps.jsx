import React, {useState} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from './world.json';

export default function Maps(props) {
  // const rank = props.data
  const rank = [
    {id: "in", label: "India", value: 412},
    {id: "us", label: "United States", value: 323},
    {id: "cn", label: "China", value: 244},
    {id: "id", label: "Indonesia", value: 176},
    {id: "ru", label: "Rusia", value: 96},
    {id: "my", label: "Malaysia", value: 86},
    {id: "ca", label: "Canada", value: 76}
  ]

  const country = rank.slice(0, 4 ).map(list => list.id);
  
  // Hover map 
  const [hovered, setHovered] = useState(null);
  const layerProps = {
    onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
    onMouseLeave: ({ target }) => setHovered('')
  };

  return (
    <div className="map_svg relative">
      <div className="absolute right-2 top-2">{hovered && <div className="text-white text-sm bg-black rounded shadow-lg px-3">{hovered}</div>}</div>

      <VectorMap {...world} checkedLayers={country} layerProps={layerProps} />

      {props.statistic === true ?
      <div className="absolute left-2 bottom-2">
        <div className="flex flex-col space-y-1">
          {rank.slice(0, 4 ).map((list, index)=> {
          const bg_color = index === 0 ? "bg-indigo-700" : index === 1 ? "bg-indigo-600" : index === 2 ? "bg-indigo-500": index === 3 ? "bg-indigo-400": index === 4 ? "bg-indigo-300" : "bg-indigo-200";
          return(
          <p key={index} className={`text-xs text-gray-100 py-1 px-2 ${bg_color}`}>{list.label}:{list.value}</p>
          )})}
        </div>
      </div>: ''}
    </div>
  );
}