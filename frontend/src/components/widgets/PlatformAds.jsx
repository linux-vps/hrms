import React from 'react';
import { Card, ProgressSmall } from '@/components/reactdash-ui';

export default function PlatformAds(props) {
  // data table
  const table_title = {platform: "Platform", visitor: "Visitors", budget: "Ads Budget"}
  const table_data = [
    { platform: "Facebook Ads", visitor: 1520, budget: 900, spend: 570  },
    { platform: "Google Ads", visitor: 980, budget: 700, spend: 370 },
    { platform: "Microsoft Ads", visitor: 540, budget: 500, spend: 20 },
    { platform: "Tiktok Ads", visitor: 350, budget: 500, spend: 80 },
  ]

  return (
    <Card>
      <div className="relative">
        <table className="table-sm text-sm ltr:text-left rtl:text-right w-full">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th>
                {table_title.platform}
              </th>
              <th>
                {table_title.visitor}
              </th>
              <th>
                {table_title.budget}
              </th>
            </tr>
          </thead>
          <tbody>
            {table_data.map( (item, index ) => {
            // data percent
            const data_percent = (item.budget - item.spend) /item.budget * 100;
            return (
            <tr key={index}>
              <td>
                {item.platform}
              </td>
              <td>
                {item.visitor}
              </td>
              <td>
                <ProgressSmall data={data_percent} />
              </td>
            </tr>
            )})}
          </tbody>
        </table>
      </div>
    </Card>
  );
}