import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import KtuFSA from "./pages/ktuFSA/KtuFSA";
import KtuSA from "./pages/ktusa/KtuSA";
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
import Positions from "./pagesAdmin/positions/Positions";
import ContactsUpdate from "./pagesAdmin/contactsUpdate/ContactsUpdate";
import WorkInProgress from "./pages/workInProgress/WorkInProgress";

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
          {userRole || <Route path="/signin-google" element={<LoginPage />} />}
          <Route path="/ktuSA" element={<KtuSA />} />
          <Route path="/fsa/:fsaName" element={<KtuFSA />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/processes" element={<WorkInProgress />} />
          <Route path="/letsBecomePartners" element={<WorkInProgress />} />
          <Route path="/activityReports" element={<WorkInProgress />} />
          <Route path="/aboutUs" element={<WorkInProgress />} />
          <Route path="/fsa" element={<WorkInProgress />} />
          <Route path="/documents" element={<WorkInProgress />} />
          <Route path="/FinancialSupport" element={<WorkInProgress />} />
          <Route path="/HowTojoin" element={<WorkInProgress />} />
          <Route path="/Dormitories" element={<WorkInProgress />} />
          <Route path="/Projects" element={<WorkInProgress />} />
          <Route path="/Scholarships" element={<WorkInProgress />} />
          <Route path="/events" element={<WorkInProgress />} />
          <Route path="/KSPK" element={<WorkInProgress />} />
          <Route path="/StudentRepresentetives" element={<WorkInProgress />} />
          <Route path="/ShareAnIdea" element={<WorkInProgress />} />
          <Route path="/Duk" element={<WorkInProgress />} />
          <Route path="/SocialHelp" element={<WorkInProgress />} />
          <Route path="/AcademicHelp" element={<WorkInProgress />} />
          <Route path="/Discrimination" element={<WorkInProgress />} />
          <Route path="/Elders" element={<WorkInProgress />} />
          <Route path="/Articles" element={<WorkInProgress />} />


          {userRole && (
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin]} userRole={userRole} />
              }
            >
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/contacts/update" element={<ContactsUpdate />} />
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
