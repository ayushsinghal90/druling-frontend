import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/hero/Navbar";
import Footer from "./components/hero/Footer";

import Hero from "./components/Hero";
import Features from "./components/hero/Features";
import Pricing from "./components/hero/Pricing";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

import Demo from "./pages/Demo";
import Terms from "./pages/document/Terms";
import Privacy from "./pages/document/Privacy";
import Menu from "./pages/Menu/Menu";
import PreviewMenu from "./pages/Menu/PreviewMenu";

import Dashboard from "./pages/dashboard/Dashboard";
import QRCodes from "./pages/dashboard/QRCodes";
import Settings from "./pages/dashboard/Settings";
import Analytics from "./pages/dashboard/Analytics";
import Billing from "./pages/dashboard/Billing";
import Restaurants from "./pages/dashboard/Restaurants";
import Profile from "./pages/dashboard/Profile";

import ChangePassword from "./pages/auth/ChangePassword";
import EditBranch from "./pages/EditBranch";
import AddRestaurant from "./pages/AddRestaurant";
import GenerateQR from "./pages/GenerateQR";

import { SidebarProvider } from "./components/dashboard/SidebarContext";
import AuthGuard from "./components/auth/AuthGuard";
import RequireAuth from "./components/auth/RequireAuth";

const LandingPage = () => (
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
      <ToastContainer />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
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
          <Route path="/menu/preview" element={<PreviewMenu />} />

          <Route path="/" element={<LandingPage />} />
          <Route
            path="/change-password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />

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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
