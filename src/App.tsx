import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Demo from "./pages/Demo";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Logout from "./pages/Logout";
import Dashboard from "./pages/dashboard/Dashboard";
import QRCodes from "./pages/dashboard/QRCodes";
import Settings from "./pages/dashboard/Settings";
import Analytics from "./pages/dashboard/Analytics";
import Billing from "./pages/dashboard/Billing";
import { SidebarProvider } from "./components/dashboard/SidebarContext";
import AuthGuard from "./components/auth/AuthGuard";
import RequireAuth from "./components/auth/RequireAuth";

const LandingPage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </AuthGuard>
  );
};

// Dashboard Layout Component
const DashboardLayout = () => (
  <RequireAuth>
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  </RequireAuth>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/register"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />
          <Route path="/demo" element={<Demo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/logout" element={<Logout />} />

          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="qr-codes" element={<QRCodes />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
