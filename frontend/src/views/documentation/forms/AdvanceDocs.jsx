import React, { useState } from 'react';
import { Uploader } from "@/components/reactdash-ui";
import { QuillEditor } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function AdvanceDocs() {
  // dropzone
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleFileUpload = (acceptedFiles) => {
    // add action in here
    console.log('File(s) uploaded:', acceptedFiles);
    // save preview
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };
  // text editor
  const [text, setText] = useState('');
  const handleChange = (value) => {
    setText(value);
  }


  // page title
  const page_title = "Advance";

  // prism code
  const datacode1 = `
import React,  { useState } from 'react'
import { Uploader } from "@/components/reactdash-ui";

export default function InputExp() {
  // dropzone
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleFileUpload = (acceptedFiles) => {
    // add action in here
    console.log('File(s) uploaded:', acceptedFiles);
    // save preview
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };
    return (
      <>
        {/* drag drop upload */}
        <Uploader onDropzone={handleFileUpload} textUpload="Multiple upload" />
        <Uploader onDropzone={handleFileUpload} textUpload="Single Upload" variant="single" />
      </>
    )
}
  `;

  const datacode3 = `
import React, { useState } from 'react';
import { QuillEditor } from "@/components/reactdash-ui";

export default function Example() {
  const [text, setText] = useState('');
  const handleChange = (value) => {
    setText(value);
  }

  return (
    <>
      <QuillEditor value={text} onChange={handleChange} />
    </>
  );
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
            <p className="text-lg mb-6 font-light">Advance input fields.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Uploader</h2>
            {/* Advance */}
            <div className="flex flex-col w-full gap-4 mb-6">
              <Uploader onDropzone={handleFileUpload} textUpload="Multiple upload" />
              <Uploader onDropzone={handleFileUpload} textUpload="Single Upload" variant="single" />
            </div>

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
                  <td><b>id</b></td>
                  <td>id for dropzone</td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                </tr>
              </tbody>
            </table>


            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Example Text Editor</h2>
            {/* Advance */}
            <div className="flex flex-col w-full gap-4 mb-6">
              <QuillEditor value={text} onChange={handleChange} />
            </div>

            <div className="mt-5 mb-12">
              <Prism data={datacode3} />
            </div>

            <table className="table-default mb-12">
              <thead><tr><th>Prop</th><th>Description</th><th>Type</th><th>Default</th></tr></thead>
              <tbody>
                <tr><td><b>value</b></td><td>Value texteditor</td><td>function</td><td><code>-</code></td></tr>
                <tr><td><b>onChange</b></td><td>Onchange text input</td><td>function</td><td><code>-</code></td></tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}