import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";
import { useTheme } from "next-themes";
import { jwtDecode } from "jwt-decode";
import Particles from "@/components/magicui/particles";
import { Toaster } from "@/components/ui/sonner"

import Home from './page/home';
import Dashboard from "./page/users/dashboard";
import { Signin } from "./page/singin";
import { Signup } from "./page/singup";
import { Network } from "./page/users/network";
import Verifycode from "./page/users/settings/verify-code";
import UserProfile from './page/users/userprofile';

import Shoppage from './page/e-commerce/shoppage';
import Catalog from './page/e-commerce/catalog';

import Main from './page/users/website-builder/DndProvider';
import Product from './page/e-commerce/product';

const isUserAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App = () => {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#000000" : "#ffffff";

  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticated(isUserAuthenticated());
    };

    window.addEventListener('storage', handleTokenChange);

    handleTokenChange();

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="font-geist">
          <Particles className="absolute inset-0 z-[-10]" quantity={70} ease={80} color={color} refresh />
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop" element={<Shoppage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/producttest" element={<Product />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/network" element={<Network />} />
              <Route path="/settings" element={<Verifycode />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/test" element={<Main />} />
              <Route path="/shop" element={<Shoppage />} />
              <Route path="/catalog" element={<Catalog />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;