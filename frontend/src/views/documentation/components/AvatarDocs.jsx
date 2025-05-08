import React from 'react';
// components
import { Preloader, Row, Column, Avatar, AvatarGroup, Card, Prism } from "@/components/reactdash-ui";

export default function AvatarDocs() {
  // page title
  const page_title = "Avatar";
  const page_title2 = "Avatar Group";
  
  const data_avatar = {img: '/img/avatar/avatar.png', name: 'Roman Davis'}
  const data_avatargroup = [
    { id: 1, name: 'David', url: '/', img: '/img/avatar/avatar.png' },
    { id: 2, name: 'Carlos', url: '/', img: '/img/avatar/avatar2.png' },
    { id: 3, name: 'Adrian', url: '/', img: '/img/avatar/avatar3.png' },
    { id: 4, name: 'Bernardo', url: '/', img: '/img/avatar/avatar4.png' }
  ]
  // show avatar
  const per_page = 4;

  // prism code
  const datacode1 = `
import React from 'react'
import { Avatar } from "@/components/reactdash-ui";

export default function Avatars() {
    // data avatar
    const data_avatar = {img: '../src/assets/img/avatar/avatar.png', name: 'Roman Davis'}

    return (
      <>
        {/* shape */}
        <Avatar data={data_avatar} shape="circle" />
        <Avatar data={data_avatar} shape="rounded" />
        <Avatar data={data_avatar} shape="square" />
        
        {/* size */}
        <Avatar data={data_avatar} size="x-small" />
        <Avatar data={data_avatar} size="small" />
        <Avatar data={data_avatar} size="medium" />
        <Avatar data={data_avatar} size="large" />

        {/* custom shape and size with className */}
        <Avatar data={data_avatar} className="!w-24 !h-24 !rounded-t-xl !rounded-b-none" />
      </>
    )
}
  `;
  const datacode2 = `
import React from 'react'
import { AvatarGroup } from "@/components/reactdash-ui";

export default function AvatarsGroups() {
    // data avatar group
    const data_avatargroup = [
      { id: 1, name: 'David', url: '/', img: '/img/avatar/avatar.png' },
      { id: 2, name: 'Carlos', url: '/', img: '/img/avatar/avatar2.png' },
      { id: 3, name: 'Adrian', url: '/', img: '/img/avatar/avatar3.png' },
      { id: 4, name: 'Bernardo', url: '/', img: '/img/avatar/avatar4.png' }
    ]
    // show avatar
    const per_page = 4;

    return (
      <>
        {/* shape */}
        <AvatarGroup data={data_avatargroup} shape="circle" count={per_page} />
        <AvatarGroup data={data_avatargroup} shape="square" count={per_page} />
        <AvatarGroup data={data_avatargroup} shape="rounded" count={per_page} />

        {/* size */}
        <AvatarGroup data={data_avatargroup} size="x-small" count={per_page} />
        <AvatarGroup data={data_avatargroup} size="small" count={per_page} />
        <AvatarGroup data={data_avatargroup} size="medium" count={per_page} />
        <AvatarGroup data={data_avatargroup} size="large" count={per_page} />
      </>
    )
}
  `;

  return (
    <Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title}</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">An example of a simple avatar component for your React app.</p>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Shape</h2>
            <p className="mb-4 font-light">There are 3 choices of avatar 'shape' circle, rounded and square. The default shape is rounded.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <Avatar data={data_avatar} className="mr-3" shape="circle" />
              <Avatar data={data_avatar} className="mr-3" shape="rounded" />
              <Avatar data={data_avatar} className="mr-3" shape="square" />
            </Card>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Size</h2>
            <p className="mb-4 font-light">There are 4 choices of avatar 'size' x-small, small, medium and large. The default size is medium.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Avatar data={data_avatar} size="x-small" className="mr-3" />
              <Avatar data={data_avatar} size="small" className="mr-3" />
              <Avatar data={data_avatar} size="medium" className="mr-3" />
              <Avatar data={data_avatar} size="large" className="mr-3" />
              <Avatar data={data_avatar} className="!w-24 !h-24 !rounded-t-xl !rounded-b-none" />
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>shape</b></td>
                  <td>Avatar shape / style</td>
                  <td><code>'circle'</code> | <code>'rounded'</code> | <code>'square'</code></td>
                  <td><code>'circle'</code></td>
                </tr>
                <tr>
                  <td><b>size</b></td>
                  <td>Avatar size</td>
                  <td><code>'x-small'</code> | <code>'small'</code> | <code>'medium'</code> | <code>'large'</code></td>
                  <td><code>'medium'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className for Avatar</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data avatar</td>
                  <td>data ( <code>img</code> | <code>name</code> )</td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
      {/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4 mt-6">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title2}</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.</p>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Shape</h2>
            <p className="mb-4 font-light">There are 3 choices of avatar 'shape' circle, rounded and square. The default shape is rounded.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} shape="circle" count={per_page} />
              </div>
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} shape="rounded" count={per_page} />
              </div>
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} shape="square" count={per_page} />
              </div>
            </Card>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Size</h2>
            <p className="mb-4 font-light">There are 4 choices of avatar 'size' x-small, small, medium and large. The default size is medium.</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} size="x-small" shape="circle" count={per_page} />
              </div>
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} size="small" shape="circle" count={per_page} />
              </div>
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} size="medium" shape="circle" count={per_page} />
              </div>
              <div className="relative w-full mb-3">
                <AvatarGroup data={data_avatargroup} size="large" shape="circle" count={per_page} />
              </div>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>
            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>shape</b></td>
                  <td>Avatar shape / style</td>
                  <td><code>'circle'</code> | <code>'rounded'</code> | <code>'square'</code></td>
                  <td><code>'circle'</code></td>
                </tr>
                <tr>
                  <td><b>size</b></td>
                  <td>Avatar size</td>
                  <td><code>'x-small'</code> | <code>'small'</code> | <code>'medium'</code> | <code>'large'</code></td>
                  <td><code>'small'</code></td>
                </tr>
                <tr>
                  <td><b>count</b></td>
                  <td>The number of avatars displayed</td>
                  <td><code>custom count like</code> <code>'4'</code> or <code>'6'</code></td>
                  <td><code>'5'</code></td>
                </tr>
                <tr>
                  <td><b>className</b></td>
                  <td>Custom className for Avatar</td>
                  <td>available className based on tailwind css like <code>'mb-3', 'mt-4' and etc</code></td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>data</b></td>
                  <td>Data avatar</td>
                  <td>data ( <code>id</code> | <code>img</code> | <code>name</code> | <code>url</code> )</td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}