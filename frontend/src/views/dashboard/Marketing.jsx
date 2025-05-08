import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Tiktok, Google } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// content
import RevenuePlatform from "@/components/charts/marketing/RevenuePlatform";
import Performance from "@/components/charts/marketing/Performance";
// widget
import { SmallboxMarketing, EmailStatistic, AdsPlatform, SalesFunnel  } from "@/components/widgets";

export default function Marketing() {
	// data smallbox
	const data_smallbox1 = {name: "Total Spend", count: 9450, target: 15000, type: 'currency'}
	const data_smallbox2 = {name: "Cost per Acquisitions", count: 164, target: 290, type: 'currency'}
	const data_smallbox3 = {name: "Acquisitions", count: 56, target: 76, type: 'number'}
	const data_smallbox4 = {name: "Total Revenue", count: 16200, target: 18100, type: 'currency'}
  // data ads platform
	const icon_facebook = <Facebook className="inline-block text-blue-500 w-8 h-8 mr-4" /> ;
	const icon_google = <Google className="inline-block text-blue-400 w-8 h-8 mr-4" /> ;
	const icon_youtube = <Youtube className="inline-block text-red-500 w-8 h-8 mr-4" /> ;
	const icon_twitter = <Twitter className="inline-block text-blue-400 w-8 h-8 mr-4" /> ;
	const icon_instagram = <Instagram className="inline-block text-purple-500 w-8 h-8 mr-4" /> ;
	const icon_tiktok = <Tiktok className="inline-block text-black w-8 h-8 mr-4" /> ;
  
  return (
		<Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">Digital Marketing</p>
				</Column>
			</Row>

			{/* content  */}
			<Row>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
					<SmallboxMarketing title="Total Spend" data={data_smallbox1} />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SmallboxMarketing title="Cost per Acquisitions" data={data_smallbox2} color="warning" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SmallboxMarketing title="Acquisitions" data={data_smallbox3} color="danger" />
				</Column>
				<Column className="px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
				  <SmallboxMarketing title="Total Revenue" data={data_smallbox4} color="success" />
				</Column>
			</Row>
			
			<Row>
				<Column className="px-4 w-full lg:w-3/4 mb-6">
				  <RevenuePlatform title="Revenue by Platform" />
				</Column>
				<Column className="px-4 w-full lg:w-1/4 mb-6">
					<EmailStatistic title="Email"/>
				</Column>
			</Row>
			
			<Row>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
					<AdsPlatform title="Facebook Ads" icon={icon_facebook} />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <AdsPlatform title="Google Ads" icon={icon_google}  />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <AdsPlatform title="Youtube Ads" icon={icon_youtube}  />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <AdsPlatform title="Twitter Ads" icon={icon_twitter}  />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <AdsPlatform title="Instagram Ads" icon={icon_instagram}  />
				</Column>
				<Column className="px-4 w-full lg:w-1/2 mb-6">
				  <AdsPlatform title="Tiktok Ads" icon={icon_tiktok}  />
				</Column>
				<Column className="px-4 w-full lg:w-2/3 mb-6">
					<Performance title="Sales Performance" />
				</Column>
				<Column className="px-4 w-full lg:w-1/3 mb-6">
					<SalesFunnel title="Sales Funnel" />
				</Column>
			</Row>
		</Preloader>
  );
}