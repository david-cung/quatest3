import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { HiNewspaper } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DashSidebar({ setTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setLocalTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setLocalTab(tabFromUrl);
    }
  }, [location.search]);

  const handleNavigation = (tabName) => {
    setTab(tabName); // Cập nhật trạng thái trong Dashboard
    navigate(`/dashboard?tab=${tabName}`);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    
    // You might want to clear any other auth-related data
    // For example, if you have user info stored:
    localStorage.removeItem("user");
    
    // Redirect to login page
    navigate("/sign-in", { replace: true });
  };

  return (
    <Sidebar className='w-full md:w-56 bg-black min-h-screen'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "services"}
            icon={HiDocumentText}
            className={`text-lg cursor-pointer ${
              tab === "services"
                ? "bg-blue-800 text-yellow-300 font-bold" // Màu nền khi active
                : "text-black hover:bg-blue-500"
            }`}
            onClick={() => handleNavigation("services")}
          >
            Dịch vụ
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === "news"}
            icon={HiNewspaper}
            className={`text-lg cursor-pointer ${
              tab === "news"
                ? "bg-blue-800 text-yellow-300 font-bold" // Màu nền khi active
                : "text-black hover:bg-blue-500"
            }`}
            onClick={() => handleNavigation("news")}
          >
            Tin tức
          </Sidebar.Item>
          <hr className='my-2 border-blue-300' />
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer hover:bg-red-500 text-lg transition-colors duration-200'
            onClick={handleLogout}
          >
            Đăng xuất
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}