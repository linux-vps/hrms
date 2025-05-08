import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism, Modal, Button } from "@/components/reactdash-ui";

export default function ModalDocs() {
  // page title
  const page_title = "Modal";

  // prism code
  const datacode1 = `
import React from 'react';
import { Modal, Button } from "@/components/reactdash-ui";

export default function Modals() {
    return (
      <>
      {/* modal */}
      <Modal btn_text="Open Modal" btn_color="warning" title="Title of the modals">
        <p className="text-gray-500 mb-4">Woohoo, you're reading this text in a modal!. Add dialogs to your site for lightboxes, user notifications, or completely custom content.</p>
        <Button color="warning">Action button</Button>
      </Modal>
      </>
    )
}
  `;

  return (
    <Preloader>
			{/* page title  */}
			<Row>
				<Column className="w-full md:w-1/2 px-4">   
					<p className="text-xl font-bold mt-3 mb-5">{page_title}</p>
				</Column>
			</Row>

			{/* content */}
			<Row>
				<Column className="w-full px-4">
          <Card className="relative p-6">
            <p className="text-lg mb-6 font-light">Add dialogs to your site for lightboxes, user notifications, or completely custom content.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Modal</h2>
              
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none flex justify-center">
              <Modal btn_text="Open Modal" btn_color="warning" title="Title of the modals">
                <p className="text-gray-500 mb-4">Woohoo, you're reading this text in a modal!. Add dialogs to your site for lightboxes, user notifications, or completely custom content.</p>
                <Button color="warning">Action button</Button>
              </Modal>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>btn_text</b></td>
                  <td>Button text/ Trigger</td>
                  <td>Example 'Launch modal'</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>btn_color</b></td>
                  <td>Button color</td>
                  <td><code>All button color like 'primary', 'success' and etc</code></td>
                  <td><code>'primary'</code></td>
                </tr>
                <tr>
                  <td><b>title</b></td>
                  <td>Modal Title</td>
                  <td>Custom modal title</td>
                  <td><code>-</code></td>
                </tr>
                <tr>
                  <td><b>children</b></td>
                  <td>Custom content children</td>
                  <td><code>text, html, img, icon and etc</code></td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}