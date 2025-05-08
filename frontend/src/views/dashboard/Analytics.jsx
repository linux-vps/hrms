import React from "react";
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// widget
import { PopularPages } from "@/components/widgets";
import UserOnline from "@/components/tables/UserOnline";
// content
import { SessionTabs, SessionChart, DeviceChart, BrowserChart, ActiveUser, TrafficTabs } from "@/components/charts/analytics/Index";

export default function Analytics() {
  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Analytics</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full lg:w-2/3 px-4 mb-6">
					<SessionTabs />
				</Column>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<UserOnline />
				</Column>
				<Column className="w-full px-4 mb-6">
					<SessionChart title="Sessions by Country" />
				</Column>
				<Column className="w-full lg:w-1/3 px-4 mb-6">
					<DeviceChart title="Sessions by Device" />
				</Column>
				<Column className="w-full sm:w-1/3 px-4 mb-6">
					<BrowserChart title="Sessions by Browser" />
				</Column>
				<Column className="w-full sm:w-1/3 px-4 mb-6">
					<PopularPages title="Popular Pages" />
				</Column>
				<Column className="w-full md:w-1/2 px-4 mb-6">
					<TrafficTabs />
				</Column>
				<Column className="w-full md:w-1/2 px-4 mb-6">
					<ActiveUser title="Active User" />
				</Column>
			</Row>
		</Preloader>
  );
}