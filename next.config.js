/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn0-production-images-kly.akamaized.net', 'localhost']
  },
  eslint: {
    dirs: [
      'components',
      'constants',
      'hooks',
      'interfaces',
      'layouts',
      'models',
      'pages',
      'services',
      'utils',
      'variables',
      'widgets'
    ] // or ['pages', 'hooks']
  }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')(nextConfig);

if (process.env.NODE_ENV === 'analyze') module.exports = withBundleAnalyzer({});
else module.exports = nextConfig;
