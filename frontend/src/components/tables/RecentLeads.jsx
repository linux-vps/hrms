import React from 'react';
import { Telephone, CameraVideo, Envelope, CalendarWeek } from 'react-bootstrap-icons';
import { Row, Card } from '@/components/reactdash-ui';

export default function RencentLeads(props) {
  // data table
  const table_title = { name: "Client", call: "Call", email: "Email", meeting: "Meeting", schedule: "Schedule" }
  const dataLeads = [
    {name: "John Thomas", company: "One Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Carlos Garcia", company: "Two Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Daniel Esteban", company: "Three Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Steven Rey", company: "Four Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Roman Davis", company: "Five Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Pedro", company: "Six Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Sanchez", company: "Seven Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Diandra Soxa", company: "Eight Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Bazola Miu", company: "Nine Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"},
    {name: "Benjamin", company: "Teen Company", email: "email@domainname.com", phone: "+123456789", wa: "+123456789"}
  ]
  const schedule_link = "/";

  return (
    <Card className="h-full">
      <Row className="justify-between pb-3">
        <div className="flex flex-col">
          <h3 className="text-base font-bold">{props.title}</h3>
        </div>
      </Row>
      <div className="relative">
        <div className="h-60 overflow-auto scrollbars show">
          <table className="table-bordered-bottom table-sm w-full ltr:text-left rtl:text-right text-sm">
            <thead>
              <tr>
                <th>{table_title.name}</th>
                <th>{table_title.call}</th>
                <th>{table_title.email}</th>
                <th>{table_title.meeting}</th>
                <th>{table_title.schedule}</th>
              </tr>
            </thead>
            <tbody>
              {dataLeads.map( (lead, index) =>
              <tr key={index}>
                <td>
                  <div className="flex flex-wrap flex-row items-center">
                    <div className="font-bold text-gray-900 dark:text-gray-300 flex-shrink max-w-full w-full mb-1">
                      {lead.name}
                    </div>
                    <div className="italic text-gray-500 flex-shrink max-w-full w-full">
                      {lead.company}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <a href={`tel:${lead.phone}`} className="hover:text-indigo-700" title="call">
                      <Telephone className="mx-auto" />
                    </a>
                  </div>
                </td>
                <td>
                  <div>
                    <a href={`mailto:${lead.email}`} className="hover:text-indigo-700" title="send email">
                      <Envelope className="mx-auto" />
                    </a>
                  </div>
                </td>
                <td>
                  <div>
                    <a href={`https://wa.me/${lead.wa}`} className="hover:text-indigo-700" title="Meeting with Whatsapp">
                      <CameraVideo className="mx-auto" />
                    </a>
                  </div>
                </td>
                <td>
                  <div>
                    <a href={schedule_link} className="hover:text-indigo-700" title="Create Scedule">
                      <CalendarWeek className="mx-auto" />
                    </a>
                  </div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}