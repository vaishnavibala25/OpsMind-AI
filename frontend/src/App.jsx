import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import IncidentForm from "./pages/IncidentForm";
import History from "./pages/History";
import IncidentDetails from "./pages/IncidentDetails";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/register" element={<Signup />} />
<Route
  path="/incident/:id"
  element={
    <ProtectedRoute>
      <div className="app">
        <Navbar />
        <IncidentDetails />
      </div>
    </ProtectedRoute>
  }
/>
 <Route
          path="/analytics"
          element={<ProtectedRoute><div className="app"><Navbar/><Analytics/></div></ProtectedRoute>}
        />

        {/* PUBLIC ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Landing />} />

        

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="app">
                <Navbar />
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />

  
        <Route
          path="/incident"
          element={
            <ProtectedRoute>
              <div className="app">
                <Navbar />
                <IncidentForm />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <div className="app">
                <Navbar />
                <History />
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}