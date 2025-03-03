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
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CreateService from "./pages/CreateService";
import ServiceList from "./pages/ListService";
import EditService from "./pages/EditService";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<IntroPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/news/:newsId" element={<NewsDetailPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-service' element={<CreateService />} />
          <Route path='/list-service' element={<ServiceList />} />
          <Route path='/edit-service/:id' element={<EditService />} />
          <Route path='/detail-service/:id' element={<ServiceDetailPage />} />
          <Route path='/add-news' element={<CreateNews />} />
          <Route path='/edit-news/:id' element={<EditNews />} />
        </Route>
      </Routes>
      <Footer />
      <FixedContact /> {/* Ensure FixedContact is rendered on all pages */}
    </BrowserRouter>
  );
};

export default App;
