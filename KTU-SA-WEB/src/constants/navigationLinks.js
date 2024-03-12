const NAVIGATION_LINKS = (t) => ([
  {
    header: t('navbar.about.header'),
    description: t('navbar.about.description'),
    links: [
      { name: t('navbar.about.whatIsKtuSA'), path: "/AboutUs" },
      { name: t('navbar.about.fsa'), path: "/Fsa" },
      { name: t('navbar.about.documents'), path: "/Documents" },
      { name: t('navbar.about.activityReports'), path: "/ActivityReports" },
    ]
  },
  {
    header: t('navbar.forStudents.header'),
    description: t('navbar.forStudents.description'),
    links: [
      { name: t('navbar.forStudents.dormitories'), path: "/Dormitories" },
      { name: t('navbar.forStudents.scholarships'), path: "/Scholarships" },
      { name: t('navbar.forStudents.articles'), path: "/Articles" },
      { name: t('navbar.forStudents.events'), path: "/Events" }
    ],
  },
  {
    header: t('navbar.representation.header'),
    description: t('navbar.representation.description'),
    links: [
      { name: t('navbar.representation.elders'), path: "/Elders" },
      { name: t('navbar.representation.kspk'), path: "/KSPK" },
      { name: t('navbar.representation.representInKtu'), path: "/StudentRepresentetives" },
    ],
  },
  {
    header: t('navbar.needHelp.header'),
    description: t('navbar.needHelp.description'),
    links: [
      { name: t('navbar.needHelp.duk'), path: "/Duk" },
      { name: t('navbar.needHelp.socialHelp'), path: "/SocialHelp" },
      { name: t('navbar.needHelp.academicHelp'), path: "/AcademicHelp" },
    ],
  },
]);

export default NAVIGATION_LINKS;
