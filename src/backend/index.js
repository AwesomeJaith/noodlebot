import { generateDiffHTML } from "../utility/generateDiffHTML.js";
import { captureHTMLFile } from "../utility/html2png.js";

const str1 = `While it’s true that most content creators might be officers, I wouldn’t want to limit the application to just that group and yes a member with given access could/should be able to create a course. The grandfathering issue won’t be a concern since we can have users in place to manage and remove content creators when necessary. Additionally, implemen`;
const str2 = `While it’s true that most content creators might be officers, I wouldn’t want to limit the application to just that group. The grandfathering issue won’t be a concern since we can have users in place to manage and remove content creators when necessary. Additionally, implementing an audit log is standard practice with APIs, so we’ll ensure that’s integrated into the backend.`;
const html = generateDiffHTML(str1, str2);
captureHTMLFile(html, "div.container", "output.png");

console.log("Captured diff!");
