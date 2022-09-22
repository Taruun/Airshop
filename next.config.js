const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  async redirects() {
    return [
      {
        source: "/canceled",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
