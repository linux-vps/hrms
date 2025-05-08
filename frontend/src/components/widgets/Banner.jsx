import React from 'react';
import { Button } from '@/components/reactdash-ui';

export default function Banner(props) {
  // Props ( banner, download )
  const banner = {title: 'Sales Report', description: 'Monthly sales report is ready for download!'}
  const download = { text: 'Download', url: '/' }

  return (
    <div className="box-banner">
      <div className="my-8 p-4 text-center bg-gray-300 dark:bg-gray-700 bg-opacity-50 rounded-lg">
        <h4 className="font-bold inline-block mb-2">{banner.title}</h4>
        <div className="mb-3 text-sm">
          {banner.description}
        </div>

        {download.text ?
        <div className="grid">
          <a href={download.url} target="_blank">
            <Button color="secondary">{download.text}</Button>
          </a>
        </div>
        : ''}
      </div>
    </div>
  );
}