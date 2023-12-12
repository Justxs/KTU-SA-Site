import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Documents from "./pages/Documents/Documents";
import ActivityReport from "./pages/activityReport/ActivityReport";
import KtuFSA from "./pages/ktuFSA/KtuFSA";
import LetsCooperate from "./pages/letsCooperate/LetsCooperate";
import KtuSA from "./pages/ktusa/KtuSA";
import Processes from "./pages/processes/Processes";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pages/adminPanel/AdminPanel";
import { useAuthContext } from "./context/authContext";
import styles from "./App.module.css";
import Navbar from "./components/NavigationBar/Navbar";
import FooterBar from "./components/footerBar/FooterBar";

function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className={styles.PageContainer}>
      <div className={styles.SideMargin}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin-google" element={<LoginPage />} />
          <Route path="/ktuSA" element={<KtuSA />} />
          <Route path="/fsa/:fsaName" element={<KtuFSA />} />
          <Route path="/processes" element={<Processes />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/letsCooperate" element={<LetsCooperate />} />
          <Route path="/activityReport" element={<ActivityReport />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? <AdminPanel /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
}

export default App;
