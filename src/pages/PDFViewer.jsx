import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePages, setVisiblePages] = useState(new Set([1]));
  const containerRef = useRef(null);
  const pdfFilePath = '/profile.pdf';

  // Memoize PDF loading options
  const pdfOptions = useMemo(() => ({
    cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/cmaps/',
    cMapPacked: true,
    enableXfa: false, // Tắt XFA forms để tăng tốc
    disableAutoFetch: false,
    disableStream: false,
    disableFontFace: false
  }), []);

  // Optimized load success handler
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    setError(error);
    setLoading(false);
  }, []);

  // Optimized zoom functions
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current || !numPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newVisiblePages = new Set(visiblePages);
        entries.forEach((entry) => {
          const pageNumber = parseInt(entry.target.dataset.pageNumber);
          if (entry.isIntersecting) {
            newVisiblePages.add(pageNumber);
            // Preload next 2 pages
            if (pageNumber < numPages) newVisiblePages.add(pageNumber + 1);
            if (pageNumber + 1 < numPages) newVisiblePages.add(pageNumber + 2);
          } else if (!entry.isIntersecting && newVisiblePages.size > 5) {
            // Remove pages that are far from view to save memory
            const rect = entry.boundingClientRect;
            if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) {
              newVisiblePages.delete(pageNumber);
            }
          }
        });
        setVisiblePages(newVisiblePages);
      },
      {
        root: containerRef.current,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    // Observe all page containers
    const pageElements = containerRef.current.querySelectorAll('[data-page-number]');
    pageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [numPages, visiblePages]);

  // Memoized page components
  const pageComponents = useMemo(() => {
    if (!numPages) return null;

    return Array.from({ length: numPages }, (_, index) => {
      const pageNumber = index + 1;
      const isVisible = visiblePages.has(pageNumber);

      return (
        <div 
          key={pageNumber}
          data-page-number={pageNumber}
          className="w-full my-2 flex justify-center"
          style={{ minHeight: isVisible ? 'auto' : '800px' }}
        >
          {isVisible ? (
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              className="shadow-sm"
              loading={
                <div className="flex items-center justify-center h-96 bg-gray-100">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                </div>
              }
              renderTextLayer={scale > 1.2} // Chỉ render text layer khi zoom lớn
              renderAnnotationLayer={scale > 1.0} // Chỉ render annotation khi cần
            />
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 border-2 border-dashed border-gray-300 w-full max-w-2xl">
              <span className="text-gray-500">Trang {pageNumber}</span>
            </div>
          )}
        </div>
      );
    });
  }, [numPages, scale, visiblePages]);

  if (error) {
    return (
      <div className="w-full flex flex-col items-center mt-24">
        <div className="text-red-600 text-center p-4">
          <p className="text-xl font-semibold mb-2">Lỗi tải PDF</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mt-24">
      {/* Tiêu đề Profile */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800 text-center uppercase tracking-wide">
          Profile
        </p>
        {loading && (
          <div className="flex items-center justify-center mt-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mr-2"></div>
            <span className="text-gray-600">Đang tải PDF...</span>
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div className="border border-gray-300 rounded shadow-md w-full max-w-4xl h-screen overflow-y-auto relative bg-gray-50">
        <div ref={containerRef} className="h-full overflow-y-auto">
          <Document 
            file={pdfFilePath} 
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={pdfOptions}
            className="w-full"
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Đang tải PDF...</p>
                </div>
              </div>
            }
          >
            {pageComponents}
          </Document>
        </div>

        {/* Nút Zoom và thông tin */}
        {numPages && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 px-6 py-3 rounded-full flex items-center space-x-4 shadow-lg">
            <button 
              onClick={zoomOut} 
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
              title="Thu nhỏ"
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            
            <span className="text-white text-sm font-medium min-w-16 text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button 
              onClick={zoomIn} 
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
              title="Phóng to"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
            
            <div className="border-l border-gray-600 pl-4 ml-2">
              <span className="text-white text-sm">
                {numPages} trang
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PdfViewer;