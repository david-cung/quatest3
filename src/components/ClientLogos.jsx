import React, { useState, useEffect } from 'react';

const ClientLogos = () => {
  // Sample logo data - replace with your actual logos
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logos = [
    { id: 1, src: "2.jpg", alt: "Bekaert" },
    { id: 2, src: "logo/4.jpg", alt: "Boiler Master" },
    { id: 3, src: "logo/6.jpg", alt: "Hop Long" },
    { id: 4, src: "logo/7.jpg", alt: "Great Honor" },
    { id: 5, src: "logo/9.jpg", alt: "CS" },
    { id: 6, src: "logo/10.jpg", alt: "Green Packing" },
    { id: 7, src: "logo/15.jpg", alt: "Shunfa" },
    { id: 8, src: "logo/16.jpg", alt: "Hop Long" },
    { id: 9, src: "logo/20.jpg", alt: "Great Honor" },
    { id: 10, src: "logo/22.jpg", alt: "CS" },
    { id: 11, src: "logo/23.jpg", alt: "Green Packing" },
    { id: 12, src: "logo/24.jpg", alt: "Shunfa" },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLogos, setVisibleLogos] = useState([]);
  const logosPerView = 4; // Number of logos visible at once

  useEffect(() => {
    // Update visible logos when currentIndex changes
    const endIndex = Math.min(currentIndex + logosPerView, logos.length);
    const visibleSet = logos.slice(currentIndex, endIndex);
    
    // If we need more logos to fill the view, loop back to the beginning
    if (visibleSet.length < logosPerView) {
      const remaining = logosPerView - visibleSet.length;
      visibleSet.push(...logos.slice(0, remaining));
    }
    
    setVisibleLogos(visibleSet);
    
    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, logos]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? logos.length - 1 : prevIndex - 1));
  };

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
          KHÁCH HÀNG THÂN THIẾT
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Previous button */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-2 shadow-md z-10"
            onClick={prevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Logo container */}
          <div className="flex items-center justify-center gap-8 py-4 overflow-hidden">
            {visibleLogos.map((logo) => (
              <div 
                key={logo.id} 
                className="w-32 h-20 flex items-center justify-center transition-all duration-500 ease-in-out"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Next button */}
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-2 shadow-md z-10"
            onClick={nextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {logos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index >= currentIndex && index < currentIndex + logosPerView
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;