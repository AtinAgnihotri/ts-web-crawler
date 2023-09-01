import { getUrlsFromHTML, isValidURL, normalizeUrl } from "../crawl";

describe("crawl.test", () => {
  it("normalizeUrl.test", () => {
    const testUrls = [
      "https://blog.boot.dev/path/",
      "https://blog.boot.dev/path",
      "http://blog.boot.dev/path/",
      "http://blog.boot.dev/path",
    ];

    testUrls.forEach((url) => {
      expect(normalizeUrl(url)).toEqual("blog.boot.dev/path");
    });
  });

  it("getUrlsFromHTML.test", () => {
    const htmlBlob = `
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="/home"><span>Go to Home</span></a>
        </body>
    </html>`;
    const links = getUrlsFromHTML(htmlBlob, "https://blog.boot.dev/");
    expect(links).toEqual(["blog.boot.dev", "blog.boot.dev/home"]);
  });

  it("isValidURL.test", () => {
    expect(isValidURL("https://www.gooogle.com")).toEqual(true);
    expect(isValidURL("chungri@pungri")).toEqual(false);
  });
});
