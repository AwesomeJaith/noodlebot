const { findDiffIndexes } = require("./findDiffIndexes.js");

function generateDiffHTML(str1, str2) {
  const diffSets = findDiffIndexes(str1, str2);
  const deletionSet = new Set(diffSets["deletions"]);
  const insertionSet = new Set(diffSets["insertions"]);
  const deletionString = str1;
  const insertionString = str2;
  const deletionLines = splitLines(deletionString, deletionSet);
  const insertionLines = splitLines(insertionString, insertionSet);
  const htmlDeletionLines = generateDeletionLinesHTML(deletionLines);
  const htmlInsertionLines = generateInsertionLinesHTML(insertionLines);
  const diffContainer = generateDiffBodyHTML(
    htmlDeletionLines,
    htmlInsertionLines
  );
  const removalCount = `${deletionSet.size} ${
    deletionSet.size == 1 ? "removal" : "removals"
  }`;
  const additionCount = `${insertionSet.size} ${
    insertionSet.size == 1 ? "insertion" : "insertions"
  }`;
  const removalLineCount = `${deletionLines.length} ${
    deletionLines.length == 1 ? "line" : "lines"
  }`;
  const additionLineCount = `${insertionLines.length} ${
    insertionLines.length == 1 ? "line" : "lines"
  }`;
  const deletionSVG = `
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="minus-sign">
        <defs>
            <style>
                .cls-1 {
                    fill: #ad1f1f;
                }

                .cls-2 {
                    fill: #f9d2d2;
                }
            </style>
        </defs>
        <circle class="cls-2" cx="16" cy="16" r="16" />
        <rect class="cls-1" x="8" y="14" width="16" height="4" />
    </svg>
   `;
  const insertionSVG = `
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="plus-sign">
        <defs>
            <style>
                .cls-3 {
                    fill: #096;
                }

                .cls-4 {
                    fill: #ccebe0;
                }
            </style>
        </defs>
        <circle class="cls-4" cx="16" cy="16" r="16" />
        <polygon class="cls-3"
            points="24 14 24 18 18 18 18 24 14 24 14 18 8 18 8 14 14 14 14 8 18 8 18 14 24 14" />
    </svg>
   `;
  const stylesheet = `
    * {
        font-family: Arial, Courier, monospace;
    }

    html {
        width: 1024px;
        height: auto;
    }

    .container {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        grid-template-areas:
            "title title"
            "header header"
            "body body"
        ;
        padding-bottom: 16px;
    }

    .diff-title {
        grid-area: title;
        padding: 8px 0px 8px 0px;
        font-weight: bold;
        font-size: 2rem;
    }

    .diff-header-container {
        grid-area: header;
        display: flex;
    }

    .diff-header-before {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        padding-left: 16px;
        padding-right: 16px;
    }

    .diff-header-after {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        padding-left: 16px;
        padding-right: 16px;
    }

    .diff-svg-container {
        display: flex;
        /* justify-content: ; */
        align-items: center;
        gap: 8px;
    }

    .minus-sign {
        height: 1rem;
        width: auto;
    }

    .plus-sign {
        height: 1rem;
        width: auto;
    }

    .diff-body-container {
        grid-area: body;
    }

    .diff-body {
        display: flex;
    }

    .diff-body-before {
        flex: 1;
        border: 1px solid black;
    }

    .diff-body-text {
        display: flex;
        padding: 2px 16px 2px 16px;
        gap: 8px;
    }

    .first {
        margin-top: 14px;
    }

    .last {
        margin-bottom: 14px;
    }

    .removal {
        background-color: #ee9090;
    }

    .addition {
        background-color: lightgreen;
    }

    .diff-body-after {
        flex: 1;
        border: 1px solid black;
    }

    .deletion {
        background-color: #ae2121;
        color: white;
    }

    .insertion {
        background-color: #009966;
        color: white;
    }

    .line-number {
        font-weight: bold;
        color: black;
    }

    .bold {
        font-weight: bold;
    }

    .green {
        color: #009966;
    }

    .red {
        color: #ae2121;
    }
   `;
  const htmlContent = `
    <!DOCTYPE html>
    <html>

    <head>
        <style>
        ${stylesheet}
        </style>
        <title>Difference</title>
    </head>
    <body>
        <div class="container">
            <div class="diff-title">Difference</div>
            <div class="diff-header-container">
                <div class="diff-header-before">
                    <div class="diff-svg-container">
                        ${deletionSVG}
                        <p class="bold red">${removalCount}</p>
                    </div>
                    <p class="bold">${removalLineCount}</p> <!-- dynamically generated -->
                </div>
                <div class="diff-header-after">
                    <div class="diff-svg-container">
                        ${insertionSVG}
                        <p class="bold green">${additionCount}</p>
                    </div>
                    <p class="bold">${additionLineCount}</p> <!-- dynamically generated -->
                </div>
            </div>
                ${diffContainer}
            </div>
        </div>
    </body>

   </html>`;

  return htmlContent;
}

