import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const pdfFilePath = '/profile.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <div className="w-full flex flex-col items-center mt-24">
      {/* Tiêu đề Profile */}
      <div>
        <p className="text-2xl font-bold text-gray-800 text-center mb-4 uppercase tracking-wide">
          Profile
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="border border-gray-300 rounded shadow-md w-full max-w-3xl h-screen overflow-y-auto relative">
        <Document file={pdfFilePath} onLoadSuccess={onDocumentLoadSuccess} className="w-full">
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Page key={index} pageNumber={index + 1} scale={scale} className="w-full my-2" />
            ))}
        </Document>

        {/* Nút Zoom */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-75 px-4 py-2 rounded-full flex space-x-4">
          <button onClick={zoomOut} className="p-2 text-white hover:bg-gray-700 rounded">
            <MinusIcon className="h-6 w-6" />
          </button>
          <button onClick={zoomIn} className="p-2 text-white hover:bg-gray-700 rounded">
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
