import React from "react";
import { HddStack, Globe2, Receipt, LifePreserver} from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Button } from "@/components/reactdash-ui";
// content
import StorangeChart from "@/components/charts/hosting/StorageChart";
// widget
import { HostingBanner, SmallBoxHosting, History, HostingCard } from "@/components/widgets";
// table
import HostingSubcription from "@/components/tables/HostingSubcription";

export default function Hosting() {
	// data smallbox
	const data_smallbox1 = {title: "Services", count: 23, icon: <HddStack className="w-8 h-8" /> }
	const data_smallbox2 = {title: "Domain", count: 143, icon: <Globe2 className="w-8 h-8" /> }
	const data_smallbox3 = {title: "Ticket", count: 16, icon: <LifePreserver className="w-8 h-8" /> }
	const data_smallbox4 = {title: "Invoice", count: 12, icon: <Receipt className="w-8 h-8" /> }
  // data wallet
	const data_wallet = {text:"Total credit", count: 260}
	const data_spend = {text:"All subscription fee", count: 560}
  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Hosting</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<HostingBanner />
				</Column>
				<Column className="px-4 w-full lg:w-1/2">
					<Row className="-mx-4">
						<Column className="px-4 w-1/2 mb-6">
              <SmallBoxHosting title="Services" data={data_smallbox1} />
						</Column>
						<Column className="px-4 w-1/2 mb-6">
						  <SmallBoxHosting title="Domain" color="success" data={data_smallbox2} />
						</Column>
						<Column className="px-4 w-1/2 mb-6">
						  <SmallBoxHosting title="Ticket" color="secondary" data={data_smallbox3} />
						</Column>
						<Column className="px-4 w-1/2 mb-6">
						  <SmallBoxHosting title="Invoice" color="warning" data={data_smallbox4} />
						</Column>
					</Row>
				</Column>
			</Row>
			<Row>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<StorangeChart title="Storage" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
				  <HostingCard title="My Wallet" data={data_wallet} />
					<a href="/">
						<Button className="mb-6 block w-full">Top Up</Button>
					</a>
					<HostingCard title="My Yearly Spend" data={data_spend} color="secondary" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<History title="Latest Activity" />
				</Column>
			</Row>
			
			<Row>
				<Column className="px-4 w-full mb-6">
					<HostingSubcription title="Subcription Services" />
				</Column>
			</Row>
		</Preloader>
  );
}