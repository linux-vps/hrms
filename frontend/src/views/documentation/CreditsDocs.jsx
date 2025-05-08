import React from 'react';
// components
import { Preloader, Row, Column, Card } from "@/components/reactdash-ui";

export default function CreditsDocs() {

  return (
    <Preloader>
			<Row>
				<Column className="w-full px-4 mt-6">
          <Card className="relative p-6">
            <h1 className="text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-300">Credits</h1>
            <p className="text-lg mb-6 font-light">First, let us take this opportunity to thank all the creative minds for their great products and plugins.</p>
            <p className="text-lg mb-4 font-bold">All Vendors</p>

            <table className="table-default mb-12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Url</th>
                  <th>License</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td><b>React & React Dom</b></td>
                  <td><a target="_blank" href="https://github.com/facebook/react/">https://github.com/facebook/react/</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Tailwindcss</b></td>
                  <td><a target="_blank" href="https://github.com/tailwindlabs/tailwindcss">https://github.com/tailwindlabs/tailwindcss</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>React Router</b></td>
                  <td><a target="_blank" href="https://github.com/remix-run/react-router">https://github.com/remix-run/react-router</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>React Bootstrap Icon</b></td>
                  <td><a target="_blank" href="https://github.com/ismamz/react-bootstrap-icons">https://github.com/ismamz/react-bootstrap-icons</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>React Chart Js</b></td>
                  <td><a target="_blank" href="https://github.com/reactchartjs/react-chartjs-2">https://github.com/reactchartjs/react-chartjs-2</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Chart Js</b></td>
                  <td><a target="_blank" href="https://www.chartjs.org/">https://www.chartjs.org/</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Splide Js</b></td>
                  <td><a target="_blank" href="https://github.com/Splidejs/react-splide">https://github.com/Splidejs/react-splide</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Headless UI</b></td>
                  <td><a target="_blank" href="https://github.com/tailwindlabs/headlessui">https://github.com/tailwindlabs/headlessui</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Prism React</b></td>
                  <td><a target="_blank" href="https://github.com/FormidableLabs/prism-react-renderer">https://github.com/FormidableLabs/prism-react-renderer</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>React Timeago</b></td>
                  <td><a target="_blank" href="https://github.com/nmn/react-timeago">https://github.com/nmn/react-timeago</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Sweetalert2 React</b></td>
                  <td><a target="_blank" href="https://sweetalert2.github.io/recipe-gallery/sweetalert2-react.html">https://sweetalert2.github.io/recipe-gallery/sweetalert2-react.html</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>Vite</b></td>
                  <td><a target="_blank" href="https://vitejs.dev/">https://vitejs.dev/</a></td>
                  <td>MIT</td>
                </tr>
                <tr>
                  <td><b>React Vector Map</b></td>
                  <td><a target="_blank" href="https://github.com/South-Paw/react-vector-maps">https://github.com/South-Paw/react-vector-maps</a></td>
                  <td>MIT</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Column>
      </Row>
    </Preloader>
  );
}