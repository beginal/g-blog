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
    ],
  },
  
  // 실험적 기능들로 성능 향상
  experimental: {
    optimizePackageImports: [
      '@toast-ui/react-editor',
      '@toast-ui/editor',
      'lucide-react'
    ],
  },
  
  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 번들 분석 최적화
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
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
        },
      };
    }

    return config;
  },
  
  // 정적 최적화
  output: 'standalone',
  
  // TypeScript 타입 체크 성능 향상
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
