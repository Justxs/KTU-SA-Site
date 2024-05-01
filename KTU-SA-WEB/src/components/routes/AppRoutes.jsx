import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../../pages/home/Home';
import KtuSA from '../../pages/ktusa/KtuSA';
import KtuFSA from '../../pages/ktuFSA/KtuFSA';
import WorkInProgress from '../../pages/workInProgress/WorkInProgress';
import NotFound from '../../pages/notFound/NotFound';
import Contacts from '../../pages/contacts/Contacts.jsx';
import Articles from '../../pages/articles/Articles.jsx';
import Events from '../../pages/events/Events.jsx';
import Article from '../../pages/article/Article.jsx';
import Event from '../../pages/event/Event.jsx';
import FsaList from '../../pages/fsaList/FsaList.jsx';
import Documents from '../../pages/documents/Documents.jsx';
import FaqList from '../../pages/faqList/FaqList.jsx';
import AcademicHelp from '../../pages/academicHelp/AcademicHelp.jsx';
import SocialHelp from '../../pages/socialHelp/SocialHelp.jsx';

export default function AppRoutes() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ktuSA" element={<KtuSA />} />
      <Route path="/fsa" element={<FsaList />} />
      <Route path="/fsa/:fsaName" element={<KtuFSA />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:articleId" element={<Article />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:eventId" element={<Event />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/duk" element={<FaqList />} />
      <Route path="/academicHelp" element={<AcademicHelp />} />
      <Route path="/socialHelp" element={<SocialHelp />} />

      <Route path="/letsBecomePartners" element={<WorkInProgress />} />
      <Route path="/activityReports" element={<WorkInProgress />} />
      <Route path="/aboutUs" element={<WorkInProgress />} />
      <Route path="/financialSupport" element={<WorkInProgress />} />
      <Route path="/dormitories" element={<WorkInProgress />} />
      <Route path="/scholarships" element={<WorkInProgress />} />
      <Route path="/kspk" element={<WorkInProgress />} />
      <Route path="/studentRepresentetives" element={<WorkInProgress />} />
      <Route path="/shareAnIdea" element={<WorkInProgress />} />
      <Route path="/elders" element={<WorkInProgress />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
