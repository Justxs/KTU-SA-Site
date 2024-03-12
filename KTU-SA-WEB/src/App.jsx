import React, {Suspense} from "react";
import styles from "./App.module.css";
import Navbar from "./components/navigationBar/Navbar";
import FooterBar from "./components/footerBar/FooterBar";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  return (
    <div className={styles.PageContainer}>
      <div className={styles.SideMargin}>
        <Navbar />
        <AppRoutes />
      </div>
      <FooterBar />
    </div>
  );
}

export default function WrappedApp(){
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  );
}
