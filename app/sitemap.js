// app/sitemap.js
export default async function sitemap() {
  const baseUrl = "https://taskkflow.vercel.app";

  // Add all your static pages
  const routes = [
    "",
    "/dashboard",
    "/about",
    "/help",
    "/privacy",
    // Add other static routes
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
