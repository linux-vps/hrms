import React from "react";
import { Facebook } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column } from "@/components/reactdash-ui";
// widgets
import { AdsPlatform, AdsStatistic, Banner, CmsStatistic, DealsCard, EmailStatistic, 
  History, HostingBanner, HostingCard, LaunchDate, MonthlyRevenue, NewFollower, 
  PlatformAds, PopularPages, ProfileCard, ProfileInfo, ProjectActifity, ProjectCard, 
   ProjectStatistic, RecentActifities, RecentTask, SalesFunnel, 
  SalesSmallBox, Schedules, SmallBox, SmallBoxHosting, SmallboxMarketing, SmallCard, Tags } from "@/components/widgets";


export default function Widgets() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Widgets</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <ProfileCard />
        </Column>
        <Column className="w-full lg:w-1/2 px-4 mb-6">
          <AdsPlatform title="Facebook Ads" icon={<Facebook className="w-8 h-8 inline mr-3 text-facebook" />} />
        </Column>
        <Column className="w-full lg:w-1/2 px-4 mb-6">
          <HostingBanner />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <AdsStatistic />
        </Column>
        
        <Column className="w-full lg:w-1/3 px-4">
          <DealsCard title="Deals" />
          <Banner />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <CmsStatistic title="Statistics" />
        </Column>
        
        <Column className="w-full lg:w-1/2 px-4 mb-6">
          <ProjectCard />
        </Column>
        <Column className="w-full lg:w-1/2 px-4 mb-6">
          <PlatformAds />
        </Column>

        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <EmailStatistic title="Email" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <History title="History" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <LaunchDate title="Project Launch Date" />
        </Column>

        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <HostingCard title="My Wallet" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <MonthlyRevenue title="Monthly Revenue" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <NewFollower title="New follower" />
        </Column>
        
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <PopularPages title="Popular pages" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <ProfileInfo title="Informations" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <ProjectActifity title="Project actifity" />
        </Column>
        
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <ProjectStatistic title="Project statistics" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <RecentActifities title="Latest Actifities" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <RecentTask title="Recent task" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <SalesFunnel title="Sales Funnel" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <SalesSmallBox title="Sales" model="currency" />
          <div className="mt-4">
            <Tags title="Tags" />
          </div>
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <Schedules title="Schedules" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <SmallBox title="Total Order" color="secondary" />
          <div className="mt-4">
            <SmallBoxHosting title="Services" />
          </div>
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
            <SmallCard title="New Lead" />
        </Column>
        <Column className="w-full lg:w-1/3 px-4 mb-6">
          <SmallboxMarketing title="Total revenue" />
        </Column>
      </Row>
    </Preloader>
  );
}