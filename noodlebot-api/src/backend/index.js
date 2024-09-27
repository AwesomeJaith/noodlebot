const { generateDiffHTML } = require("../utility/generateDiffHTML.js");
const { captureHTMLFile } = require("../utility/html2png.js");

const express = require("express");
const fs = require("fs").promises;
const fsSync = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });
const api_port = process.env.API_PORT;

const app = express();

const imagesDir = path.join(__dirname, "images");
if (!fsSync.existsSync(imagesDir)) {
  fsSync.mkdirSync(imagesDir);
}

app.use(express.json());

app.post("/difference", async (req, res) => {
  try {
    const { beforeText, afterText } = req.body;

    if (typeof beforeText !== "string" || typeof afterText !== "string") {
      return res
        .status(400)
        .send({ message: "Invalid input format. Expected strings." });
    }

    const html = generateDiffHTML(beforeText, afterText);

    function generateUniqueFileName(extension = ".txt") {
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const randomStr = Math.random().toString(36).substring(2, 15); // Random string
      return `file_${timestamp}_${randomStr}${extension}`; // Example: file_1632864349625_abcd1234.txt
    }

    const fileName = generateUniqueFileName(".png");

    console.log(`${fileName}`);

    const imagePath = path.join(imagesDir, fileName);

    console.log(imagePath);

    await captureHTMLFile(html, "div.container", `${imagePath}`);

    res.json({
      imageId: fileName,
      imageUrl: `http://api:${api_port}/images/${fileName}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error handling the image file");
  }
});

app.delete("/images/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const imagePath = path.join(imagesDir, imageId);

    try {
      await fs.access(imagePath);
    } catch (err) {
      return res.status(404).send("Image not found");
    }

    await fs.unlink(imagePath);
    console.log(`Deleted image: ${imagePath}`);

    res.status(200).send("Image deleted successfully!");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error deleting the image file");
  }
});

app.use("/images", express.static(imagesDir));

const server = app.listen(api_port, function () {
  let host = server.address().address;
  let port = server.address().port;
});
