const { generateDiffHTML } = require("../utility/generateDiffHTML.js");
const { captureHTMLFile } = require("../utility/html2png.js");

const express = require("express");
const fs = require("fs").promises;
const os = require("os");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/difference/:before/:after", async (req, res) => {
  try {
    const beforeText = req.params.before;
    const afterText = req.params.after;
    const html = generateDiffHTML(beforeText, afterText);

    function generateUniqueFileName(extension = ".txt") {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomStr = Math.random().toString(36).substring(2, 15); // Random string
      return `file_${timestamp}_${randomStr}${extension}`; // Example: file_1632864349625_abcd1234.txt
    }

    const fileName = generateUniqueFileName(".png");

    await captureHTMLFile(html, "div.container", `${fileName}`);

    console.log(`${fileName}`);

    const imagePath = `${fileName}`;

    const data = await fs.readFile(imagePath);

    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error handling the image file");
  }
});

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
});
