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
import Myapplications from "./components/students/myapplications";
import Myprofile from "./components/students/myprofile";
import Mycontributions from "./components/students/mycontributions";
import Forgotpassword from "./components/students/forgotpassword";
import Addadmin from "./components/admin/addadmin";
import Addopening from "./components/admin/addopening";
import Highlights from "./components/admin/highlights";
import Studetails from "./components/admin/studetails";

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
            path="/forgot"
            element={
              <>
                <Forgotpassword />
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
          <Route
            exact
            path="/myapplications"
            element={
              <>
                <Header />
                <Myapplications />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/myprofile"
            element={
              <>
                <Header />
                <Myprofile />
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/mycontributions"
            element={
              <>
                <Header />
                <Mycontributions />
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
          <Route
            path="/addadmin"
            element={
              <>
                <Navbar />
                <Addadmin />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/addopening"
            element={
              <>
                <Navbar />
                <Addopening />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/highlight"
            element={
              <>
                <Navbar />
                <Highlights />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/studdetails"
            element={
              <>
                <Navbar />
                <Studetails/>
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
