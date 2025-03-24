import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Forgotpassword from "./pages/auth/forgotPassword";
import Home from "./pages/students/home";
import About from "./pages/students/about";
import Openings from "./pages/students/openings";
import Contact from "./pages/students/contact";
import Error from "./pages/students/errorPage";
import Contribute from "./pages/students/contribute";
import Team from "./pages/students/team";
import Myprofile from "./pages/students/myProfile";
import Myapplications from "./pages/students/myApplications";
import Mycontributions from "./pages/students/myContributions";
import Myattendence from "./pages/students/myAttendence";
import Header from "./components/students/header";
import Footer from "./components/students/footer";
import ScrollToTop from "./components/students/scrollToTop";
import Admin from "./pages/admin/home";
import Addadmin from "./pages/admin/addAdmin";
import Addopening from "./pages/admin/addOpening";
import Studetails from "./pages/admin/studentDetails";
import Attendance from "./pages/admin/attendence";
import Record from "./pages/admin/record";
import Navbar from "./components/admin/navbar";
import FooterAdmin from "./components/admin/footer";
import ViewAttendance from "./components/admin/viewAttendance";
import StudentList from "./components/admin/enrolledStudents";

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
          <Route exact path="/forgot" element={<Forgotpassword />} />
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
            path="/myattendance"
            element={
              <>
                <Header />
                <Myattendence />
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
            path="/studdetails"
            element={
              <>
                <Navbar />
                <Studetails />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/college-students"
            element={
              <>
                <Navbar />
                <StudentList />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/attendance"
            element={
              <>
                <Navbar />
                <Attendance />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/view-attendance"
            element={
              <>
                <Navbar />
                <ViewAttendance />
                <FooterAdmin />
              </>
            }
          />
          <Route
            path="/record"
            element={
              <>
                <Navbar />
                <Record />
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
