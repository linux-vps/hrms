import React, { useState} from "react";
import { ArrowRight } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Button, Card } from "@/components/reactdash-ui";

export default function Checkout() {
  // data checkout
  const checkout_text = {address: "Shipping Address", currier: "Shipping Method", payment:"Payment Method", phone: "Phone", product: "Product", pricing: "Price", qty: "Qty", sub: "Sub total", discount: "Discount", total: "Total", continue: "Continue"}

  const data_checkout = {
    address: [
      {title:"Home", name: "John Doe", street: "Mountain view, Joice 12", address:"San Francisco, CA 82987, USA", phone:"1234567890", default: false},
      {title:"Office", name: "Jenny Doe", street: "Sunset 12, Joice", address:"San Francisco, CA 82987, USA", phone:"0987654321", default: true},
    ],
    shipping: [
      {service:"Free", name: "Standart", fee: 0, default: true },
      {service:"Express", name: "Giant Express", fee: 12, default: false },
      {service:"One Day", name: "Super Express", fee: 25, default: false }
    ],
    payment: [
      {name:"Credit/Debit", img:"/img/payments/creditcard.png", default: true},
      {name:"Paypal", img:"/img/payments/paypal.png", default: false},
      {name:"Payoneer", img:"/img/payments/payoneer.png", default: false}
    ],
    products: [
      { name: "Nike Unisex-Child Free Rn (Big Kid)", img: "/img/products/product_1.jpg", qty: 3, url: "/", model: "blue", price: 70, currency: "$"},
      { name: "Nike in-Season TR 9 Womens Running Shoe", img: "/img/products/product_2.jpg", qty: 1, url: "/", model: "red", price: 80, currency: "$"},
    ]
  }

  // radio default checked
  const [isAddress, setAddress] = useState( "Home" );
  const [isCurrier, setCurrier] = useState( "Free" );
  const [isPayment, setPayment] = useState( "Paypal" );
  const radioAddress = (e) => {
    setAddress(e.target.value);
  }
  const radioCurrier = (e) => {
    setCurrier(e.target.value);
  }
  const radioPayment = (e) => {
    setPayment(e.target.value);
  }

  const data_address = data_checkout.address;
  const data_shipping = data_checkout.shipping;
  const data_payment = data_checkout.payment;
  const data_products = data_checkout.products;
  const discount = 20;
  // sub total
  const sub_total = data_products.reduce((product,v) =>  product = product + (v.price * v.qty) , 0 );
  const discount_total = discount + "%";
  const total_withdiscount = sub_total - ( sub_total / 100 * discount );
  const total = discount ? total_withdiscount : sub_total;
  const total_order = total.toFixed(0) + "$";

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Checkout</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full lg:w-2/3 px-4 mb-6">
          <Card className="mb-6">
            <form action="">
              <div className="flex-1">
                <p className="mb-3 font-semibold">{checkout_text.address}</p>
                <div className="flex flex-wrap flex-row mb-6">
                  {data_address.map( (address, index) =>
                  <label key={index} className="p-6 flex-shrink bg-gray-50 dark:bg-gray-900 bg-opacity-70 max-w-full w-full md:w-1/2 cursor-pointer">
                    <input type="radio" onChange={radioAddress} 
                    checked={isAddress === address.title} 
                    className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-full" 
                    name="shippingAddress" 
                    value={address.title} />

                    <span className="ltr:ml-2 rtl:mr-2">{address.title}</span>
                    <h5 className="mt-3 mb-1 font-semibold">{address.name}</h5>
                    <p className="text-gray-500">
                      {address.street}<br/>
                      {address.address}<br/>
                      <abbr title={checkout_text.phone}>{checkout_text.phone}:</abbr> {address.phone}
                    </p>
                  </label>
                  )}
                </div>
                <p className="mb-3 font-semibold">{checkout_text.currier}</p>
                <div className="flex flex-wrap flex-row mb-6 bg-gray-50 dark:bg-gray-900 bg-opacity-70 text-gray-700">
                  {data_shipping.map( (shipping, index) =>
                  <label key={index} className="p-6 flex-shrink max-w-full w-full md:w-1/3 cursor-pointer">
                    <input type="radio" onChange={radioCurrier} 
                    checked={isCurrier === shipping.service} 
                    className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-full" name="shippingMethod" value={shipping.service} />
                    <span className="ltr:ml-2 rtl:mr-2">{shipping.service}</span>
                    <h5 className="mt-3 mb-1 font-semibold">{shipping.name}</h5>
                    <p className="text-gray-500">{shipping.fee}$</p>
                  </label>
                  )}
                </div>
                <p className="mb-3 font-semibold">{checkout_text.payment}</p>
                <div className="flex flex-wrap flex-row mb-6 bg-gray-50 dark:bg-gray-900 bg-opacity-70 text-gray-700">
                  {data_payment.map( (payment, index) =>
                  <label key={index}  className="p-6 flex-shrink max-w-full w-full md:w-1/3 cursor-pointer">
                    <input type="radio" onChange={radioPayment} 
                    checked={isPayment === payment.name} 
                    className="form-checkbox h-5 w-5 text-indigo-500 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 focus:outline-none rounded-full" name="paymentMethod" value={payment.name} />
                    <h5 className="mt-3 mb-1 font-semibold">{payment.name}</h5>
                    <img src={payment.img} className="w-40" />
                  </label>
                  )}
                </div>
                <div className="flex-shrink max-w-full w-full">
                  <Button type="submit">
                    {checkout_text.continue} <ArrowRight className="inline-block ltr:ml-2 rtl:mr-2" />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </Column>

        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <Card className="mb-6">
            <table className="table-auto w-full ltr:text-left rtl:text-right text-gray-600">
              <thead className="border-b dark:border-gray-700">
                <tr className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20">
                  <th className="p-4 font-normal">{checkout_text.product}</th>
                  <th className="p-4 font-normal">{checkout_text.pricing}</th>
                </tr>
              </thead>

              <tbody className="bg-gray-100 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-20 text-sm">
                {data_products.map((product, index)=> {
                const total_price = product.price * product.qty;
                return(
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="p-4 font-normal">
                    <div className="flex flex-wrap flex-row items-center">
                      <div className="self-center">
                        <img className="h-8 w-8" src={product.img} />
                      </div>
                      <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                        {product.name}<br />
                        <i className="text-sm">(x{product.qty})</i>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-normal text-center">{total_price}$</td>
                </tr>
                )})}
              </tbody>

              <tfoot className="bg-gray-100 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-20 text-sm">
                <tr className="border-b dark:border-gray-700">
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{checkout_text.sub}</b></td>
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{sub_total}$</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{checkout_text.discount}</b></td>
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{discount_total}</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left"><b>{checkout_text.total}</b></td>
                  <td className="p-4 font-normal text-center ltr:text-right rtl:text-left totals">{total_order}</td>
                </tr>
              </tfoot>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}