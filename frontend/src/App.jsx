import { BrowserRouter, Routes, Route } from "react-router-dom";

import IncidentForm from "./pages/IncidentForm";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

  <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/analyze"
          element={<IncidentForm />}
        />

      </Routes>

      

    </BrowserRouter>
  );
}

export default App;