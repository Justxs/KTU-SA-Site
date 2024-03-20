import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import KtuSA from '../../pages/ktusa/KtuSA';
import KtuFSA from '../../pages/ktuFSA/KtuFSA';
import WorkInProgress from '../../pages/workInProgress/WorkInProgress';
import NotFound from '../../pages/notFound/NotFound';
import Contacts from '../../pages/contacts/Contacts.jsx';
import Articles from '../../pages/articles/Articles.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ktuSA" element={<KtuSA />} />
      <Route path="/fsa/:fsaName" element={<KtuFSA />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/Articles" element={<Articles />} />
      <Route path="/Articles/:articleId" element={<WorkInProgress />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
