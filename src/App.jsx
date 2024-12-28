import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import Contact from "./pages/Contact";
import IntroPage from "./pages/IntroPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<IntroPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<Contact />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
