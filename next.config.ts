const nextConfig = async () => {
  return {
    env: {
      API_URL: process.env.API_URL,

      LIVEKIT_URL: process.env.LIVEKIT_URL,
      LIVEKIT_API_KEY: process.env.LIVEKIT_API_KEY,
      LIVEKIT_API_SECRET: process.env.LIVEKIT_API_SECRET,
    },

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'la.ua',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
};

export default nextConfig;
