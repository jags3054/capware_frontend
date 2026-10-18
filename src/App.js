
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Home from "./pages/Home";

// Services
import Services from "./pages/Services";
import WebsiteDevelopment from "./pages/WebsiteDevelopment";
import MobileAppDevelopment from "./pages/MobileAppDevelopment";
import DesktopBillingSoftware from "./pages/DesktopBillingSoftware";
import GenAISolutions from "./pages/GenAISolutions";

// Internships
import Internships from "./pages/Internships";
import AIMLInternship from "./pages/AIMLInternship";
import FullStackInternship from "./pages/FullStackInternship";
import GenAIInternship from "./pages/GenAIInternship";
import MobileInternship from "./pages/MobileInternship";

// Projects
import Projects from "./pages/Projects";
import AIMLProjects from "./pages/AIMLProjects";
import GenAIProjects from "./pages/GenAIProjects";
import ComputerVisionProjects from "./pages/ComputerVisionProjects";
import DataScienceProjects from "./pages/DataScienceProjects";
import FullStackProjects from "./pages/FullStackProjects";
import ProjectDetails from "./pages/ProjectDetails";
import ResearchGuidance from "./pages/ResearchGuidance";
import ResearchTracking from "./pages/ResearchTracking";
import ResetPassword from "./pages/ResetPassword";


// Student pages
import StudentDashboard from "./pages/StudentDashboard";

// Other pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import PaymentPage from "./pages/Payment";
import EnrollmentTracking from "./pages/EnrollmentTracking";
import FloatingAIChat from "./components/FloatingAIChat";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <FloatingAIChat />
      <Routes>
        {/* ================= HOME ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= AUTHENTICATION ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PUBLIC SERVICES ================= */}
        <Route path="/services" element={<Services />} />

        <Route
          path="/services/website"
          element={<WebsiteDevelopment />}
        />

        <Route
          path="/services/mobile"
          element={<MobileAppDevelopment />}
        />
        <Route
          path="/research-guidance"
          element={<ResearchGuidance />}
        />
        <Route
          path="/research-tracking/:id"
          element={<ResearchTracking />}
        />

        <Route
          path="/services/software"
          element={<DesktopBillingSoftware />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/services/genai"
          element={<GenAISolutions />}
        />

        {/* ================= PUBLIC INTERNSHIPS ================= */}
        <Route path="/internships" element={<Internships />} />

        <Route
          path="/internships/ai-ml"
          element={<AIMLInternship />}
        />

        <Route
          path="/internships/full-stack"
          element={<FullStackInternship />}
        />

        <Route
          path="/internships/genai"
          element={<GenAIInternship />}
        />

        <Route
          path="/internships/mobile"
          element={<MobileInternship />}
        />

        {/* ================= PUBLIC PROJECTS ================= */}
        <Route path="/projects" element={<Projects />} />

        {/* AI / ML */}
        <Route
          path="/projects/ai-ml/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/ai-ml"
          element={<AIMLProjects />}
        />

        {/* Full Stack */}
        <Route
          path="/projects/full-stack/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/full-stack"
          element={<FullStackProjects />}
        />

        {/* Generative AI */}
        <Route
          path="/projects/genai/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/genai"
          element={<GenAIProjects />}
        />

        {/* Computer Vision */}
        <Route
          path="/projects/computer-vision/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/computer-vision"
          element={<ComputerVisionProjects />}
        />

        {/* Data Science */}
        <Route
          path="/projects/data-science/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/data-science"
          element={<DataScienceProjects />}
        />

        {/* ================= PROTECTED STUDENT ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/payment/:enrollmentId"
            element={<PaymentPage />}
          />

          <Route
            path="/tracking/:enrollmentId"
            element={<EnrollmentTracking />}
          />
        </Route>


        {/* Add future student-only routes here:
          <Route
            path="/my-enrollments"
            element={<MyEnrollments />}
          />
          <Route
            path="/profile"
            element={<StudentProfile />}
          />
          */}




        {/* ================= OTHER PUBLIC PAGES ================= */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <main className="container py-5 text-center">
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
              <a href="/" className="btn btn-primary">
                Go to Home
              </a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
