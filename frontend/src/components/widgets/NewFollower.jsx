import React from 'react';
import { Eye } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Card, AvatarGroup } from '@/components/reactdash-ui';

// data link
const LinkAll = {
  text: "More",
  icon: <Eye className="mx-1 inline-block"/>,
  url: "/"
}

export default function NewFollower( props ) {
  // data user
  const datauser = [
    { id: 1, name: 'David', url: '/', img: '/img/avatar/avatar.png' },
    { id: 2, name: 'Carlos', url: '/', img: '/img/avatar/avatar2.png' },
    { id: 3, name: 'Adrian', url: '/', img: '/img/avatar/avatar3.png' },
    { id: 4, name: 'Bernardo', url: '/', img: '/img/avatar/avatar4.png' },
    { id: 5, name: 'Jimmy', url: '/', img: '/img/avatar/avatar5.png' },
    { id: 6, name: 'Garcia', url: '/', img: '/img/avatar/avatar6.png' },
    { id: 7, name: 'Daniel', url: '/', img: '/img/avatar/avatar7.png' },
  ]
  // more user
  const total = datauser.length;
  const per_page = 4;
  const more_user = total - per_page;

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full p-6">
      <div className="flex flex-col pb-6">
        <h3 className="text-base font-bold">{props.title}</h3>
      </div>
      <div className="relative">
        <AvatarGroup data={datauser} model="circle" count={per_page} />
        <Link className="inline-block" to={LinkAll.url}>
          <span className="ltr:ml-5 rtl:mr-5 text-sm text-gray-500 hover:text-indigo-500 font-semibold self-center">{LinkAll.icon} {more_user} {LinkAll.text}</span>
        </Link>
      </div>
    </Card>
  );
}