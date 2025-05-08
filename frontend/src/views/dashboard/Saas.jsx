import React from "react";
// components
import { Preloader, Row, Column, Card, Maps } from "@/components/reactdash-ui";
// content
import { Mmr, PaidCustomers, ChurnRate, Movements, ArrGrowth, TotalCustomers, PayingCustomers, VisitorsSignup } from "@/components/charts/saas";
// widget
import { AdsStatistic } from "@/components/widgets";

export default function Saas() {
  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Saas</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/3 mb-6">
					<Mmr title="MMR" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/3 mb-6">
					<PaidCustomers title="Paid Customers" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/3 mb-6">
					<ChurnRate title="Churn Rate" />
				</Column>
				<Column className="px-4 w-full lg:w-2/3 mb-6">
					<Movements title="MMR Movements" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
				  <AdsStatistic />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <VisitorsSignup title="Visitor and SignUp" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <PayingCustomers title="Free and Paying Customers" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<TotalCustomers title="Total Customers" />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <Card>
						<div className="flex flex-col pb-6">
							<h3 className="text-base font-bold">Maps</h3>
						</div>
						<Maps title="Maps" />
					</Card>
				</Column>
				<Column className="px-4 w-full mb-6">
					<ArrGrowth title="ARR Growth" />
				</Column>
			</Row>
		</Preloader>
  );
}