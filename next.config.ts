import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 활성화
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 실험적 기능들로 성능 향상
  experimental: {
    optimizePackageImports: [
      '@toast-ui/react-editor',
      'lucide-react',
      'react-icons'
    ],
  },
  
  // 서버 컴포넌트 외부 패키지 설정
  serverExternalPackages: ['@toast-ui/editor', 'prismjs'],
  
  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },
  
  // 성능 최적화
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  // 보안 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  },
  
  // 번들 분석 최적화
  webpack: (config, { dev, isServer }) => {
    // 프로덕션에서 번들 크기 줄이기
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          toastui: {
            test: /[\\/]node_modules[\\/]@toast-ui[\\/]/,
            name: 'toastui',
            priority: 10,
            reuseExistingChunk: true,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide',
            priority: 10,
            reuseExistingChunk: true,
          },
          prism: {
            test: /[\\/]node_modules[\\/]prismjs[\\/]/,
            name: 'prism',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // 번들 크기 분석을 위한 설정
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }

    return config;
  },
  
  // 정적 최적화
  output: 'standalone',
  
  // TypeScript 타입 체크 성능 향상
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false,
  },
  
  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // 리다이렉트 최적화
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
