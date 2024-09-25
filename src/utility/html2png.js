const puppeteer = require("puppeteer");
const path = require("path");

export async function captureHTMLFile(HTMLFile, containerSelector, outputPath) {
  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();

  // Set the viewport width to 1024 pixels and height to 0 initially
  await page.setViewport({ width: 1024, height: 0 });

  // Get the file URL for the HTML file in the same directory
  const filePath = `file:${path.join(__dirname, HTMLFile)}`;

  // Load the HTML file
  await page.goto(filePath);

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
//captureHTMLFile("diff_example.html", "div.container", "test_page.png");
