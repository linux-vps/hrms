import React, { useState } from "react";
import { Tab } from '@headlessui/react'
import { StarFill, Cart } from "react-bootstrap-icons";
import parse from 'html-react-parser';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
// components
import { Preloader, Row, Column, Card, Rating, } from "@/components/reactdash-ui";

export default function ProductDetail() {
  const [index, setIndex] = useState(-1);
  // product text
  const product_text = {
    description: "Descriptions",
    color: "Color",
    sales: "Sales",
    size: "Size",
    brand: "Brand",
    category: "Category",
    stock: "Stock",
    spesification: "Spesification",
    dimension: "Dimension",
    model: "Model",
    add_cart: "Add to Cart",
    department: "Department",
    date: "Date First Available",
    review: "Reviews",
    reviews: "Product Reviews",
    by: "By",
    discussions: "Product discussion",
    ask: "Ask Question?",
    question: "Question",
    answer: "Answer"
  }
  const productImages = [
    {
      src: '/img/products/product_1.jpg',
      title: 'Photo title 1',
      description: 'This is photo description 1',
    },
    {
      src: '/img/products/product_2.jpg',
      title: 'Photo title 2',
      description: 'This is photo description 2',
    },
    {
      src: '/img/products/product_3.jpg',
      title: 'Photo title 3',
      description: 'This is photo description 3',
    }
  ]
  // product info
  const product_info = {
    title: "Nike Women Race Running Shoe",
    description: `<p className="mb-4">With nike renew run you can move for as long as you want, thanks to the even softer foam for maximum cushioning. Designed for everyday runners, this shoe offers secure support, traction and durability for maximum comfort on the go.</p>`,
    img: "/img/products/product_1.jpg",
    img2: "/img/products/product_2.jpg",
    img3: "/img/products/product_3.jpg",
    price: 79,
    discount: 59,
    currency: "$",
    sales: 836,
    brand: "Adidas",
    brand_url: "/",
    category: "Shoes",
    category_url: "/",
    stock: 178,
    dimension: "15.75 x 11.81 x 5.91 inches 1.28 Pounds",
    model: "CK6360-100",
    department: "Women",
    date: "June 29, 2023",
    color1: "Blue",
    color2: "Green",
    color3: "Purple",
    size1: 12,
    size2: 13,
    size3: 14
  }
  // product review
  const product_review = [
    { id: 1, title: "Original product", description: "Trusted seller, original product, fast response and fast shipping", star: 5, name: "Ananda", date: "Oct 12,2023", img1: "/img/products/product_3.jpg", img2: "/img/products/product_2.jpg" },
    { id: 2, description: "Thanks very recommended seller", star: 5, name: "Wiliam", date: "Oct 12,2023" },
    { id: 3, description: "Original product, fast shipping", star: 5, name: "Jenny", date: "Oct 15,2023" },
    { id: 4, description: "Original product, fast shipping, good seller", star: 5, name: "Nando", date: "Oct 17,2023" },
    { id: 5, description: "Recommended Seller", star: 4, name: "Crish", date: "Oct 18,2023" },
    { id: 6, description: "Trusted seller, original product", star: 5, name: "Roman", date: "Oct 20,2023" },
    { id: 7, description: "Recommended Seller", star: 4, name: "James", date: "Oct 18,2023" },
    { id: 8, description: "Recommended Seller", star: 5, name: "Remon", date: "Oct 18,2023" },
    { id: 9, description: "Recommended Seller", star: 5, name: "Bani", date: "Oct 18,2023" },
    { id: 10, description: "Recommended Seller", star: 5, name: "John", date: "Oct 18,2023" },
    { id: 11, description: "Recommended Seller", star: 5, name: "Ferand", date: "Oct 18,2023" },
  ]
  const review_perpage = 6;
  const show_reviews = product_review.length > review_perpage ? `Showing 1 to ${review_perpage} of ${product_review.length} results` : `Showing 1 to ${product_review.length} results`;
  const total_reviews = product_review.length;
  const star_five = product_review.filter(review => review.star === 5).length;
  const percent_five = (star_five / total_reviews) * 100 + "%";
  const star_four = product_review.filter(review => review.star === 4).length;
  const percent_four = (star_four / total_reviews) * 100 + "%";
  const star_three = product_review.filter(review => review.star === 3).length;
  const percent_three = (star_three / total_reviews) * 100 + "%";
  const star_two = product_review.filter(review => review.star === 2).length;
  const percent_two = (star_two / total_reviews) * 100 + "%";
  const star_one = product_review.filter(review => review.star === 1).length;
  const percent_one = (star_one / total_reviews) * 100 + "%";
  const total_star = (star_five * 5) + (star_four * 4) + (star_three * 3) + (star_two * 2) + (star_one * 1);
  const review_perfive = total_star / (total_reviews * 5) * 5;

  // product question
  const product_question = [
    { id: 1, question: "when is it ready for Red color?", answer: "Im very sorry, Sis, until now, the red Nike Women's Race Running Shoe product has not been able to be ordered because of the enthusiasm and interest of buyers so that the product stock runs out.", name: "Jesicca", date: "October 12, 2023" },
    { id: 2, question: "when is it ready for Blue color?", answer: "Im very sorry, Sis, until now, the blue Nike Women's Race Running Shoe product has not been able to be ordered because of the enthusiasm and interest of buyers so that the product stock runs out.", name: "Damian", date: "October 15, 2023" },
    { id: 3, question: "when is it ready for Purple color?", answer: "Im very sorry, Sis, until now, the purple Nike Women's Race Running Shoe product has not been able to be ordered because of the enthusiasm and interest of buyers so that the product stock runs out.", name: "Benardo", date: "October 17, 2023" },
  ]
  const question_perpage = 6;
  const show_questions = product_question.length > question_perpage ? `Showing 1 to ${question_perpage} of ${product_question.length} results` : `Showing 1 to ${product_question.length} results`;

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">
          <p className="text-xl font-bold mt-3 mb-5">Product Detail</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6 mb-6">
            <div className="flex flex-wrap flex-row -mx-4">
              <div className="flex-shrink max-w-full px-4 w-full md:w-1/3 text-center">
                <div className="p-4">
                  <div onClick={() => setIndex(0)} className="glightbox3 max-w-full w-full h-auto cursor-zoom-in">
                    <img src={productImages[0].src} alt={productImages[0].title} />
                  </div>
                  {/* addtional images  */}
                  <ul className="flex flex-row gap-4 pt-4">
                    {productImages.slice(1).map((galleryItem, i) => (
                      <li key={i} className="inline-block">
                        <div onClick={() => setIndex(i + 1)} className="glightbox3">
                          <img src={galleryItem.src} alt={galleryItem.title} className="w-24 h-auto cursor-zoom-in" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-shrink max-w-full px-4 w-full md:w-2/3">
                <h1 className="text-2xl text-semibold mb-4">{product_info.title}</h1>
                <div className="flex my-1">
                  <Rating data={review_perfive.toFixed(1)} />
                  <span className="ltr:mr-2 rtl:ml-2">{product_info.review}({product_review.length})</span>
                </div>
                <p className="mb-4 text-sm">{product_text.sales}: {product_info.sales}x</p>
                <h3 className="font-bold text-3xl text-green-600 mb-4">
                  {product_info.discount ?
                    <>
                      <span className="line-through mr-2 font-normal text-gray-500">{product_info.price}{product_info.currency}</span><span>{product_info.discount}{product_info.currency}</span>
                    </>
                    :
                    <>
                      <span>{product_info.price}{product_info.currency}</span>
                    </>
                  }
                </h3>
                <div className="mb-4">
                  <input type="hidden" name="quantity" value="1" />
                  <input type="hidden" name="product_id" value="81" />

                  <button type="submit" id="button-cart" className="py-2 px-5 inline-block text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
                    <Cart className="inline" /> {product_text.add_cart}
                  </button>
                </div>
                <div className="text-sm">
                  <p className="mb-2">{product_text.brand}: <a href={product_info.brand_url} className="hover:text-indigo-500">{product_info.brand}</a></p>
                  <p className="mb-2">{product_text.category}: <a href={product_info.category_url} className="hover:text-indigo-500">{product_info.category}</a></p>
                  <p className="mb-2">{product_text.stock}: {product_info.stock}</p>
                </div>
              </div>
            </div>
            <Lightbox
              index={index}
              open={index >= 0}
              close={() => setIndex(-1)}
              slides={productImages}
              plugins={[Captions, Fullscreen, Thumbnails]}
            />
            <div className="flex flex-wrap flex-row">
              <Tab.Group as="div" className="relative w-full">
                <Tab.List as="ul" className="w-full flex border-b border-gray-200 dark:border-gray-700">
                  <Tab as="li" className="mr-1">
                    {({ selected }) => (
                      <button className={
                        selected ? 'py-2 px-4 -mb-px bg-white dark:bg-gray-800 inline-block border-l border-t border-r rounded-t focus:ring-0 focus:outline-none text-indigo-500 dark:border-gray-700' : 'bg-white dark:bg-gray-800 inline-block py-2 px-4 focus:ring-0 focus:outline-none hover:text-indigo-500 font-semibold dark:border-gray-700 -mb-px border-b text-gray-500'
                      } >{product_text.description}</button>
                    )}
                  </Tab>
                  <Tab as="li" className="mr-1">
                    {({ selected }) => (
                      <button className={
                        selected ? 'py-2 px-4 -mb-px bg-white dark:bg-gray-800 inline-block border-l border-t border-r rounded-t focus:ring-0 focus:outline-none text-indigo-500 dark:border-gray-700' : 'bg-white dark:bg-gray-800 inline-block py-2 px-4 focus:ring-0 focus:outline-none hover:text-indigo-500 font-semibold dark:border-gray-700 -mb-px border-b text-gray-500'
                      } >{product_text.review} ({product_review.length})</button>
                    )}
                  </Tab>
                  <Tab as="li" className="mr-1">
                    {({ selected }) => (
                      <button className={
                        selected ? 'py-2 px-4 -mb-px bg-white dark:bg-gray-800 inline-block border-l border-t border-r rounded-t focus:ring-0 focus:outline-none text-indigo-500 dark:border-gray-700' : 'bg-white dark:bg-gray-800 inline-block py-2 px-4 focus:ring-0 focus:outline-none hover:text-indigo-500 font-semibold dark:border-gray-700 -mb-px border-b text-gray-500'
                      } >{product_text.question} ({product_question.length})</button>
                    )}
                  </Tab>
                </Tab.List>

                <Tab.Panels className="w-full pt-4">
                  <Tab.Panel>
                    {parse(product_info.description)}
                    <h2 className="text-lg font-semibold mb-2">{product_text.spesification}</h2>
                    <ul>
                      <li className="py-2 border-b dark:border-gray-700 flex items-center justify-between"><span className="text-gray-500">{product_text.dimension}:</span> {product_info.dimension}</li>
                      <li className="py-2 border-b dark:border-gray-700 flex items-center justify-between"><span className="text-gray-500">{product_text.model}:</span> {product_info.model}</li>
                      <li className="py-2 border-b dark:border-gray-700 flex items-center justify-between"><span className="text-gray-500">{product_text.department}:</span> {product_info.department}</li>
                      <li className="py-2 border-b dark:border-gray-700 flex items-center justify-between"><span className="text-gray-500">{product_text.date}:</span> {product_info.date}</li>
                      <li className="py-2 border-b dark:border-gray-700 flex items-center justify-between"><span className="text-gray-500">{product_text.color}:</span> {product_info.color1}, {product_info.color2}, {product_info.color3}</li>
                    </ul>
                  </Tab.Panel>
                  <Tab.Panel>
                    <h2 className="text-lg font-semibold mb-2">{product_text.reviews}</h2>
                    <div className="flex items-center text-center pb-6 border-b dark:border-gray-700">
                      <div className="flex flex-col ltr:mr-3 rtl:ml-3">
                        <h4 className="text-3xl font-semibold"><span>{review_perfive.toFixed(1)}</span>/5.0</h4>
                        <Rating data={review_perfive} />
                        <div className="text-sm text-gray-500">{total_reviews} {product_text.review}</div>
                      </div>
                      <div className="flex flex-col ltr:mr-3 rtl:ml-3">
                        <div className="flex items-center">
                          <div className="ltr:mr-2 rtl:ml-2 flex">5
                            <StarFill className="text-yellow-400 ml-1" />
                          </div>
                          <div className="ltr:mr-2 rtl:ml-2 w-40 h-2 bg-gray-200 rounded-full"><div className="h-full text-center text-xs text-white bg-yellow-400 rounded-full" style={{ width: percent_five }}></div></div><div className="ltr:mr-2 rtl:ml-2">({star_five})</div>
                        </div>
                        <div className="flex items-center">
                          <div className="ltr:mr-2 rtl:ml-2 flex">4
                            <StarFill className="text-yellow-400 ml-1" />
                          </div>
                          <div className="ltr:mr-2 rtl:ml-2 w-40 h-2 bg-gray-200 rounded-full"><div className="h-full text-center text-xs text-white bg-yellow-400 rounded-full" style={{ width: percent_four }}></div></div><div className="ltr:mr-2 rtl:ml-2">({star_four})</div>
                        </div>
                        <div className="flex items-center">
                          <div className="ltr:mr-2 rtl:ml-2 flex">3
                            <StarFill className="text-yellow-400 ml-1" />
                          </div>
                          <div className="ltr:mr-2 rtl:ml-2 w-40 h-2 bg-gray-200 rounded-full"><div className="h-full text-center text-xs text-white bg-yellow-400 rounded-full" style={{ width: percent_three }}></div></div><div className="ltr:mr-2 rtl:ml-2">({star_three})</div>
                        </div>
                        <div className="flex items-center">
                          <div className="ltr:mr-2 rtl:ml-2 flex">2
                            <StarFill className="text-yellow-400 ml-1" />
                          </div>
                          <div className="ltr:mr-2 rtl:ml-2 w-40 h-2 bg-gray-200 rounded-full"><div className="h-full text-center text-xs text-white bg-yellow-400 rounded-full" style={{ width: percent_two }}></div></div><div className="ltr:mr-2 rtl:ml-2">({star_two})</div>
                        </div>
                        <div className="flex items-center">
                          <div className="ltr:mr-2 rtl:ml-2 flex">1
                            <StarFill className="text-yellow-400 ml-1" />
                          </div>
                          <div className="ltr:mr-2 rtl:ml-2 w-40 h-2 bg-gray-200 rounded-full"><div className="h-full text-center text-xs text-white bg-yellow-400 rounded-full" style={{ width: percent_one }}></div></div><div className="ltr:mr-2 rtl:ml-2">({star_one})</div>
                        </div>
                      </div>
                    </div>
                    {/* reviews  */}
                    {product_review.slice(0, review_perpage).map((review, index) =>
                      <div key={index} className="flex flex-col py-4 border-b dark:border-gray-700">
                        <div className="flex flex-row">
                          {review.title ?
                            <h4 className="font-semibold mb-1 ltr:mr-2 rtl:ml-2">{review.title}</h4> : ''}
                          <Rating data={review.star} />
                        </div>
                        <p className="text-gray-500 mb-1">{review.description}</p>
                        <p className="text-xs text-gray-500 mb-2">{product_text.by} {review.name} <span className="ml-1">{review.date}</span></p>
                        <div className="w-full">
                          {review.img1 ?
                            <a href={review.img1} className="glightbox3 mr-2" data-gallery="gallery2">
                              <img className="inline-block border dark:border-gray-700 w-20 h-auto hover:opacity-90" src={review.img1} />
                            </a> : ''}
                          {review.img2 ?
                            <a href={review.img2} className="glightbox3 mr-2" data-gallery="gallery2">
                              <img className="inline-block border dark:border-gray-700 w-20 h-auto hover:opacity-90" src={review.img2} />
                            </a> : ''}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-row justify-between py-4">
                      <p className="self-center">{show_reviews}</p>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {product_text.ask ?
                      <h2 className="text-lg font-semibold mb-2">{product_text.discussions}</h2> : ''}
                    {product_question.map((question, index) =>
                      <div key={index} className="flex flex-col p-4 mb-4 rounded-md border dark:border-gray-700">
                        <h5 className="mb-1 font-bold">{product_text.question}: {question.question}</h5>
                        <p className="text-xs mb-2">{product_text.by} {question.name} <span className="italic">{question.date}</span></p>
                        <p className="mb-1"><span className="font-bold">{product_text.answer}:</span> {question.answer}</p>
                        <p className="text-xs mb-2">{product_text.by} CS</p>
                      </div>
                    )}

                    <div className="flex flex-row justify-between py-4">
                      <p className="self-center">{show_questions}</p>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}