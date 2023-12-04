import React from "react";
import Navbar from "./components/navigationBar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Documents from "./pages/Documents/Documents";
import ActivityReport from "./pages/activityReport/ActivityReport";
import KtuFSA from "./pages/ktuFSA/KtuFSA";
import LetsCooperate from "./pages/letsCooperate/LetsCooperate";
import KtuSA from "./pages/ktusa/KtuSA";
import Processes from "./pages/processes/Processes";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import { useAuthContext } from "./context/authContext";

function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin-google" element={<LoginPage />} />
        <Route path="/KtuSA" element={<KtuSA />} />
        <Route path="/KtuFSA" element={<KtuFSA />} />
        <Route path="/Processes" element={<Processes />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/LetsCooperate" element={<LetsCooperate />} />
        <Route path="/ActivityReport" element={<ActivityReport />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <AdminPanel /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
