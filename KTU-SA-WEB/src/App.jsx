import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
import NotFound from "./pages/notFound/NotFound";
import RequireAuth from "./components/requireAuth/RequireAuth";
import { ROLES } from "./constants/roles";
import Positions from "./pagesAdmin/positions/positions";

function App() {
  const { userRole, userSaUnit, logout } = useAuthContext();
  useEffect(() => {
    const handleLogoutEvent = () => logout();

    window.addEventListener("logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("logout", handleLogoutEvent);
    };
  }, [logout]);

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
          {userRole && (
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin]} userRole={userRole} />
              }
            >
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/positions" element={<Positions />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
}

export default App;
