import React from "react";
import "./App.css";
import Navbar from "./components/NavigationBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Documents from "./pages/Documents/Documents";
import ActivityReport from "./pages/activityReport/ActivityReport";
import KtuFSA from "./pages/ktuFSA/KtuFSA";
import LetsCooperate from "./pages/letsCooperate/LetsCooperate";
import KtuSA from "./pages/ktusa/KtuSA";
import Processes from "./pages/processes/Processes";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/KtuSA" element={<KtuSA />} />
        <Route path="/KtuFSA" element={<KtuFSA />} />
        <Route path="/Processes" element={<Processes />} />
        <Route path="/Documents" element={<Documents />} />
        <Route path="/LetsCooperate" element={<LetsCooperate />} />
        <Route path="/ActivityReport" element={<ActivityReport />} />
      </Routes>
    </>
  );
}

export default App;
