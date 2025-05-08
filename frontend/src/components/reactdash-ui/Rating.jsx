import React from 'react';
import { Tooltip } from '@/components/reactdash-ui';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

export default function Rating(props) {
  const count = props.data;
  const sizes = {
    "small": "w-4 h-4",
    "medium": "w-8 h-8",
    "large": "w-12 h-12",
  }
  const addSize = props.size ? sizes[props.size] : 'w-4 h-4';

  return (
    <>
    {props.model === "right" ?
    <div className="flex items-center">
      <ul className="flex mt-1 mb-2 relative" >
        {count < 1 ?
          [...Array(5)].map((star, index) => {    
            index += 1; 
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-white">
                <Star className={`${addSize}`} />
              </li>        
            );
          })
        : count >= 1 && count < 1.5 ?
          <>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarFill className={`${addSize}`} />
            </li> 
            {[...Array(4)].map((stars, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 1.5 && count < 2 ? 
          <>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarFill className={`${addSize}`} />
            </li>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(3)].map((starb, index) => {  
              index += 1;    
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 2 && count < 2.5 ? 
          <>
            {[...Array(2)].map((starc, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(3)].map((stard, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 2.5 && count < 3 ? 
          <>
            {[...Array(2)].map((stare, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(2)].map((starf, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 3 && count < 3.5 ? 
          <>
            {[...Array(3)].map((starg, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(2)].map((stari, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 3.5 && count < 4 ? 
          <>
            {[...Array(3)].map((starj, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(1)].map((stark, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 4 && count < 4.5 ? 
          <>
            {[...Array(4)].map((starl, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(1)].map((starm, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 4.5 && count < 5 ? 
          <>
            {[...Array(4)].map((starn, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li>
          </>
        : count === 5 ? 
          <>
            {[...Array(5)].map((staro, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
          </>
        : ''
        }
      </ul>
      <div className="inline-block">({count})</div>
    </div>
    : props.model === "tooltip" ?
    <Tooltip title={`${count} / 5`}>
      <ul className="flex mt-1 mb-2 relative" >
        {count < 1 ?
          [...Array(5)].map((star, index) => {    
            index += 1; 
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-white">
                <Star className={`${addSize}`} />
              </li>        
            );
          })
        : count >= 1 && count < 1.5 ?
          <>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarFill className={`${addSize}`} />
            </li> 
            {[...Array(4)].map((stars, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 1.5 && count < 2 ? 
          <>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarFill className={`${addSize}`} />
            </li>
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(3)].map((starb, index) => {  
              index += 1;    
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 2 && count < 2.5 ? 
          <>
            {[...Array(2)].map((starc, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(3)].map((stard, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 2.5 && count < 3 ? 
          <>
            {[...Array(2)].map((stare, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(2)].map((starf, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 3 && count < 3.5 ? 
          <>
            {[...Array(3)].map((starg, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(2)].map((stari, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 3.5 && count < 4 ? 
          <>
            {[...Array(3)].map((starj, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li> 
            {[...Array(1)].map((stark, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 4 && count < 4.5 ? 
          <>
            {[...Array(4)].map((starl, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            {[...Array(1)].map((starm, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <Star className={`${addSize}`} />
                </li>        
              );
            })}
          </>
        : count >= 4.5 && count < 5 ? 
          <>
            {[...Array(4)].map((starn, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
            <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
              <StarHalf className={`${addSize}`} />
            </li>
          </>
        : count === 5 ? 
          <>
            {[...Array(5)].map((staro, index) => {   
              index += 1;  
              return (         
                <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                  <StarFill className={`${addSize}`} />
                </li>       
              );
            })}
          </>
        : ''
        }
      </ul>
    </Tooltip>
    :
    <ul className="flex relative" >
      {count < 1 ?
        [...Array(5)].map((star, index) => {    
          index += 1; 
          return (         
            <li key={index} className="ltr:mr-2 rtl:ml-2 text-white">
              <Star className={`${addSize}`} />
            </li>        
          );
        })
      : count >= 1 && count < 1.5 ?
        <>
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarFill className={`${addSize}`} />
          </li> 
          {[...Array(4)].map((stars, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 1.5 && count < 2 ? 
        <>
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarFill className={`${addSize}`} />
          </li>
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarHalf className={`${addSize}`} />
          </li> 
          {[...Array(3)].map((starb, index) => {  
            index += 1;    
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 2 && count < 2.5 ? 
        <>
          {[...Array(2)].map((starc, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          {[...Array(3)].map((stard, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 2.5 && count < 3 ? 
        <>
          {[...Array(2)].map((stare, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarHalf className={`${addSize}`} />
          </li> 
          {[...Array(2)].map((starf, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 3 && count < 3.5 ? 
        <>
          {[...Array(3)].map((starg, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          {[...Array(2)].map((stari, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 3.5 && count < 4 ? 
        <>
          {[...Array(3)].map((starj, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarHalf className={`${addSize}`} />
          </li> 
          {[...Array(1)].map((stark, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 4 && count < 4.5 ? 
        <>
          {[...Array(4)].map((starl, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          {[...Array(1)].map((starm, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <Star className={`${addSize}`} />
              </li>        
            );
          })}
        </>
      : count >= 4.5 && count < 5 ? 
        <>
          {[...Array(4)].map((starn, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
          <li className="ltr:mr-2 rtl:ml-2 text-yellow-400">
            <StarHalf className={`${addSize}`} />
          </li>
        </>
      : count === 5 ? 
        <>
          {[...Array(5)].map((staro, index) => {   
            index += 1;  
            return (         
              <li key={index} className="ltr:mr-2 rtl:ml-2 text-yellow-400">
                <StarFill className={`${addSize}`} />
              </li>       
            );
          })}
        </>
      : ''
      }
    </ul>
    }
    </>
  );
}