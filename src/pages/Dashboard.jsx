import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";

// Lazy load components for better performance
const DashProfile = lazy(() => import("../components/DashProfile"));
const ServiceList = lazy(() => import("./ListService"));
const NewsList = lazy(() => import("./ListNews"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="relative">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  </div>
);

// Error boundary fallback
const ErrorFallback = ({ error }) => (
  <div className="flex items-center justify-center h-64 text-red-500">
    <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
      <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
      <p className="text-sm text-red-600">{error?.message || 'An error occurred'}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize URL params parsing
  const currentTab = useMemo(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("tab") || "";
  }, [location.search]);

  useEffect(() => {
    setTab(currentTab);
  }, [currentTab]);

  // Memoized callback to prevent unnecessary re-renders
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    if (tab) {
      setIsMobileMenuOpen(false);
    }
  }, [tab]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Render content based on tab
  const renderContent = useMemo(() => {
    const contentMap = {
      profile: <DashProfile />,
      services: <ServiceList />,
      news: <NewsList />
    };

    if (tab && contentMap[tab]) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          {contentMap[tab]}
        </Suspense>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Welcome to Dashboard</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Select an option from the sidebar to explore your dashboard features and manage your content.
          </p>
        </div>
      </div>
    );
  }, [tab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-20" 
           style={{ top: '90px' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          <button
            onClick={handleMobileMenuToggle}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className={`h-6 w-6 transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-90 scale-95' : 'rotate-0 scale-100'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex pt-16 md:pt-0" style={{ marginTop: '90px' }}>
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200 transform transition-all duration-300 ease-out
          md:relative md:inset-0 md:z-0 md:w-64 md:transform-none md:shadow-none md:bg-white
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `} style={{ top: isMobileMenuOpen ? '146px' : '90px', marginTop: isMobileMenuOpen ? '0' : '90px' }}>
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <DashSidebar setTab={setTab} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-full h-full">
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {renderContent}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
      `}</style>
    </div>
  );
}