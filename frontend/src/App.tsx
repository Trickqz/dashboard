import { useState, useEffect } from 'react';
import { ThemeProvider } from "./components/theme-provider";
import { Dashboard } from "./page/dashboard";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Signin } from "./page/singin";
import { Signup } from "./page/singup";
import { Network } from "./page/network";
import Verifycode from "./page/settings/verify-code"; 
import { jwtDecode } from "jwt-decode";

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
          <Routes>
            <Route path="/login" element={<Signin />} />
            <Route path="/singup" element={<Signup />} />
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/network" element={<Network />} />
              <Route path="/settings" element={<Verifycode />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;