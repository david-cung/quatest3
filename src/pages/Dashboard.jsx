import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import ServiceList from "./ListService";
import NewsList from "./ListNews";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow flex-col md:flex-row mt-[200px] md:mt-0" style={{marginTop: '90px'}}>
        {/* Sidebar for Mobile and Desktop */}
        <div className="w-full md:w-56 bg-slate-300">
          <DashSidebar setTab={setTab} />
        </div>

        {/* Main Content Area */}
        <div 
          className="flex-grow flex items-center justify-center bg-gray-100 p-5"
        >
          {tab === "profile" && <DashProfile />}
          {tab === "services" && <ServiceList />}
          {tab === "news" && <NewsList />}
        </div>
      </div>
    </div>
  );
}