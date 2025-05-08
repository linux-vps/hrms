import React from "react";
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function Starter() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Starter</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6 mb-6">
            <div className="py-8 text-center">
              <p>Insert your content</p>
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}