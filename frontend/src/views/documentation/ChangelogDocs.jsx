import React from 'react';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function ChangelogsDocs() {

  return (
    <Preloader>
      <Row>
        <Column className="w-full px-4 mt-6">
          <Card className="relative p-6">
            <h1 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-300">Changelogs</h1>
            <p className="text-lg mb-6 font-light">See what's new added, changed, fixed, improved or updated in the latest Reactdash versions.</p>
            <h4 className="text-xl mb-2"><b>Version 1.5.0</b> - June 19, 2024</h4>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Fix bugs ecommerce directory</pre>
            <pre className="text-sm py-1">Update All vendors version</pre>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Update vite build system</pre>
             <br></br>
            <h4 className="text-xl mb-2"><b>Version 1.2.0</b> - November 2023</h4>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Move components file to 'reactdash-ui'</pre>
            <pre className="text-sm py-1">Update Prism js</pre>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Update dropzone plugin</pre>
            <pre className="text-sm py-1">Add Quill Editor</pre>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Move layouts to 'components/layouts/</pre>
            <pre className="text-sm py-1">Add Kanban Board</pre>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Add Lightbox Gallery</pre>


            <h4 className="text-xl mt-6 mb-2"><b>Version 1.1.0</b> - August 2023</h4>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Fix bugs in documentation components</pre>
            <pre className="text-sm py-1">Fix padding card widget</pre>
            <h4 className="text-xl mt-6 mb-2"><b>Version 1.0.0</b> - January 2023</h4>
            <pre className="text-sm bg-gray-50 dark:bg-gray-900 py-1">Initial Release of Reactdash</pre>

          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}