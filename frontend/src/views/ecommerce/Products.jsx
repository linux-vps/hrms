import React from "react";
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";
import EcommerceProducts from "@/components/tables/Products";

export default function Products() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Manage Products</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative mb-6">
            <Row className="-mx-4">
              <Column className="w-full px-4">
                <EcommerceProducts />
              </Column>
            </Row>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}