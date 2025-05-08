import React from "react";
import { PlusLg } from 'react-bootstrap-icons';
// components
import { Preloader, Row, Column, Card, Button, AvatarGroup } from "@/components/reactdash-ui";
import KanbanBoard from "@/components/reactdash-ui/KanbanBoard";

export default function Kanban() {
  const kanban_text = {
    add: "Add new task", urgent: "Urgency", low: "Low", medium: "Medium", high: "High",
    backlog: "Backlog", list: "List", doing: "Doing", done: "Done", more: "More", due: "Due"
  }

  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">
          <p className="text-xl font-bold mt-3 mb-5">Kanban</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <div className="flex flex-col justify-center md:flex-row md:justify-between mb-3">
              <div>
                <Button>
                  <PlusLg className="inline-block ltr:ml-1 rtl:mr-1" /> {kanban_text.add}
                </Button>
              </div>

              <div className="p-3">
                <div className="inline-block ltr:mr-2 rtl:ml-2">
                  {kanban_text.urgent}:
                </div>
                <div className="inline-block ltr:mr-2 rtl:ml-2">
                  <span className="inline-block w-3 h-3 mr-1 rounded-full bg-green-200"></span> {kanban_text.low}
                </div>
                <div className="inline-block ltr:mr-2 rtl:ml-2">
                  <span className="inline-block w-3 h-3 mr-1 rounded-full bg-yellow-200"></span> {kanban_text.medium}
                </div>
                <div className="inline-block ltr:mr-2 rtl:ml-2">
                  <span className="inline-block w-3 h-3 mr-1 rounded-full bg-pink-200"></span> {kanban_text.high}
                </div>
              </div>
            </div>
            <KanbanBoard />
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}