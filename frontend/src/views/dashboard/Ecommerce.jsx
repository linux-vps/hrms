import React from "react";
import { Cart3, CreditCard, Person, People } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// widget
import { SmallBox, PlatformAds } from "@/components/widgets";
// content
import MonthlySales from "@/components/charts/ecommerce/MonthlySales";
import TrafficSource from "@/components/charts/ecommerce/TrafficSource";
import RevenueChart from "@/components/charts/ecommerce/RevenueChart";
// table
import BestSeller from "@/components/tables/BestSeller";
import LatestOrders from "@/components/tables/LatestOrders";

export default function Ecommerce() {
	// data smallbox
	const data_smallbox1 = { new: 726, old: 613, url: "/", text: "View more...", icon: <Cart3 className="w-8 h-8" /> }
	const data_smallbox2 = { new: 31126, old: 28213, url: "/", text: "View more...", icon: <CreditCard className="w-8 h-8" /> }
	const data_smallbox3 = { new: 1226, old: 1413, url: "/", text: "View more...", icon: <Person className="w-8 h-8" /> }
	const data_smallbox4 = { new: 426, old: 313, url: "/", text: "View more...", icon: <People className="w-8 h-8" /> }

  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Ecommerce</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="w-full sm:w-1/2 lg:w-1/4 mb-6 px-4">
					<SmallBox title="Total Orders" color="danger" data={data_smallbox1} />
				</Column>
				<Column className="w-full sm:w-1/2 lg:w-1/4 mb-6 px-4">
				  <SmallBox title="Total Sales" color="warning" data={data_smallbox2} />
				</Column>
				<Column className="w-full sm:w-1/2 lg:w-1/4 mb-6 px-4">
				  <SmallBox title="New Customers" color="success" data={data_smallbox3} />
				</Column>
				<Column className="w-full sm:w-1/2 lg:w-1/4 mb-6 px-4">
				  <SmallBox title="Users Online" color="primary" data={data_smallbox4} />
				</Column>
			</Row>
			
			<Row>
				<Column className="w-full lg:w-1/2 mb-6 px-4">
					<MonthlySales title="Monthly Sales" />
					<PlatformAds />
				</Column>
				<Column className="w-full lg:w-1/2 mb-6 px-4">
					<TrafficSource title="Traffic Source" />
				</Column>
			</Row>
			
			<Row>
				<Column className="w-full lg:w-2/3 mb-6 px-4">
				  <RevenueChart title="Revenue" />
				</Column>
				<Column className="w-full lg:w-1/3 mb-6 px-4">
					<BestSeller />
				</Column>
			</Row>

			<Row>
				<Column className="w-full px-4 mb-6">
					<LatestOrders title="Latest Orders" />
				</Column>
			</Row>
		</Preloader>
  );
}