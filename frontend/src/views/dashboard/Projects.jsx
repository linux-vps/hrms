import React from "react";
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// content
import ProductivityChart from "@/components/charts/project/ProductivityChart";
import TeamProgress from "@/components/charts/project/TeamProgress";
import BudgetsChart from "@/components/charts/project/BudgetsChart";
// widget
import { ProjectStatistic, LaunchDate, RecentTask, RecentActifities } from "@/components/widgets";
// table
import Leaderboard from "@/components/tables/Leaderboard";
import LatestProject from "@/components/tables/LatestProject";

export default function Projects() {
	return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">
					<p className="text-xl font-bold mt-3 mb-5">Projects</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<LaunchDate title="Project Launch Date" date="11/11/2024" />
				</Column>
				<Column className="w-full lg:w-2/3 px-4 mb-6">
					<ProductivityChart title="Your Productivity" />
				</Column>
			</Row>

			<Row>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<RecentTask title="Recent Tasks" />
				</Column>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<TeamProgress title="Team Progress" />
				</Column>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<RecentActifities title="Recent Actifities" />
				</Column>
			</Row>

			<Row>
				<Column className="w-full lg:w-1/2 px-4 mb-6">
					<Leaderboard title="Leaderboard" />
				</Column>
				<Column className="w-full lg:w-1/2 px-4 mb-6">
					<LatestProject title="Latest Project" />
				</Column>
				<Column className="w-full lg:w-1/2 px-4 mb-6">
					<BudgetsChart title="Budgets" />
				</Column>
				<Column className="w-full lg:w-1/2 px-4 mb-6">
					<ProjectStatistic title="Project Statistic" />
				</Column>
			</Row>
		</Preloader>
	);
}