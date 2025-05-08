import React from "react";
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// content
import MonthlySales from "@/components/charts/ecommerce/MonthlySales";
import TrafficSource from "@/components/charts/ecommerce/TrafficSource";
import Performance from "@/components/charts/marketing/Performance";
import BudgetsChart from "@/components/charts/project/BudgetsChart";
import DealStatistic from "@/components/charts/crm/DealStatistic";
import Revenue from "@/components/charts/marketing/RevenuePlatform";
import { ActiveUser } from "@/components/charts/analytics/Index";
import { VisitorsSignup } from "@/components/charts/saas";
import { CostBreakdown } from "@/components/charts/sales";
import { SeoChart } from "@/components/charts/cms";

export default function ChartDocs() {
  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Charts Js</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full lg:w-1/2 mb-6 px-4">
					<MonthlySales title="Bar chart" />
          
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<Performance title="Bar chart horizontal" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<BudgetsChart title="Bar chart combo" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<DealStatistic title="Line chart area" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<Revenue title="Line chart interpolation" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<ActiveUser title="Line chart thin" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<VisitorsSignup title="Mixed chart" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<CostBreakdown title="Pie chart" />
				</Column>
				<Column className="w-full lg:w-1/2 mb-6 px-4">
					<TrafficSource title="Doughnut chart" />
				</Column>
        <Column className="w-full lg:w-1/2 mb-6 px-4">
					<SeoChart title="Gauge chart" />
				</Column>
			</Row>
		</Preloader>
  );
}