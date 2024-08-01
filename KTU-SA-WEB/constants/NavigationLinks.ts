type NavigationSection = {
  header: string,
  description: string,
  links: Array<{
    name: string,
    path: string,
  }>;
}

type TranslateFunction = (key: string) => string;

const NAVIGATION_LINKS = (t : TranslateFunction) : Array<NavigationSection> => ([
  {
    header: t('navbar.about.header'),
    description: t('navbar.about.description'),
    links: [
      { name: t('navbar.about.whatIsKtuSA'), path: '/about-us' },
      { name: t('navbar.about.fsa'), path: '/fsa' },
      { name: t('navbar.about.documents'), path: '/documents' },
      { name: t('navbar.about.activityReports'), path: '/activity-reports' }
    ]
  },
  {
    header: t('navbar.forStudents.header'),
    description: t('navbar.forStudents.description'),
    links: [
      // { name: t('navbar.forStudents.dormitories'), path: '/Dormitories' },
      { name: t('navbar.forStudents.scholarships'), path: '/scholarships' },
      { name: t('navbar.forStudents.articles'), path: '/articles' },
      { name: t('navbar.forStudents.events'), path: '/events' }
    ]
  },
  {
    header: t('navbar.representation.header'),
    description: t('navbar.representation.description'),
    links: [
      { name: t('navbar.representation.elders'), path: '/elders' },
      { name: t('navbar.representation.representInfsaBodies'), path: '/student-representatives-faculties' },
      { name: t('navbar.representation.representInKtu'), path: '/student-representatives' }
    ]
  },
  {
    header: t('navbar.needHelp.header'),
    description: t('navbar.needHelp.description'),
    links: [
      { name: t('navbar.needHelp.duk'), path: '/faq' },
      { name: t('navbar.needHelp.EmotionalHelp'), path: '/emotional-help' },
      { name: t('navbar.needHelp.academicHelp'), path: '/academic-help' }
    ]
  }
]);
  
export default NAVIGATION_LINKS;
  