// Find longest consecutive set of numbers later for less <mark> tags later
function generateDeletionLineTextHTML(
  originalString,
  removalSet,
  lineNumber,
  type
) {
  const orgStrLen = originalString.length;
  const classes = [
    "diff-body-text",
    removalSet.size !== 0 ? "removal" : "",
    type === 0 || type === 2 ? "first" : "",
    type === 1 || type === 2 ? "last" : "",
  ]
    .filter(Boolean) // Remove any empty strings
    .join(" ");

  const htmlParts = [
    `<div class="${classes}">`,
    `<div class="line-number">${lineNumber}</div>`,
    `<div>`,
  ];

  for (let i = 0; i < orgStrLen; i++) {
    if (removalSet.has(i)) {
      htmlParts.push(`<mark class="deletion">${originalString.at(i)}</mark>`);
    } else {
      htmlParts.push(originalString.at(i));
    }
  }

  htmlParts.push("</div></div>");

  return htmlParts.join("");
}

function splitLines(str, set) {
  // create a dictionary for each line in lines
  // each dictionary should contain a new set with the values in the old set offset by a correct number of values
  let lines = [];
  let currentLine = "";
  let currentLineSet = new Set();
  let lineStartIndex = 0;

  for (let i = 0; i < str.length; i++) {
    currentLine += str.at(i);

    if (set.has(i)) {
      currentLineSet.add(i - lineStartIndex);
    }

    if (str.at(i) === "\n") {
      let currentLineDict = {
        line: currentLine,
        set: new Set(currentLineSet),
      };

      lines.push(currentLineDict);

      currentLineSet.clear();
      currentLine = "";
      lineStartIndex = i + 1;
    }
  }

  let currentLineDict = {
    line: currentLine,
    set: currentLineSet,
  };

  lines.push(currentLineDict);

  return lines;
}

function generateInsertionLineTextHTML(
  originalString,
  removalSet,
  lineNumber,
  type
) {
  const orgStrLen = originalString.length;
  const classes = [
    "diff-body-text",
    removalSet.size !== 0 ? "addition" : "",
    type === 0 || type === 2 ? "first" : "",
    type === 1 || type === 2 ? "last" : "",
  ]
    .filter(Boolean) // Remove any empty strings
    .join(" ");

  const htmlParts = [
    `<div class="${classes}">`,
    `<div class="line-number">${lineNumber}</div>`,
    `<div>`,
  ];

  for (let i = 0; i < orgStrLen; i++) {
    if (removalSet.has(i)) {
      htmlParts.push(`<mark class="insertion">${originalString.at(i)}</mark>`);
    } else {
      htmlParts.push(originalString.at(i));
    }
  }

  htmlParts.push("</div></div>");

  return htmlParts.join("");
}

function generateDeletionLinesHTML(deletionLines) {
  let html = [`<div class="diff-body-before">`];

  for (let i = 0; i < deletionLines.length; i++) {
    let line = deletionLines[i]["line"];
    let set = deletionLines[i]["set"];
    let lineNumber = i + 1;

    if (i == 0 && i == deletionLines.length - 1) {
      html.push(generateDeletionLineTextHTML(line, set, lineNumber, 2));
    } else if (i == deletionLines.length - 1) {
      html.push(generateDeletionLineTextHTML(line, set, lineNumber, 1));
    } else if (i == 0) {
      html.push(generateDeletionLineTextHTML(line, set, lineNumber, 0));
    } else {
      html.push(generateDeletionLineTextHTML(line, set, lineNumber, -1));
    }
  }
  html.push("</div>");

  return html.join("");
}

function generateInsertionLinesHTML(insertionLines) {
  let html = [`<div class="diff-body-after">`];

  for (let i = 0; i < insertionLines.length; i++) {
    let line = insertionLines[i]["line"];
    let set = insertionLines[i]["set"];
    let lineNumber = i + 1;

    if (i == 0) {
      html.push(generateInsertionLineTextHTML(line, set, lineNumber, 0));
    } else if (i == insertionLines.length - 1) {
      html.push(generateInsertionLineTextHTML(line, set, lineNumber, 1));
    } else if (i == 0 && i == insertionLines.length - 1) {
      html.push(generateInsertionLineTextHTML(line, set, lineNumber, 2));
    } else {
      html.push(generateInsertionLineTextHTML(line, set, lineNumber, -1));
    }
  }
  html.push("</div>");

  return html.join("");
}

function generateDiffBodyHTML(deletionHTML, insertionHTML) {
  const html = `<div class="diff-body-container"><div class="diff-body">${deletionHTML}${insertionHTML}</div></div>`;

  return html;
}

// const testStr1 = `While it’s true that most content creators might be officers, I wouldn’t want to limit the application to just that group and yes a member with given access could/should be able to create a course. The grandfathering issue won’t be a concern since we can have users in place to manage and remove content creators when necessary. Additionally, implemen`;
// const testStr2 = `While it’s true that most content creators might be officers, I wouldn’t want to limit the application to just that group. The grandfathering issue won’t be a concern since we can have users in place to manage and remove content creators when necessary. Additionally, implementing an audit log is standard practice with APIs, so we’ll ensure that’s integrated into the backend.`;

// console.log(generateDiffHTML(testStr1, testStr2));

module.exports = {
  generateDiffHTML,
};
