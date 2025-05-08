import React from "react";
import { ArrowRight } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card, Input, Button } from "@/components/reactdash-ui";

export default function ShoppingCart() {
  // shopping cart
  const cart_text = {
    products: "Products",
    model: "Model",
    qty: "Quantity",
    price: "Unit Price",
    total: "Total",
    sub: "Sub-Total",
    discount_text: "Discount",
    discount: 20,
    enter: "Enter your coupon code",
    apply: "Apply Coupon",
    checkout: "Checkout Now",
    link: "/"
  }
  const data_products = [
    { name: "Nike Unisex-Child Free Rn (Big Kid)", img: "/img/products/product_1.jpg", qty: 3, url: "/", model: "blue", price: 70, currency: "$"},
    { name: "Nike in-Season TR 9 Womens Running Shoe", img: "/img/products/product_2.jpg", qty: 1, url: "/", model: "red", price: 80, currency: "$"},
  ]
  // sub total
  const sub_total = data_products.reduce((product,v) =>  product = product + (v.price * v.qty) , 0 );
  const tax_total = cart_text.tax + "%";
  const discount_total = cart_text.discount + "%";
  const total_withdiscount = sub_total - ( sub_total / 100 * cart_text.discount );
  const total_beforetax = cart_text.discount ? total_withdiscount : sub_total;
  const total_withtax = total_beforetax + ( total_beforetax / 100 * cart_text.tax );
  const total = cart_text.tax ? total_withtax : total_beforetax;
  const total_order = total.toFixed(0) + "$";

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Shopping Cart</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <div className="w-full mb-6 overflow-x-auto">
              <table className="table-auto w-full ltr:text-left rtl:text-right text-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
                  <tr>
                    <th className="p-4 font-normal">{cart_text.products}</th>
                    <th className="p-4 font-normal hidden lg:table-cell">{cart_text.model}</th>
                    <th className="p-4 font-normal hidden lg:table-cell">{cart_text.qty}</th>
                    <th className="p-4 font-normal">{cart_text.price}</th>
                    <th className="p-4 font-normal hidden lg:table-cell">{cart_text.total}</th>
                  </tr>
                </thead>
                <tbody>
                  {data_products.map((product, index) => {
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
                    <td className="p-4 font-normal text-center hidden lg:table-cell">{product.model}</td>
                    <td className="p-4 font-normal text-center hidden lg:table-cell">
                      <div className="flex flex-row">
                        {product.qty}
                      </div>
                    </td>
                    <td className="p-4 font-normal text-center">{product.price}$</td>
                    <td className="p-4 font-normal text-center hidden lg:table-cell">{total_price}$</td>
                  </tr>
                  )})}
                </tbody>
              </table>

              <div className="flex flex-wrap flex-row">
                <div className="flex-shrink max-w-full px-4 w-full md:w-1/2">
                  <form action="#" className="my-6" id="coupon">
                    <label className="col-12 mb-2 hidden" htmlFor="input-coupon">{cart_text.enter}</label>
                    <div className="flex w-full relative mb-6">
                      <Input type="text" name="coupon" placeholder={cart_text.enter} id="input-coupon" className="rounded-r-none" />
                      <span className="flex-mr-px">
                        <Button type="submit" color="success" id="button-coupon" className="rounded-l-none">{cart_text.apply}</Button>
                      </span>
                    </div>
                  </form>
                </div>
                <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 table-custom">
                  <table className="table-auto w-full ltr:text-left rtl:text-right text-gray-600">
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td colSpan="4"></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left"><b>{cart_text.sub}</b></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left totals">{sub_total}$</td>
                      </tr>
                      {cart_text.discount ?
                      <tr className="border-b dark:border-gray-700">
                        <td colSpan="4"></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left"><b>{cart_text.discount_text}</b></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left totals">{discount_total}</td>
                      </tr>: ''}
                      <tr className="border-b dark:border-gray-700">
                        <td colSpan="4"></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left"><b>{cart_text.total}</b></td>
                        <td className="p-4 font-normal text-center md:ltr:text-right md:rtl:text-left totals">{total_order}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="pt-4 w-full ltr:text-right rtl:text-left">
                    <a href={cart_text.link} className="py-2 px-4 inline-block text-center rounded leading-5 mb-3 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-gray-100 hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                      {cart_text.checkout}<ArrowRight className="inline-block ltr:ml-2 rtl:mr-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}