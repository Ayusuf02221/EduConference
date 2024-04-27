const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({'canvas': 'commonjs canvas'});
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

export default nextConfig;
