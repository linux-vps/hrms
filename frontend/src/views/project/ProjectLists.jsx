import React from "react";
import { PlusLg } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card, Button } from "@/components/reactdash-ui";
import ProjectsCard from "@/components/widgets/ProjectsCard";

export default function ProjectLists() {
  // Project
  const project_text = {
    add: "Add new project"
  }

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Project Lists</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative py-4 px-6 mb-6">
            <div className="flex flex-row items-center justify-between">
              <a href="#">
                <Button>
                  {project_text.add}
                  <PlusLg className="inline-block ltr:ml-1 rtl:mr-1 bi bi-plus-lg" />
                </Button>
              </a>
              {/* search */}
              <div className="relative flex items-center w-1/2 md:w-60 h-full group mt-0 md:self-center">
                <svg className="absolute ltr:left-0 rtl:right-0 z-20 w-4 h-4 ltr:ml-4 rtl:mr-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
                <input type="text" className="block w-full py-1.5 ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4 leading-normal rounded-2xl focus:outline-none bg-gray-100 border border-gray-100 focus:border-gray-200 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-700" placeholder="Search project" />
              </div>
            </div>
          </Card>

          <ProjectsCard />

        </Column>
      </Row>
    </Preloader>
  );
}