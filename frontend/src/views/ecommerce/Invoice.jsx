import React from "react";
import { Printer } from "react-bootstrap-icons";
// components
import { Preloader, Row, Column, Button, Card } from "@/components/reactdash-ui";

export default function Invoice() {
  const handlePrint = () => window.print();
  // data invoice
  const invoice_text = {
    invoice: "Invoice", bill: "Bill to", invoiceid: "Invoice ID", date: "Invoice date", due: "Due date",
    status: "Status", payment: "Payment", product: "Products", qty: "Qty", price: "Unit price", total: "Total", sub: "Sub-Total", discount: "Discount", tax: "Tax", print: "Print Invoice"
  }
  const invoice_content = {
    logo: "Reactdash",
    img: "/img/logo.png",
    street: "Amphitheatre, Mountain View",
    address: "San Francisco, CA 9321, US",
    billname: "James Doe",
    billstreet: "Andreas street, Mountain View",
    billaddress: "San Francisco, CA 9321, US",
    billemail: "Andreas-Doe@domain.com",
    billphone: "+123 456 7890",
    invoiceid: "INV1089",
    date: "12/08/2022",
    due: "12/08/2022",
    status: "Paid",
    payment: "Paypal",
    products: [
      {name: "Nike Unisex-Child Free Rn (Big Kid)", img: "/img/products/product_1.jpg", qty: 3, price: 70, currency: "$"},
      {name: "Nike in-Season TR 9 Womens Running Shoe", img: "/img/products/product_2.jpg", qty: 1, price: 80, currency: "$"}
    ],
    discount: 20,
    tax: 8,
    sub: 290,
    total: 251
  }
  const products = invoice_content.products;

  return (
    <Preloader>
      {/* page title  */}
      <div id="headpage" className="flex flex-wrap flex-row">
        <Column className="w-full px-4 flex items-center justify-between mb-4">   
          <p className="text-xl font-bold mt-3 mb-5">Invoice #1089</p>
          <Button onClick={handlePrint} className="ltr:mr-2 rtl:ml-2 inline-block">
            <Printer className="inline-block mr-1" />Print Invoice
          </Button>
        </Column> 
      </div>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6 mb-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 mb-3">
              <div className="flex flex-col">
                <div className="text-3xl font-bold mb-1">
                  <img className="inline-block w-12 h-auto ltr:mr-2 rtl:ml-2" src={invoice_content.img} />{invoice_content.logo}
                </div>
                <p className="text-sm">{invoice_content.street}<br/>{invoice_content.address}</p>
              </div>
              <div className="text-4xl uppercase font-bold">{invoice_text.invoice}</div>
            </div>

            <div className="flex flex-row justify-between py-3">
              <div className="flex-1">
                <p><strong>{invoice_text.bill}:</strong><br/>
                {invoice_content.billname}<br/>
                {invoice_content.billstreet}<br/>
                {invoice_content.billaddress}<br/>
                {invoice_content.billemail}<br/>
                {invoice_content.billphone}</p>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <div className="flex-1 font-semibold">{invoice_text.invoiceid}#:</div><div className="flex-1 ltr:text-right rtl:text-left">{invoice_content.invoiceid}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex-1 font-semibold">{invoice_text.date}:</div><div className="flex-1 ltr:text-right rtl:text-left">{invoice_content.date}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex-1 font-semibold">{invoice_text.due}:</div><div className="flex-1 ltr:text-right rtl:text-left">{invoice_content.due}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex-1 font-semibold">{invoice_text.status} #:</div><div className="flex-1 ltr:text-right rtl:text-left">{invoice_content.status}</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex-1 font-semibold">{invoice_text.payment} #:</div><div className="flex-1 ltr:text-right rtl:text-left">{invoice_content.payment}</div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <table className="table-bordered w-full ltr:text-left rtl:text-right text-gray-600">
                <thead className="border-b dark:border-gray-700">
                  <tr className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20">
                    <th>{invoice_text.product}</th>
                    <th className="text-center">{invoice_text.qty}</th>
                    <th className="text-center">{invoice_text.price}</th>
                    <th className="text-center">{invoice_text.total}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                  const total_price = product.price * product.qty;
                  return(
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td>
                      <div className="flex flex-wrap flex-row items-center">
                        <div className="self-center">
                          <img className="h-8 w-8" src={product.img} />
                        </div>
                        <div className="leading-5 dark:text-gray-300 flex-1 ltr:ml-2 rtl:mr-2 mb-1">  
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{product.qty}</td>
                    <td className="text-center">{product.price}$</td>
                    <td className="text-center">{total_price}$</td>
                  </tr>
                  )})}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="2"></td>
                    <td className="text-center"><b>{invoice_text.sub}</b></td>
                    <td className="text-center">{invoice_content.sub}$</td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td className="text-center"><b>{invoice_text.discount}</b></td>
                    <td className="text-center">{invoice_content.discount}%</td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td className="text-center"><b>{invoice_text.tax}</b></td>
                    <td className="text-center">{invoice_content.tax}%</td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td className="text-center"><b>{invoice_text.total}</b></td>
                    <td className="text-center font-bold">{invoice_content.total}$</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}