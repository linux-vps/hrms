import React from "react";
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";
// content
import ProductivityChart from "@/components/charts/project/ProductivityChart";
// widget
import { ProfileCard, ProfileInfo, ProjectsCard } from "@/components/widgets";

export default function Profile() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Profile</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <ProfileCard />
        </Column>
      </Row>
      <Row className="mb-6">
        <Column className="w-full md:w-1/3 px-4">
          <ProfileInfo title="Information" />
        </Column>
        <Column className="w-full md:w-2/3 px-4">
          <ProductivityChart title="Your Productivity" />
        </Column>
      </Row>
      <Row>
        <Column className="w-full px-4">
          <ProjectsCard />
        </Column>
      </Row>
    </Preloader>
  );
}