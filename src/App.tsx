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
import Restaurants from "./pages/dashboard/Restaurants";
import { SidebarProvider } from "./components/dashboard/SidebarContext";
import AuthGuard from "./components/auth/AuthGuard";
import RequireAuth from "./components/auth/RequireAuth";
import Profile from "./pages/dashboard/Profile";
import ChangePassword from "./pages/ChangePassword";
import EditBranch from "./pages/EditBranch";
import AddRestaurant from "./pages/AddRestaurant";
import GenerateQR from "./pages/GenerateQR";
import Menu from "./pages/Menu/Index";

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
          <Route path="/menu/:menuId" element={<Menu />} />

          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/change-password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="qr-codes" element={<QRCodes />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            path="/restaurants/:restaurantId/branches/:branchId/edit"
            element={<EditBranch />}
          />
          <Route path="/restaurants/add" element={<AddRestaurant />} />
          <Route path="/qr/generate" element={<GenerateQR />} />
          <Route
            path="/qr/menu/:restaurantId/:branchId"
            element={<GenerateQR />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
