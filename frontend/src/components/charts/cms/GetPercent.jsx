import React from 'react';
import { ArrowUpShort, ArrowDownShort } from 'react-bootstrap-icons';

// Chart percent 
export default function GetPercent( props ) {
  // props
  const percent = props.datapercent;
  const newPercent = percent.newData;
  const oldPercent = percent.oldData;
  const totalDecimal = ( newPercent - oldPercent ) / newPercent * 100
  const totalPercent = totalDecimal.toFixed(1);
  
  return(
    <>
      <h3 className="text-lg font-bold mb-1">
        <span className="inline-block ltr:mr-2 rtl:ml-2 -mt-1">{percent.iconPercent}</span> {percent.newData} 
      </h3>
      { totalPercent > 1 ? 
        <p aria-label="Up vs yesterday" data-microtip-position="bottom" role="tooltip" className="text-sm text-green-500">
         <ArrowUpShort className="inline-block w-4 h-4" /> {totalPercent}%
       </p>
        : 
        <p aria-label="Down vs yesterday" data-microtip-position="bottom" role="tooltip" className="text-sm text-pink-500">
          <ArrowDownShort className="inline-block w-4 h-4" /> {totalPercent}%
        </p>
        }
    </>
  )
}