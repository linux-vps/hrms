import React from "react";
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";
import Ecommerce_customers from "@/components/tables/Customers";

export default function Customers() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Customers</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <Ecommerce_customers />
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}