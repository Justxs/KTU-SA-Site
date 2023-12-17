import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ActivityReport from "./pages/activityReport/ActivityReport";
import KtuFSA from "./pages/ktuFSA/KtuFSA";
import LetsCooperate from "./pages/letsCooperate/LetsCooperate";
import KtuSA from "./pages/ktusa/KtuSA";
import Processes from "./pages/processes/Processes";
import LoginPage from "./pages/login/LoginPage";
import AdminPanel from "./pagesAdmin/adminPanel/AdminPanel";
import { useAuthContext } from "./context/authContext";
import styles from "./App.module.css";
import Navbar from "./components/navigationBar/Navbar";
import FooterBar from "./components/footerBar/FooterBar";
import Contacts from "./pages/contacts/Contacts";

function App() {
  const { isAuthenticated, userRole, userSaUnit } = useAuthContext();

  return (
    <div className={styles.PageContainer}>
      <div className={styles.SideMargin}>
        <Navbar role={userRole} saUnit={userSaUnit} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin-google" element={<LoginPage />} />
          <Route path="/ktuSA" element={<KtuSA />} />
          <Route path="/fsa/:fsaName" element={<KtuFSA />} />
          <Route path="/processes" element={<Processes />} />
          <Route path="/letsCooperate" element={<LetsCooperate />} />
          <Route path="/activityReport" element={<ActivityReport />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPanel role={userRole} saUnit={userSaUnit} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
}

export default App;
