import React from "react";
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// widget
import { ProjectCard, ProjectStatistic, ProjectActifity  } from "@/components/widgets";
// table
import ProjectTable from "@/components/tables/ProjectTable";
// content
import BudgetsChart from "@/components/charts/project/BudgetsChart";

export default function ProjectDetail() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Project Detail</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
          <ProjectCard />
        </Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
          <ProjectStatistic title="Project Statistic" />
        </Column>

        <Column className="w-full px-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
            <div className="overflow-x-auto">
              <ProjectTable />
            </div>
          </div>
        </Column>

        <Column className="w-full lg:w-1/2 mb-6 px-4">
          <BudgetsChart title="Project Budgets"/>
        </Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
          <ProjectActifity title="Project Actifity"/>
        </Column>
      </Row>
    </Preloader>
  );
}