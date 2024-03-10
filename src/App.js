import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Openings from "./components/openings";
import Header from "./components/header";
import Footer from "./components/footer";
import Contact from "./components/contact";
import Team from "./components/team";
import About from "./components/about";
import Contribute from "./components/contribute";
import Error from "./components/error";
import ScrollToTop from "./components/scrollTotop";

function App() {
  return (
    <div className="bg-gradient-to-t from-slate-50 to-purple-100">
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/openings" element={<Openings />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contribute" element={<Contribute />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
