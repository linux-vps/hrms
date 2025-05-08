import React from 'react';
import { Card } from '@/components/reactdash-ui';

export default function BestSeller(props) {
  // data table
  const table_title = {title: "Best Seller", sales: "Sales"}
  const data_table = [
    {title: "Nike Women's Race Running Shoe", img: "/img/products/product_1.jpg", url: "/", category: "Women Shoes", sales: 2380 },
    {title: "Nike Womens Free RN Flyknit 2023", img: "/img/products/product_2.jpg", url: "/", category: "Women Shoes", sales: 2130 },
    {title: "Nike Men's Sneaker Running Shoes", img: "/img/products/product_3.jpg", url: "/", category: "Women Shoes", sales: 1870 },
    {title: "Adidas World cup limited edition", img: "/img/products/product_4.jpg", url: "/", category: "Men Shoes", sales: 1568 },
    {title: "Adidas Ronaldo Limited Edition", img: "/img/products/product_5.jpg", url: "/", category: "Men Shoes", sales:1250 },
  ]
  const counts = 3;

  return (
    <Card >
      <table className="table-sm text-sm ltr:text-left rtl:text-right w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th>
              {table_title.title}
            </th>
            <th>
              {table_title.sales}
            </th>
          </tr>
        </thead>
        <tbody>
          {data_table.slice(0, counts ).map((item, index) =>
          <tr key={index}>
            <td>
              <a href={item.url} className="hover:text-indigo-500">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={item.img} alt={item.title} />
                  </div>
                  <div className="ltr:ml-4 rtl:mr-4">
                    <div className="leading-5">
                     {item.title}
                    </div>
                    <div className="text-xs leading-5 text-gray-500">
                      {item.category}
                    </div>
                  </div>
                </div>
              </a>
            </td>
            <td>
              <div className="leading-5 text-green-700">${item.sales}</div>
            </td>
          </tr>
          )}

        </tbody>
      </table>
    </Card>
  );
}