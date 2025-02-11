import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import Contact from "./pages/Contact";
import IntroPage from "./pages/IntroPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import FixedContact from "./components/FixedContact"; // Import FixedContact component
import NewsDetailPage from "./pages/NewsDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<IntroPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/news/:newsId" element={<NewsDetailPage />} />
        <Route path="/contact" element={<Contact />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
      <Footer />
      <FixedContact /> {/* Ensure FixedContact is rendered on all pages */}
    </BrowserRouter>
  );
};

export default App;
