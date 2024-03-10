import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/students/home";
import Login from "./components/students/login";
import Signup from "./components/students/signup";
import Openings from "./components/students/openings";
import Header from "./components/students/header";
import Footer from "./components/students/footer";
import Contact from "./components/students/contact";
import Team from "./components/students/team";
import About from "./components/students/about";
import Contribute from "./components/students/contribute";
import Error from "./components/students/error";
import ScrollToTop from "./components/students/scrollTotop";
import Admin from "./components/admin/home";
import Navbar from "./components/admin/navbar";
import FooterAdmin from "./components/admin/footer";

function App() {
  return (
    <div className="bg-gradient-to-t from-slate-50 to-purple-100">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <>
                <Header />
                <Signup />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/openings"
            element={
              <>
                <Header />
                <Openings />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/contact"
            element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/team"
            element={
              <>
                <Header />
                <Team />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/contribute"
            element={
              <>
                <Header />
                <Contribute />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Error />} />
          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <Admin />
                <FooterAdmin />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
