import { TPages } from "./types";

export const getSortedPagesData = (pages: TPages): TPages => {
  const newPages: TPages = {};
  Object.keys(pages)
    .sort((a, b) => pages[b].internalLinks - pages[a].internalLinks)
    .forEach((key) => {
      newPages[key] = pages[key];
    });
  return newPages;
};

export const printReport = (pages: TPages) => {
  console.log("\n\n+========= Data Fetched By URLS =========+");
  const sortedPages = getSortedPagesData(pages);
  Object.entries(sortedPages).forEach(([url, { html, internalLinks }]) => {
    console.log(`+========= ${url} =========+`);
    console.log(`+========= Internal links: ${internalLinks} =========+`);
    // console.log(html); // Uncomment to log html
  });
  console.log("\n\n+========= END =========+\n\n");
};
