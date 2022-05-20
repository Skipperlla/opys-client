const nextConfig = {
  reactStrictMode: false,
  env: {
    WEB_PUSH_PUBLIC_KEY:
      "BKW4d3HuSrxPkORbqrPtVfJH6MLXsXZvUproxKUd61knDsTrJ1EW9eZHVdIJffDvGS0-OAVkBjOKBYzd3xUJdqM",
  },
  images: {
    domains: [
      "fra1.digitaloceanspaces.com",
      "saps.fra1.digitaloceanspaces.com",
    ],
  },
};

module.exports = nextConfig;
