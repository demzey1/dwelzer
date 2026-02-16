const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
