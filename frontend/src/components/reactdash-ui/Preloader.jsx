import React, { useState, useEffect } from 'react';

// Preloader 
export default function Preloader(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // colors
  const colors = {
    "primary": "text-indigo-500",
    "secondary": "text-pink-500",
    "success": "text-green-500",
    "warning": "text-yellow-500",
    "danger": "text-red-500",
    "info": "text-cyan-500",
    "light": "text-gray-500",
    "dark": "text-gray-900",
  }

  // Props ( color )
  const addcolor = props.color ? colors[props.color] : 'text-indigo-500';

  return (
    <div className="relative">
      {loading && (
        <div className="preloader loaded-success absolute w-full h-screen overflow-hidden inset-0 bg-gray-100 dark:bg-gray-900">
          <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2">
            <div className="relative mx-auto mb-12">
              <div className="inline-block">
                <svg className={`animate-spin h-8 w-8 ${addcolor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {props.children}
        </>
      )}
    </div>
  );
}