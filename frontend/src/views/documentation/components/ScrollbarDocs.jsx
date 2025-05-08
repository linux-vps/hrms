import React from 'react';
// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function ScrollbarDocs() {
  // page title
  const page_title = "Scrollbar";

  // prism code
  const datacode1 = `
import React from 'react'

export default function Scrollbars() {
    return (
      <>
      {/* scrollbars */}
      <div className="h-36 overflow-y-auto scrollbars show mb-6">
        your content in here
      </div>
      
      {/* hover scrollbars */}
      <div className="h-36 overflow-y-auto scrollbars mb-6">
        your content in here
      </div>
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
            <p className="text-lg mb-6 font-light">A scrollbar is an interaction technique or widget in which continuous text, pictures, or any other content can be scrolled in a predetermined direction.</p>
            
            <p className="mb-2 font-bold">Custom Scrollbar</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <div className="h-36 overflow-y-auto scrollbars show mb-6">
                <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.</p>
                <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum</p>
              </div>
            </Card>
            <p className="mb-2 font-bold">Hover Scrollbar</p>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none mb-6">
              <div className="h-36 overflow-y-auto scrollbars mb-6">
                <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.” The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.</p>
                <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum</p>
              </div>
            </Card>
            <p className="mb-6">Just add <code className="text-pink-500">scrollbars show</code> or <code className="text-pink-500">scrollbars</code> in <code className="text-pink-500">overflow-y-auto</code> classes.</p>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}