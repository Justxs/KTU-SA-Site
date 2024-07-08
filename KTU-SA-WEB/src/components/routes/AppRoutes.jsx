import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from '../../pages/home/Home';
import KtuFSA from '../../pages/ktuFSA/KtuFSA';
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
import Elders from '../../pages/elders/Elders.jsx';
import Scholarships from '../../pages/scholarships/Scholarships.jsx';
import AboutUs from '../../pages/aboutUs/AboutUs.jsx';
import ActivityReport from '../../pages/activityReport/ActivityReport.jsx';
import RepresentativesKtu from '../../pages/representativesKtu/RepresentativesKtu.jsx';
import RepresentativesFaculty from '../../pages/representativesFaculty/RepresentativesFaculty.jsx';
import { ScrollContext } from '../../context/ScrollContext.jsx';

export default function AppRoutes() {
  const { pathname } = useLocation();
  const { setIds } = useContext(ScrollContext);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname === '/') {
      setIds([
        t('sections.values'),
        t('sections.sponsors'),
        t('sections.duk'),
        t('sections.fsa'),
        t('sections.follow'),
      ]);
    } else {
      setIds([]);
    }
  }, [pathname, setIds, t]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="/EmotionalHelp" element={<SocialHelp />} />
      <Route path="/elders" element={<Elders />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/activityReports" element={<ActivityReport />} />
      <Route path="/StudentRepresentetivesFaculties" element={<RepresentativesFaculty />} />
      <Route path="/studentRepresentetives" element={<RepresentativesKtu />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
