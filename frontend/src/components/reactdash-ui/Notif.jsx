import React from 'react';

export default function Notif(props) {
  // Props ( icon, count , className )
  const notifIcon = props.icon;
  const notifcount = props.count;
  const addClass = props.className ?  ` ${props.className}` : '';

  return (
    <div className={`relative inline-block${addClass}`}>
      {notifIcon}
      {/* Notifications  */}
      { notifcount > 0 ? 
        <span className="flex justify-center absolute -top-2 ltr:-right-1 rtl:-left-1 text-center bg-pink-500 px-1 text-white rounded-full text-xs"><span className="align-self-center">{notifcount}</span></span>
      :
      <></>
      }
    </div>
  );
}