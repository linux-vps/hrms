import React from "react";
import { People, Telephone } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// content
import DealStatistic from "@/components/charts/crm/DealStatistic";
import DealPipeline from "@/components/charts/crm/DealPipeline";
import EmailSent from "@/components/charts/crm/EmailSent";
// widget
import { MonthlyRevenue, SmallCard, RecentTask, DealsCard, Schedules } from "@/components/widgets";
// table
import RencentLeads from "@/components/tables/RecentLeads";
import LeaderboardCrm from "@/components/tables/LeaderboardCrm";
import Campaigns from "@/components/tables/Campaigns";

export default function Crm() {
	const smallbox1 = {icon: <People className="w-8 h-8" />, iconbig: <People className="opacity-10 w-36 h-auto" /> , count: 202}
	const smallbox2 = {icon: <Telephone className="w-8 h-8" />, iconbig:  <Telephone className="opacity-10 w-36 h-auto" />, count: 163}

  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">CRM</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<MonthlyRevenue title="Monthly Revenue" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
					<SmallCard title="New Lead" data={smallbox1} color="primary" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SmallCard title="New Contact" data={smallbox2} color="secondary" />
				</Column>
			</Row>

			<Row>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<DealStatistic title="Deal Statistic" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <RecentTask title="Today Task List"/>
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<RencentLeads title="Recent Leads" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<DealPipeline title="Deal Pipeline" />
				</Column>
			</Row>
			
			<Row>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<EmailSent title="Email Sent" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<DealsCard title="Won Deals" color="primary" className="mb-6" />
					<DealsCard title="Lost Deals" color="secondary" model="lost" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<Schedules title="Schedules" />
				</Column>
			</Row>
			
			<Row>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<LeaderboardCrm title="Leaderboard" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<Campaigns title="Campaigns" />
				</Column>
			</Row>
		</Preloader>
  );
}