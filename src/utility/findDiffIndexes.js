function findDiffIndexes(str1, str2) {
  const subsequence = findLCS(str1, str2);
  const deletions = findChange(str1, subsequence);
  const insertions = findChange(str2, subsequence);

  return { deletions: deletions, insertions: insertions };
}

function findLCS(str1, str2) {
  const m = str1.length;
  const n = str2.length;

  const matrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }

  let str = [];

  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (str1[i - 1] == str2[j - 1]) {
      str.push(str1[i - 1]);
      i--;
      j--;
    } else {
      if (matrix[i][j - 1] > matrix[i - 1][j]) {
        j--;
      } else {
        i--;
      }
    }
  }
  return str.reverse();
}

function findChange(str, subsequence) {
  let indexes = new Set();

  let i = str.length - 1;
  let j = subsequence.length - 1;

  while (i >= 0) {
    if (j >= 0 && str[i] === subsequence[j]) {
      j--;
    } else {
      indexes.add(i);
    }
    i--;
  }

  return indexes;
}

// Test strings
// const testStr1 = `Diggest thing I tried to do my best at was shoot for the shot, don't shoot for the edit. You should ideally never be saying "I can fix it in Lightroom" or "I can just crop it later"`;
// const testStr2 = `Biggest thing I tried to do my best at was shoot for the shot, don't shoot for the edit. You should ideally never be saying "I can fix it in Lightroom" or "I can just crop it later", that's how you get reliant on megapixels`;

// const diff = findDiffIndexes(testStr1, testStr2);
// console.log(diff);

module.exports = {
  findDiffIndexes,
};
