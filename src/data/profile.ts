// Single source of truth for everything the site says about you.
// Edit here; the pages, resume.json, llms.txt content and the MCP tools all read from this.

export const profile = {
  name: 'Wafa Abbassi',
  title: 'Senior Software Engineer',
  subtitle: 'Frontend & full-stack · AI-assisted engineering',
  location: 'Amsterdam, Netherlands',
  email: 'abbassiiwafa04@gmail.com',
  site: 'https://wafaabbassi.dev',
  links: {
    linkedin: 'https://www.linkedin.com/in/wafa-abbassi-54355412a/',
    github: 'https://github.com/REPLACE_ME', // update once the account exists
  },
  availability: {
    status: 'open',
    from: '2027-02-01',
    roles: ['Senior Frontend Engineer', 'Senior Full-Stack Engineer', 'Software Engineer'],
    location: 'Netherlands · hybrid or remote',
    note: 'Available from February 2027. Open to hybrid roles anywhere in the Netherlands and to remote roles.',
  },
  tagline: 'I build the systems other teams depend on.',
  lede:
    'Over six years of shipping web products, mostly in React and TypeScript, increasingly across the full stack. ' +
    "I've owned a multi-market notification platform, built internal tools engineers use every day, revived legacy codebases, " +
    'delivered LLM-powered features end to end in TypeScript and Java, and made AI-assisted development part of how I work.',
  ticker: [
    'Open to senior roles from Feb 2027',
    'Frontend & full-stack',
    'React · TypeScript · Node · PHP · Java · Python',
    'AI-assisted engineering · Claude Code · Cursor',
    'Amsterdam · hybrid or remote in NL',
    'EN / FR / AR',
  ],
  stats: [
    { value: 6, suffix: '+ yrs', label: 'shipping web products' },
    { value: 7, suffix: ' markets', label: 'served by one platform I owned' },
    { value: 5, suffix: ' languages', label: 'TS, JS, PHP, Java, Python' },
    { value: 2, suffix: ' launches', label: 'email infrastructure for US and Canada' },
  ],
  languages: [
    { name: 'English', level: 'Full professional' },
    { name: 'French', level: 'Full professional' },
    { name: 'Arabic', level: 'Native' },
    { name: 'Dutch', level: 'Working proficiency' },
    { name: 'German', level: 'Basic' },
  ],
  skills: [
    { group: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Vue', 'React Native', 'Storybook', 'Tailwind', 'SCSS', 'Accessibility (WCAG)', 'i18n (Lingui, Crowdin)'] },
    { group: 'Testing & tooling', items: ['Jest', 'React Testing Library', 'Cypress', 'Visual regression', 'Playwright', 'ESLint', 'Nx', 'pnpm', 'Vite', 'Webpack', 'GitLab CI', 'GitHub Actions'] },
    { group: 'Backend & infrastructure', items: ['Node.js / Express', 'PHP / Symfony', 'Java', 'Python', 'REST', 'GraphQL APIs', 'Docker', 'Terraform', 'AWS (SNS)', 'Nginx'] },
    { group: 'Data, experimentation & messaging', items: ['Snowplow / Iglu', 'Split.io', 'LaunchDarkly', 'A/B & A/A testing', 'Sentry', 'OpenTelemetry', 'Iterable', 'Postmark', 'Email deliverability & compliance'] },
    { group: 'AI-assisted engineering', items: ['Claude Code', 'Cursor', 'Agent skills (Angi Crew)', 'Prompt & context design', 'Verifying generated code', 'LLM feature delivery', 'A/A model testing'] },
    { group: 'Ways of working', items: ['Platform ownership', 'Technical writing', 'Decision records', 'Vendor evaluations', 'On-call', 'Onboarding & coaching', 'Cross-time-zone collaboration'] },
  ],
  faq: [
    {
      q: 'Is Wafa available, and from when?',
      a: 'Yes. Available for a new role from 1 February 2027, full-time, in the Netherlands (hybrid) or remote.',
    },
    {
      q: 'Which roles is she looking for?',
      a: 'Senior frontend or full-stack engineering roles in product companies, scale-ups or engineering-led corporates, ideally owning a domain or platform for the long term.',
    },
    {
      q: 'What is her core stack?',
      a: 'React and TypeScript, with Next.js, GraphQL and Node. She has shipped production code in PHP/Symfony and Java, and has worked with Vue and Angular. See the Skills section for the full list.',
    },
    {
      q: 'How does she use AI in her work?',
      a: 'Claude Code and Cursor daily, with every generated change going through tests, quality gates and a review of the diff before merge. She has also shipped LLM-powered product features, including an A/A-tested model migration.',
    },
    {
      q: 'Can an AI assistant read this site?',
      a: 'Yes. The site publishes /resume.json, /llms.txt, AGENTS.md and an MCP endpoint at /api/mcp with tools to read the resume and case studies and check availability.',
    },
  ],
} as const;
