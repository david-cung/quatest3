import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const pdfFilePath = '/profile.pdf';

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full flex flex-col items-center mt-24">
      <div>
        <p>Profile</p>
      </div>
      <div className="border border-gray-300 rounded shadow-md w-full max-w-3xl h-screen overflow-y-auto">
        <Document
          file={pdfFilePath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} className="w-full my-2" />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PdfViewer;
