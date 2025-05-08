import React from 'react';
import { Blockquote, Display, Dropcap, Figure, Heading, Lead, Paragraph, Lists } from "@/components/reactdash-ui";

// components
import { Preloader, Row, Column, Card, Prism } from "@/components/reactdash-ui";

export default function TypographyDocs() {
  // page title
  const page_title = "Typography & Content";
  const data_figure = {img: "/img/products/product_6.jpg", title: "Shoes", description: "Walking time"}
  // prism code
  const datacode1 = `
import React from 'react'
import { Heading } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
      <Heading variant="h1">H1</Heading>
      <Heading variant="h2">H2</Heading>
      <Heading variant="h3">H3</Heading>
      <Heading variant="h4">H4</Heading>
      <Heading variant="h5">H5</Heading>
      <Heading variant="h6">H6</Heading>
      
      {/* with className */}
      <h1 className="heading-1">H1</h1>
      <h1 className="heading-2">H2</h1>
      <h1 className="heading-3">H3</h1>
      <h1 className="heading-4">H4</h1>
      <h1 className="heading-5">H5</h1>
      <h1 className="heading-6">H6</h1>
      </>
    )
}
  `;
  // prism code
  const datacode2 = `
import React from 'react'
import { Display } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
      <Display size="1">Display 1</Display>
      <Display size="2">Display 2</Display>
      <Display size="3">Display 3</Display>
      <Display size="4">Display 4</Display>
      </>
    )
}
  `;
  // prism code
  const datacode3 = `
import React from 'react'
import { Lead } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
       <Lead>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor</Lead>
      </>
    )
}
  `;
  // prism code
  const datacode4 = `
import React from 'react'
import { Paragraph } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
      <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</Paragraph>
      </>
    )
}
  `;
  // prism code
  const datacode5 = `
import React from 'react'
import { Paragraph, Dropcap } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
        <Paragraph><Dropcap>V</Dropcap>ivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</Paragraph>
      </>
    )
}
  `;
  // prism code
  const datacode6 = `
import React from 'react'
import { Blockquote } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
      <Blockquote title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante." author="James Lim" />
      </>
    )
}
  `;
  // prism code
  const datacode7 = `
import React from 'react'
import { Lists } from "@/components/reactdash-ui";

export default function TypoExp() {
    return (
      <>
        <Lists variant="ul">
          <li>Apple</li>
          <li>Mango
            <Lists variant="ol">
              <li>Apple</li>
              <li>Mango</li>
              <li>Banana</li>
              <li>Strauberry</li>
            </Lists>
          </li>
          <li>Banana</li>
          <li>Strauberry</li>
        </Lists>
      </>
    )
}
  `;
  // prism code
  const datacode8 = `
import React from 'react'
import { Figure, Paragraph } from "@/components/reactdash-ui";

export default function TypoExp() {
    const data_figure = {img: "/img/products/product_6.jpg", title: "Shoes", description: "Walking time"}
    
    return (
      <>
      <Figure img={data_figure.img} alt={data_figure.title} description={data_figure.description} align="left" />
      
      <Paragraph><Dropcap>V</Dropcap>ivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
        faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
      </Paragraph>
      <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
        faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
      </Paragraph>
      <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
        faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
      </Paragraph>
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
            <p className="text-lg mb-6 font-light">Documentation and examples for Space typography, including global settings, headings, body text, lists, and more.</p>
            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Heading</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Heading variant="h1">H1</Heading>
              <Heading variant="h2">H2</Heading>
              <Heading variant="h3">H3</Heading>
              <Heading variant="h4">H4</Heading>
              <Heading variant="h5">H5</Heading>
              <Heading variant="h6">H6</Heading>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode1} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Display</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Display size="1">Display 1</Display>
              <Display size="2">Display 2</Display>
              <Display size="3">Display 3</Display>
              <Display size="4">Display 4</Display>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode2} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Lead</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Lead>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Lead>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode3} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Paragraph</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
              <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode4} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Dropcap</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Paragraph><Dropcap>V</Dropcap>ivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
                faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode5} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Blockquote</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Blockquote title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante." author="James Lim" />
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode6} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Lists Bullet & Number</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Lists variant="ul">
                <li>Apple</li>
                <li>Mango
                  <Lists variant="ol">
                    <li>Apple</li>
                    <li>Mango</li>
                    <li>Banana</li>
                    <li>Strauberry</li>
                  </Lists>
                </li>
                <li>Banana</li>
                <li>Strauberry</li>
              </Lists>
            </Card>
            <div className="mt-5 mb-12">
              <Prism data={datacode7} />
            </div>

            <h2 className="text-lg mb-4 font-semibold text-gray-800 dark:text-gray-300">Figure</h2>
            <Card className="relative p-6 border border-gray-200 dark:border-gray-700 shadow-none">
              <Figure img={data_figure.img} alt={data_figure.title} description={data_figure.description} align="left" />
              <Paragraph><Dropcap>V</Dropcap>ivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
                faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
              <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
                faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
              <Paragraph>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Vivamus sagittis lacus vel augue laoreet rutrum 
                faucibus dolor auctor. Duis mollis, est non commodo luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </Paragraph>
            </Card>
            <div className="mt-5 mb-12">
            <Prism data={datacode8} />
            </div>

          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}