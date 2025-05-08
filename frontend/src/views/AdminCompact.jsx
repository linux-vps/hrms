import React from "react";

// import layout admin
import AdminCompact from "@/components/layouts/AdminCompact";
// components
import { Preloader, Row, Column, Card, Maps } from "@/components/reactdash-ui";
// content
import { TotalView, TotalShare, TotalComment, TotalLike, VisitorChart, StatusChart, SeoChart } from '@/components/charts/cms';
// widget
import { Tags, NewFollower, CmsStatistic } from '@/components/widgets';
// table
import CmsTable from '@/components/tables/CmsTable';

export default function Admin() {
  return (
    <AdminCompact>
      <Preloader>
        {/* page title  */}
        <Row>
          <Column className="w-full md:w-1/2 px-4">   
            <p className="text-xl font-bold mt-3 mb-5">Compact Layout</p>
          </Column>
        </Row>

        {/* content  */}
        <Row>
          <Column className="w-full order-2 md:order-1 xl:w-2/3">
            <Row>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <TotalView title="Total Views" />
              </Column>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <TotalLike title="Total Likes" />
              </Column>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <TotalComment title="Total Comments" />
              </Column>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <TotalShare title="Total Share" />
              </Column>
              <Column className="w-full px-4 mb-6">
                <VisitorChart title="Visitor traffic" />
              </Column>
              <Column className="w-full lg:w-1/2 px-4 mb-6">
                <Tags title="Most search" />
              </Column>
              <Column className="w-full lg:w-1/2 px-4 mb-6">
                <Card>
                  <div className="flex flex-col pb-6">
                    <h3 className="text-base font-bold">Maps</h3>
                  </div>
                  <Maps title="Maps" />
                </Card>
              </Column>
              <Column className="w-full lg:w-1/2 px-4 mb-6">
                <NewFollower title="New Followers"/>
              </Column>
              <Column className="w-full lg:w-1/2 px-4 mb-6">
                <CmsStatistic title="Statistics" />
              </Column>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <StatusChart title="Status" />
              </Column>
              <Column className="w-full sm:w-1/2 px-4 mb-6">
                <SeoChart title="Seo score" />
              </Column>
            </Row>
          </Column>

          <Column className="w-full px-4 order-1 md:order-2 xl:w-1/3 mb-6">
            <CmsTable />
          </Column>
        </Row>
      </Preloader>
    </AdminCompact>
  );
}
