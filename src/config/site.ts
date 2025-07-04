// 사이트 설정

export const SITE_CONFIG = {
  name: 'My Portfolio & Blog',
  description: 'A personal portfolio and blog built with Next.js and Tailwind CSS.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '010-1234-5678',
    location: 'Seoul, Korea',
    github: 'https://github.com/your-github',
    blog: 'https://your-blog.com',
    avatar: '/images/avatar.jpg',
  },
  social: {
    github: 'https://github.com/your-github',
    linkedin: 'https://linkedin.com/in/your-profile',
    twitter: 'https://twitter.com/your-handle',
    email: 'mailto:your.email@example.com',
  },
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'Posts', href: '/posts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  footer: {
    links: [
      {
        title: 'Navigate',
        items: [
          { name: 'Home', href: '/' },
          { name: 'Posts', href: '/posts' },
          { name: 'About', href: '/about' },
        ],
      },
      {
        title: 'Connect',
        items: [
          { name: 'GitHub', href: 'https://github.com/your-github' },
          { name: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
          { name: 'Email', href: 'mailto:your.email@example.com' },
        ],
      },
    ],
    copyright: '© 2024 Your Name. All rights reserved.',
  },
} as const;

export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.name,
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    handle: '@your-handle',
    site: '@your-handle',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#262b33',
    },
  ],
} as const;