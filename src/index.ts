import { crawlPage, getUrlsFromHTML, isValidURL } from "./crawl";
import { printReport } from "./report";
import { TPages } from "./types";

const appGuards = (args: string[]): string | undefined => {
  if (args.length > 1) {
    console.log("ERR: Please only pass the base url of the site to crawl");
    return;
  }
  if (args.length < 1) {
    console.log("ERR: Please pass the base url of the site to crawl");
    return;
  }
  const urlToCrawl = args[0];
  if (!isValidURL(urlToCrawl)) {
    console.log("ERR: Please pass a valid base url to crawl");
    return;
  }
  return urlToCrawl;
};

async function main() {
  const startTime = Date.now();
  const args = process.argv.slice(2);
  console.log(args);
  const urlToCrawl = appGuards(args);
  if (!urlToCrawl) return;

  console.log("CRAWLING:", urlToCrawl);
  const pagesData: TPages = {};
  await crawlPage(urlToCrawl, urlToCrawl, pagesData);
  printReport(pagesData);
  const noOfPages = Object.keys(pagesData).length;
  const deltaTime = (Date.now() - startTime) / 1000;
  console.log(`+== ${noOfPages} pages crawled in ${deltaTime} seconds ==+`);
}

main();
