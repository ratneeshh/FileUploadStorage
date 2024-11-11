/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/Database/:filePath*',
        destination: '/api/download?filePath=:filePath*',
      },
    ];
  },
};

export default nextConfig;
