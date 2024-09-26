const puppeteer = require("puppeteer");

async function captureHTMLFile(htmlString, containerSelector, outputPath) {
  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();

  // Set the viewport width to 1024 pixels and height to 0 initially
  await page.setViewport({ width: 1024, height: 0 });

  // Load the HTML page
  await page.setContent(htmlString, { waitUntil: "networkidle0" });

  // Wait for the container element to be present
  await page.waitForSelector(containerSelector);

  // Calculate the height of the content inside the container
  const containerHeight = await page.$eval(
    containerSelector,
    (el) => el.scrollHeight
  );

  // Resize the viewport to fit the content
  await page.setViewport({ width: 1024, height: containerHeight });

  // Take a screenshot of the container
  await page.screenshot({
    path: outputPath,
    clip: {
      x: 0,
      y: 0,
      width: 1024,
      height: containerHeight,
    },
  });

  await browser.close();
}

// Example usage
// const htmlString = `
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8">
//     <title>Hello World</title>
//   </head>
//   <body>
//     <div class="container">
//       <h1>Hello World!</h1>
//       <p>Welcome to my first web page!</p>
//     </div>
//   </body>
// </html>
// `;

// captureHTMLFile(htmlString, "div.container", "test_page.png");

module.exports = {
  captureHTMLFile,
};
