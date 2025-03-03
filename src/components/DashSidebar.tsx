import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { HiNewspaper } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

interface DashSidebarProps {
  setTab: (tab: string) => void;
}

export default function DashSidebar({ setTab }: DashSidebarProps) {
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

  const handleNavigation = (tabName: string) => {
    setTab(tabName); // Cập nhật trạng thái trong Dashboard
    navigate(`/dashboard?tab=${tabName}`);
  };

  return (
    <Sidebar className='w-full md:w-56 bg-blue-600 text-white min-h-screen'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "services"}
            icon={HiDocumentText}
            className='hover:bg-blue-500'
            onClick={() => handleNavigation("services")}
          >
            Dịch vụ
          </Sidebar.Item>
          <Sidebar.Item
            active={tab === "news"}
            icon={HiNewspaper}
            className='hover:bg-blue-500'
            onClick={() => handleNavigation("news")}
          >
            Tin tức
          </Sidebar.Item>
          <hr className='my-2 border-blue-300' />
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer hover:bg-blue-500'
            onClick={() => console.log("Sign Out")}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
