export const techStack = (t: (key: string) => string) => [
  {
    title: 'React 18',
    imgSrc: '/react-icon.png',
    description: t('welcome:techStackReact'),
  },
  {
    title: 'TypeScript',
    imgSrc: '/typescript.svg',
    description: t('welcome:techStackTS'),
  },
  {
    title: 'Firebase',
    imgSrc: '/firebase.png',
    description: t('welcome:techStackFB'),
  },
  {
    title: 'Next.js',
    imgSrc: '/next-js.svg',
    description: t('welcome:techStackNext'),
  },
  {
    title: 'i18next',
    imgSrc: '/i18n.png',
    description: t('welcome:techStackI18n'),
  },
  {
    title: 'NextUi',
    imgSrc: '/nextUI.png',
    description: t('welcome:techStackUI'),
  },
];
