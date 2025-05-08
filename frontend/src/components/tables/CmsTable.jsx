import React, { useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import { HandThumbsUp, Eye, ChatDots, PlusLg } from 'react-bootstrap-icons';
import { Pagination, Button } from "@/components/reactdash-ui";

export default function CmsTable() {
  // act button
  const addPost = { title: "Add Post", url: "/" }
  const addPages = { title: "Pages", url: "/" }

  // table title
  const titletables = { title: 'Title', view: <Eye />, like: <HandThumbsUp />, comment: <ChatDots /> }
  // data table
  const datatables = [
    { id: 1 , title: "How to get started with Tailwind Css ?", url: "/", view: 934, like: 136, comment: 121 },
    { id: 2 , title: "Best Html admin template for Tailwind", url: "/", view: 789, like: 132, comment: 98 },
    { id: 3 , title: "Introducing Tailwind UI/UX Ecommerce", url: "/", view: 629, like: 92, comment: 87 },
    { id: 4 , title: "The Next Generation of Tailwind CSS", url: "/", view: 609, like: 82, comment: 83 },
    { id: 5 , title: "W3C TPAC 2021 Exhibition Space opens for registration", url: "/", view: 600, like: 90, comment: 72 },
    { id: 6 , title: "Minecraft Wild Update's Deep Cities Turn It Into A Horror Game", url: "/", view: 529, like: 72, comment: 81 },
    { id: 7 , title: "How Long Is A Day On Mars", url: "/", view: 509, like: 62, comment: 77 },
    { id: 8 , title: "Why The Moon Sequel Isn't Happening", url: "/", view: 500, like: 52, comment: 57 },
    { id: 9 , title: "How Far Away Is It From The Sun?", url: "/", view: 489, like: 62, comment: 66 },
    { id: 10 , title: "Mars is a cold planet filled with rocks & sand", url: "/", view: 489, like: 62, comment: 57 },
    { id: 11 , title: "Why Mars Has Longer Days Than Earth?", url: "/", view: 329, like: 42, comment: 47 },
    { id: 12 , title: "Mars Dunes Look Massive In This Photo", url: "/", view: 249, like: 32, comment: 34 },
    { id: 13, title: "Best tailwind dashboard 2023", url: "/", view: 549, like: 32, comment: 34 },
    { id: 14, title: "8 React dashboard for start new project", url: "/", view: 259, like: 32, comment: 34 },
    { id: 15, title: "Best React component for your site", url: "/", view: 299, like: 32, comment: 34 },
    { id: 16, title: "5 most popular Cms in 2023", url: "/", view: 259, like: 32, comment: 34 },
  ]
  // total data & max item per page
  let total_data = datatables.length;
  let data_per_page = 8;
  const latestdata = [...datatables].sort((a, b) => b.id - a.id);

  // pagination
	const [currentPage, setCurrentPage] = useState(1);
  // page changed
  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
	// slice datatables
  const currentData = latestdata.slice(
    (currentPage - 1) * data_per_page,
    (currentPage - 1) * data_per_page + data_per_page
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      {/* btn action */}
      <div className="flex justify-between mb-6">
        <Link to={addPost.url}>
          <Button color="primary" className="mr-2">
            <PlusLg className="inline-block ltr:mr-2 rtl:ml-2" /> {addPost.title}
          </Button>
        </Link>
        <Link to={addPages.url}>
          <Button color="secondary">
            <PlusLg className="inline-block ltr:mr-2 rtl:ml-2" /> {addPages.title}
          </Button>  
        </Link>
      </div>
      
      <div className="hidden-header hidden-sort-after">
        {/* table post  */}
        <table className="table-sorter table-bordered-bottom w-full text-sm ltr:text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40">
              <th>
                {titletables.title}
              </th>
              <th>
                {titletables.view}
              </th>
              <th>
                {titletables.like}
              </th>
              <th>
                {titletables.comment}
              </th>
            </tr>
          </thead>
          <tbody>
          { currentData.map( (datatable, index) => (
            <tr key={index}>
              <td><a href={datatable.url} className="hover:text-indigo-500 hover:underline">{datatable.title}</a></td>
              <td>{datatable.view}</td>
              <td>{datatable.like}</td>
              <td>{datatable.comment}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <Pagination
          totalData={total_data}
          perPage={data_per_page}
          className="mt-8"
          onPageChanged={onPageChanged}
          currentPage={currentPage} />
      </div>
    </div>
  );
}