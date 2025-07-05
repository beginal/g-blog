"use client";

import { siteConfig } from '@/lib/metadata';

interface JsonLdProps {
  type: 'website' | 'article' | 'person' | 'organization';
  data?: Record<string, any>;
}

export default function JsonLd({ type, data = {} }: JsonLdProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            email: siteConfig.author.email,
            url: siteConfig.author.github,
          },
          sameAs: [
            siteConfig.author.github,
          ].filter(Boolean),
          ...data,
        };

      case 'article':
        return {
          ...baseData,
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            email: siteConfig.author.email,
          },
          publisher: {
            '@type': 'Person',
            name: siteConfig.author.name,
          },
          datePublished: data.publishedAt,
          dateModified: data.modifiedAt || data.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/posts/${data.slug}`,
          },
          keywords: data.tags?.join(', '),
          ...data,
        };

      case 'person':
        return {
          ...baseData,
          '@type': 'Person',
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          jobTitle: 'Full Stack Developer',
          url: siteConfig.url,
          sameAs: [
            siteConfig.author.github,
          ].filter(Boolean),
          knowsAbout: siteConfig.keywords,
          ...data,
        };

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/favicon.svg`,
          },
          founder: {
            '@type': 'Person',
            name: siteConfig.author.name,
          },
          ...data,
        };

      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}