import { Metadata } from "next";

export const siteConfig = {
  name: "프론트엔드 개발자의 AI시대 적응기",
  description: "프론트엔드 개발자의 기술 블로그와 포트폴리오",
  url: "https://www.g-blog.life", // 실제 도메인으로 변경
  ogImage: "https://your-domain.com/og-image.jpg", // 실제 OG 이미지로 변경
  author: {
    name: "함준호",
    email: "beginal01@gmail.com",
    github: "https://github.com/beginal", // 실제 GitHub 링크로 변경
  },
  keywords: [
    "프론트엔드 개발자",
    "웹 개발",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "프론트엔드",
    "백엔드",
    "개발 블로그",
    "포트폴리오",
  ],
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Google Search Console에서 발급받은 코드
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

// 페이지별 메타데이터 생성 함수
export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

// 블로그 포스트 메타데이터 생성 함수
export function generatePostMetadata({
  title,
  description,
  slug,
  image,
  publishedAt,
  tags = [],
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  tags?: string[];
}): Metadata {
  const url = `${siteConfig.url}/posts/${slug}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...tags],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: publishedAt,
      authors: [siteConfig.author.name],
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
  };
}
