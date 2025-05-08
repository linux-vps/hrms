import React from "react";
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// content
import { SalesRevenue, NetProfits, CrossSell, CostBreakdown, Increment, SalesTarget } from "@/components/charts/sales";
// widget
import { SalesSmallBox } from "@/components/widgets";
// table
import BestSeller from "@/components/tables/BestSeller";
import SalesLeaderboard from "@/components/tables/SalesLeaderboard";

export default function Sales() {
	const smallbox1 = {name: "Sales", count: 1200, target: 1100}
	const smallbox2 = {name: "Revenue", count: 12500, target: 9600}
	const smallbox3 = {name: "Profit", count: 5200, target: 4500}
	const smallbox4 = {name: "Costs", count: 5200, target: 6100}

  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Sales</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
					<SalesSmallBox title="Sales" data={smallbox1} />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SalesSmallBox title="Revenue" data={smallbox2} model="currency" color="warning" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SalesSmallBox title="Profit" data={smallbox3} model="currency" color="success" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SalesSmallBox title="Cost" data={smallbox4} model="currency" color="danger" />
				</Column>
				
				<Column className="px-4 w-full mb-6">
					<SalesRevenue title="Sales Revenue" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<NetProfits title="Net Profit" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<CrossSell title="Up/Cross Sell" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<CostBreakdown title="Cost Breakdown" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<Increment title="Increment Sales" />
				</Column>
				<Column className="px-4 w-full mb-6">
					<SalesLeaderboard title="Sales Leaderboard" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <BestSeller />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<SalesTarget title="Sales Target" />
				</Column>
			</Row>
		</Preloader>
  );
}