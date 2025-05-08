import React from "react";
import { Plus } from "react-bootstrap-icons";
// components
import { Preloader, Row, Column, Card, Button, InputLabel, Textarea, InputGroup, Input, Uploader } from "@/components/reactdash-ui";

export default function CreateProject() {
  return (
    <Preloader>
      {/* page title  */}
      <Row>
        <Column className="w-full md:w-1/2 px-4">   
          <p className="text-xl font-bold mt-3 mb-5">Create Project</p>
        </Column>
      </Row>

      {/* content  */}
      <Row>
        <Column className="w-full px-4">
          <Card className="relative p-6">
            <form>
              <InputLabel name="title" id="protitle" label="Poject Title"/>
              <Textarea name="title" id="prodescription" label="Poject Description"/>
              <Row className="sm:-mx-4">
                <Column className="w-full sm:w-1/2 sm:px-4">
                  <Uploader />
                </Column>
                <Column className="w-full sm:w-1/2 sm:px-4">
                  <InputLabel type="date" name="dates" id="prodat" label="Due Date"/>
                </Column>
              </Row>
              <Row className="sm:-mx-4">
                <Column className="w-full sm:w-1/2 sm:px-4">
                  <InputGroup id="probuds" label="Poject Budget">
                    <InputGroup.Prefix>$</InputGroup.Prefix>
                    <InputGroup.Body>
                      <Input name="budget" id="probud" className="rounded-l-none"/>
                    </InputGroup.Body>
                  </InputGroup>
                </Column>
                <Column className="w-full sm:w-1/2 sm:px-4">
                  <InputLabel name="task" id="protask" label="Poject Tasks"/>
                </Column>
              </Row>
              <InputLabel name="tagss" id="protag" label="Poject Tags"/>
              <InputLabel name="team" id="proteam" label="Poject Team"/>
              <Button type="submit">
                <Plus className="mr-1 inline" />Add New Project
              </Button>
            </form>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}