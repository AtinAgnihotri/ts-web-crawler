import { JSDOM } from "jsdom";
import { TPages } from "./types";

export const isValidURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  const urlObj = new URL(url);
  const { host, pathname } = urlObj;
  const normalizedPath = pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return `https://${host}${normalizedPath}`;
};

export const getUrlsFromHTML = (html: string, baseUrl: string): string[] => {
  const dom = new JSDOM(html);
  const aTags = dom.window.document.querySelectorAll("a");
  const aTagLinks = Array.from(aTags.values()).map((tag) => {
    let link = tag.href;
    if (link.startsWith("/")) {
      const basePath = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
      link = `${basePath}${link}`;
    }
    link = normalizeUrl(link);
    return link;
  });
  return aTagLinks;
};

const isSameDomain = (baseUrl: string, currentUrl: string) => {
  return new URL(baseUrl).host === new URL(currentUrl).host;
};

export const crawlPage = async (
  baseUrl: string,
  currentUrl: string,
  pages: TPages
) => {
  if (!isSameDomain(baseUrl, currentUrl)) return;
  try {
    const response = await fetch(currentUrl);
    if (response.status >= 400) {
      throw new Error(`Error fetching page from ${currentUrl}`);
    }
    if (!response.headers.get("content-type")?.includes("text/html")) {
      return;
      //   throw new Error(
      //     `Incorrect response type ${response.headers.get(
      //       "content-type"
      //     )} recieved for ${currentUrl}`
      //   );
    }
    const html = await response.text();
    const linksOnPages = getUrlsFromHTML(html, baseUrl);
    pages[currentUrl] = {
      html,
      internalLinks: linksOnPages.length,
    };

    const linksVisited = Object.keys(pages);
    for (const link of linksOnPages) {
      if (linksVisited.includes(link)) continue;
      await crawlPage(baseUrl, link, pages);
    }
    console.log(`Page crawled at ${currentUrl}`);
  } catch (err) {
    console.log("ERR:", (err as Error).message);
    return undefined;
  }
};
