/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://higesan.store",
  generateRobotsTxt: true,
  exclude: ["/dashboard", "/dashboard/*", "/sign-in", "/sign-in/*"],
  sitemapSize: 5000,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "daily",
      priority:
        path === "/"
          ? 1.0
          : path.startsWith("/about")
          ? 0.9
          : path.startsWith("/project")
          ? 0.8
          : path.startsWith("/search")
          ? 0.7
          : 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
