import React from "react";
import { Bag, Box, Truck, Check } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function OrderDetail() {
  const order_text = {
    id: "Invoice ID",
    status: "Order Status",
    product: "Products",
    qty: "Quantity",
    price: "Pricing",
    total: "Total",
    sub: "Sub-Total",
    discount: "Discount",
    tax: "Tax",
    billing: "Billing Details",
    payments: "Payment and Shipping",
    payment: "Payment",
    delivered: "Delivered",
    tracking: "Tracking",
    phone: "Phone"
  }
  // order detail
  const order_detail = {
    invoice: "INV21",
    discount: 20,
    tax: 8,
    products: [
      { name: "Nike Unisex-Child Free Rn (Big Kid)", img: "/img/products/product_1.jpg", url: "/", qty: 3, price: 70, currency: "$"},
      { name: "Nike in-Season TR 9 Womens Running Shoe", img: "/img/products/product_2.jpg", url: "/", qty: 1, price: 80, currency: "$"},
    ],
    status: [
      { icon: <Bag />, date: "Aug 17, 2025 02.21Am", title: "Order placed", active:false},
      { icon: <Box />, date: "Aug 18, 2025 02.21Am", title: "Packing", active:true},
      { icon: <Truck />, date: "Coming soon", title: "Shipped", active:false},
      { icon: <Check />, date: "Coming soon", title: "Delivered", active:false}
    ]
  }
  const data_products = order_detail.products;
  const data_status = order_detail.status;
  const billing = { name: "John Doe", street: "Mountain view, Joice 12", address: "San Francisco, CA 82987, USA", phone: "0987654321"}
  const payments = { payment: "Paypal", delivered: "Ninja Express", tracking: "INV102-98998"}
  // sub total
  const sub_total = data_products.reduce((product,v) =>  product = product + (v.price * v.qty) , 0 );
  const tax_total = order_detail.tax + "%";
  const discount_total = order_detail.discount + "%";
  const total_withdiscount = sub_total - ( sub_total / 100 * order_detail.discount );
  const total_beforetax = order_detail.discount ? total_withdiscount : sub_total;
  const total_withtax = total_beforetax + ( total_beforetax / 100 * order_detail.tax );
  const total = order_detail.tax ? total_withtax : total_beforetax;
  const total_order = total.toFixed(0) + "$";

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Order Detail</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="px-4 w-full md:w-2/3 mb-6">
          <Card className="mb-6">
            <h4 className="font-semibold mb-4">{order_text.id}: {order_detail.invoice}</h4>
            <div className="w-full mb-6 overflow-x-auto">
              <table className="table-auto w-full ltr:text-left rtl:text-right text-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
                  <tr>
                    <th className="p-4 font-normal">{order_text.product}</th>
                    <th className="p-4 font-normal">{order_text.qty}</th>
                    <th className="p-4 font-normal">{order_text.price}</th>
                    <th className="p-4 font-normal">{order_text.total}</th>
                  </tr>
                </thead>

                <tbody>
                  {data_products.map(( product, index ) => {
                  const total_price = product.price * product.qty;
                  return(
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="p-4 font-normal">
                      <a href={product.url}>
                        <div className="flex flex-wrap flex-row items-center">
                          <div className="self-center">
                            <img className="h-8 w-8" src={product.img} />
                          </div>
                          <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  {product.name}
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="p-4 font-normal text-center">{product.qty}</td>
                    <td className="p-4 font-normal text-center">{product.price}{product.currency}</td>
                    <td className="p-4 font-normal text-center">{total_price}{product.currency}</td>
                  </tr>
                  )})}
                </tbody>
                <tfoot>
                  <tr className="border-b dark:border-gray-700">
                    <td></td>
                    <td colSpan="2" className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{order_text.sub}</b></td>
                    <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{sub_total}$</td>
                  </tr>
                  {order_detail.discount ?
                  <tr className="border-b dark:border-gray-700">
                    <td></td>
                    <td colSpan="2" className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{order_text.discount}</b></td>
                    <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{discount_total}</td>
                  </tr>:''}
                  {order_detail.tax ?
                  <tr className="border-b dark:border-gray-700">
                    <td></td>
                    <td colSpan="2" className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{order_text.tax}</b></td>
                    <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{tax_total}</td>
                  </tr>:''}
                  <tr className="border-b dark:border-gray-700">
                    <td></td>
                    <td colSpan="2" className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{order_text.total}</b></td>
                    <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{total_order}</td>
                  </tr>
                </tfoot>
              </table>
            </div>  
          </Card>

          <Row className="-mx-4">
            <Column className="px-4 w-full md:w-1/2 mb-6">
              <Card className="mb-6 md:h-full">
                <h4 className="font-semibold mb-4">{order_text.billing}</h4>
                <h5 className="mb-1 font-semibold">{billing.name}</h5>
                <address className="text-gray-500">
                  {billing.street}<br />
                  {billing.address}<br />
                  <abbr title="Phone">{order_text.phone}:</abbr> {billing.phone}
                </address>
              </Card>
            </Column>
            <Column className="px-4 w-full md:w-1/2 mb-6">
              <Card className="mb-6 md:h-full">
                <h4 className="font-semibold mb-4">{order_text.payments}</h4>
                <div className="text-gray-500">
                  <p className="mb-1"><span className="font-semibold">{order_text.payment}:</span> {payments.payment}</p>
                  <p className="mb-1"><span className="font-semibold">{order_text.delivered}:</span> {payments.delivered}</p>
                  <p className="mb-1"><span className="font-semibold">{order_text.tracking}:</span> {payments.tracking}</p>
                </div>
              </Card>
            </Column>
          </Row>
        </Column>

        <Column className="px-4 w-full md:w-1/3 mb-6">
          <Card className="mb-6">
            <h4 className="font-semibold mb-4">{order_text.status}</h4>
            <div className="relative">
              <ol className="mb-6">
                {data_status.map((list, index) => {
                const bg_green = list.active === true ? "bg-green-50 dark:bg-gray-900" : '';
                return(
                <li key={index} className={`flex p-3 rounded ${bg_green}`}>
                  <div className="relative flex-shrink-0 w-12 text-center">
                    <span className="absolute ltr:left-1/2 ltr:-ml-1 top-10 -bottom-6 ltr:border-l-2 rtl:right-1/2 rtl:-mr-1 rtl:border-r-2 border-dashed border-gray-200 dark:border-gray-700"></span>
                    <div className="mr-auto">
                      <div className="flex justify-center items-center relative h-10 w-10 rounded-full border border-gray-700 dark:border-gray-200">
                        {list.icon}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex flex-row justify-between pb-2">
                      <div className="text-xs text-gray-500 self-center mr-3">
                        {list.date}
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{list.title}</p>
                  </div>
                </li>
                )})}
              </ol>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}