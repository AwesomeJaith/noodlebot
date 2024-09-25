const { generateDiffHTML } = require("../utility/generateDiffHTML.js");
const { captureHTMLFile } = require("../utility/html2png.js");

const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/difference/:before/:after", (req, res) => {
  const beforeText = req.params.before;
  const afterText = req.params.after;
  const html = generateDiffHTML(beforeText, afterText);

  captureHTMLFile(html, "div.container", "output.png");

  res.send(`Saved image!`);
});

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
});
