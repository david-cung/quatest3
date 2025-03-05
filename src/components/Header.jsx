import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLogo from "../assets/logo/MainLogo.jpg";
import { Menu, X } from 'lucide-react'; // For hamburger and close icons

const Header = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <div 
          className="flex items-center"
          onClick={() => handleNavigation("/")}
        >
          <img
            src={MainLogo}
            alt='Logo'
            className="h-16 mr-4"
          />
          <div>
            <span className="block text-sm font-bold text-[#032c57] text-center">
              Công ty cổ phần kiểm định hiệu chuẩn đo lường khu vực 2 (INTEST)
            </span>
            <span className="block text-xs text-[#032c57] text-center">
              91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi
            </span>
          </div>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          {[
            { label: "TRANG CHỦ", path: "/home" },
            { label: "GIỚI THIỆU", path: "/about" },
            { 
              label: "DỊCH VỤ", 
              path: "/services",
              subItems: [
                { label: "Hiệu chuẩn, kiểm định", path: "/services-types" },
                { label: "Hiệu chuẩn tận nơi", path: "/services-products" },
                { label: "Đào tạo và huấn luyện", path: "/services-training" },
                { label: "Bảo trì-sửa chữa", path: "/services-maintenance" }
              ]
            },
            { label: "TIN TỨC", path: "/news" },
            { label: "HỎI ĐÁP", path: "/faq" },
            { label: "LIÊN HỆ", path: "/contact" }
          ].map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <div>
                  <div 
                    className="font-bold text-[#032c57] cursor-pointer"
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </div>
                  <ul className="pl-4 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li 
                        key={subItem.label} 
                        className="text-sm text-gray-700 cursor-pointer"
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        {subItem.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div 
                  className="font-bold text-[#032c57] cursor-pointer"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Menu (Hamburger) */}
      <header className="fixed top-0 left-0 w-full bg-white z-40 lg:hidden">
        <div className="flex justify-between items-center p-4">
          <div 
            className="flex items-center"
            onClick={() => handleNavigation("/")}
          >
            <img
              src={MainLogo}
              alt='Logo'
              className="h-12 mr-2"
            />
            <span className="text-sm font-bold text-[#032c57]">INTEST</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Desktop Navigation */}
      <header className="hidden lg:block fixed top-0 left-0 w-full bg-white z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo and Company Name */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <img
                src={MainLogo}
                alt='Logo'
                className="h-20 mr-4"
              />
              <div>
                <span className="block text-lg font-bold text-[#032c57]">
                  Công ty cổ phần kiểm định hiệu chuẩn đo lường khu vực 2 (INTEST)
                </span>
                <span className="block text-sm text-[#032c57]">
                  91 An Dương Vương, phường Trần Phú, TP. Quảng Ngãi, tỉnh Quảng Ngãi
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav>
              <ul className="flex space-x-6">
                {[
                  { label: "TRANG CHỦ", path: "/home" },
                  { 
                    label: "GIỚI THIỆU", 
                    path: "/about", 
                    dropdown: false 
                  },
                  { 
                    label: "DỊCH VỤ", 
                    path: "/services", 
                    dropdown: true,
                    items: [
                      { label: "Hiệu chuẩn, kiểm định", path: "/services-types" },
                      { label: "Hiệu chuẩn tận nơi", path: "/services-products" },
                      { label: "Đào tạo và huấn luyện", path: "/services-training" },
                      { label: "Bảo trì-sửa chữa", path: "/services-maintenance" }
                    ]
                  },
                  { label: "TIN TỨC", path: "/news" },
                  { label: "HỎI ĐÁP", path: "/faq" },
                  { label: "LIÊN HỆ", path: "/contact" }
                ].map((item) => (
                  <li 
                    key={item.label} 
                    className="relative group"
                    onMouseEnter={() => {
                      if (item.label === "DỊCH VỤ") setShowServicesDropdown(true);
                      if (item.label === "GIỚI THIỆU") setShowAboutDropdown(true);
                    }}
                    onMouseLeave={() => {
                      setShowServicesDropdown(false);
                      setShowAboutDropdown(false);
                    }}
                  >
                    <span 
                      className="text-[#032c57] font-bold cursor-pointer hover:text-blue-600 transition"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
                    </span>
                    {item.dropdown && showServicesDropdown && (
                      <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 px-4 min-w-[200px] z-50">
                        {item.items.map((subItem) => (
                          <li 
                            key={subItem.label}
                            className="py-2 border-b last:border-b-0 hover:bg-gray-100"
                            onClick={() => handleNavigation(subItem.path)}
                          >
                            <span className="text-sm text-gray-700 cursor-pointer">
                              {subItem.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <MobileMenu />}
    </>
  );
};

export default Header;