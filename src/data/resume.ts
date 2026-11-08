import { profile } from './profile';

// Machine-readable resume. Served at /resume.json and via the MCP get_resume tool.
export const resume = {
  basics: {
    name: profile.name,
    label: `${profile.title} · ${profile.subtitle}`,
    email: profile.email,
    url: profile.site,
    location: { city: 'Amsterdam', countryCode: 'NL' },
    summary: profile.lede,
    profiles: [
      { network: 'LinkedIn', url: profile.links.linkedin },
      { network: 'GitHub', url: profile.links.github },
    ],
    availability: profile.availability,
  },
  work: [
    {
      name: 'Instapro Group (Werkspot B.V., part of Angi Inc.)',
      location: 'Amsterdam, NL',
      position: 'Software Engineer, frontend & full-stack',
      startDate: '2020-09',
      endDate: '2027-01',
      summary:
        'Multiple product teams over six years: pro acquisition, Communication Architecture (founding member), Qualification & Vetting, an international growth squad, and Angi\'s AI Helper.',
      highlights: [
        'Owned the frontend of the group\'s notification platform (transactional email, digests, dunning, push) for 7 markets and 6 brands across Iterable, Postmark and an in-house renderer.',
        'Migrated ~35 transactional emails between providers; built the Iterable–Crowdin translation integration; led a cost-driven consolidation; wrote the vendor evaluation that drove the template-management decision.',
        'Built the Notification Sandbox (payload guidelines, preview UI, automated email tests), Slack alerting on template changes and a daily compliance audit; adopted as the standard workflow.',
        'Modernised the in-house rendering service (React 18, Node 22, ESLint 9, JavaScript → TypeScript, visual-regression tests) and extended it to push notifications on AWS SNS/Terraform; fixed a pentest-reported vulnerability.',
        'Delivered email infrastructure for the US and Canada launches and compliance across jurisdictions (footers, unsubscribe, one-click unsubscribe).',
        'Built identity and business-verification flows, fraud-scoring tooling and Snowplow tracking schemas; ran NL/UK growth experiments across React and PHP/Symfony.',
        'Shipped LLM-powered features end to end in TypeScript and Java: A/A-tested model migration with rollback, availability and appointments, photo enrichment with an accessible viewer and a Java orchestrator.',
      ],
    },
    {
      name: 'Yunify (later OIIO)',
      location: 'Geleen, NL',
      position: 'Front-End Developer (Mobile)',
      startDate: '2019-09',
      endDate: '2020-09',
      summary: 'E-health scale-up building digital health and vitality solutions.',
      highlights: ['Built and maintained cross-platform React Native apps for iOS and Android in a multidisciplinary team.'],
    },
    {
      name: 'Internships (Optimal Solution, Com-and-Dev, EPI, Astrolab, Tunisie Télécom)',
      location: 'Sousse, Tunisia',
      position: 'Software engineering internships',
      startDate: '2015-07',
      endDate: '2019-06',
      highlights: [
        'Real-time advertising platform for hospitality venues: React, Redux, TypeScript, GraphQL, Socket.io, Jest.',
        'Leave-management web application: Angular 6, Node.js/Express, PostgreSQL, Material UI.',
        'Expert system for diabetes detection (Python, TensorFlow, Django); UX/UI design internship; 4G network performance thesis.',
      ],
    },
  ],
  education: [
    { institution: 'EPI — École Pluridisciplinaire Internationale, Sousse', area: 'Software Engineering', studyType: 'Engineering degree (diplôme d\'ingénieur, master\'s level)', startDate: '2016', endDate: '2019' },
    { institution: 'ISITCom, Sousse', area: 'IT and Telecommunication Networks', studyType: 'Bachelor\'s degree', startDate: '2013', endDate: '2016' },
  ],
  certificates: [{ name: 'ICPC — International Collegiate Programming Contest, certificate of achievement', date: '2018' }],
  skills: profile.skills.map((s) => ({ name: s.group, keywords: [...s.items] })),
  languages: profile.languages.map((l) => ({ language: l.name, fluency: l.level })),
  meta: { version: '2.0.0', lastModified: new Date().toISOString().slice(0, 10), canonical: `${profile.site}/resume.json` },
};
