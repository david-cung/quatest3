import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfPath from '../assets/pdf/profile.pdf';

// Cấu hình worker cho react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  
  // Đường dẫn đến file PDF trong thư mục public
  // const pdfPath = '../assets/pdf/profile.pdf'; // Giả sử tên file là profile.pdf

  useEffect(() => {
    // Sử dụng file PDF từ thư mục public khi component được mount
    setPdfFile(pdfPath);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex flex-col h-full mt-32">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        
        {numPages && (
          <div className="flex items-center space-x-4">
            <button
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Trang trước
            </button>
            <p className="text-gray-700">
              Trang {pageNumber} / {numPages}
            </p>
            <button
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto border rounded-lg shadow-md bg-white">
        {pdfFile ? (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
            loading="Đang tải PDF..."
            error="Không thể tải PDF. Vui lòng kiểm tra đường dẫn file."
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={1.2}
              loading="Đang tải trang..."
            />
          </Document>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-xl">Đang tải PDF...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;