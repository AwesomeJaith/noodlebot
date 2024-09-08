function generateDiff(str1, str2) {}

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

function findChange(string, subsequence) {
  let change = [];

  let i = string.length;
  let j = subsequence.length;

  while (i > 0 && j > 0) {
    if (string[i] === subsequence[j]) {
      i--;
      j--;
    } else {
      change.push(string[i]);
      i--;
    }
  }

  return change.reverse();
}

testStr1 = `Title: Career Prep: Wow to Do an Effective Job Search
Description: Embark on your career journey with confidence by understanding the fundamentals of crafting a winning resume and utilizing tools like LinkedIn, Handshake, and VMock to find the perfect job or internship opportunity for you.
Time: 7:30 PM MST to 8:30 PM MST`;

testStr2 = `Title: Career Prep: How to Do an Effective Job Search
Description:
Embark on your career journey with confidence by understanding the fundamentals of crafting a winning resume and utilizing tools like LinkedIn, Handshake, and VMock to find the perfect job or internship opportunity for you.
Time: 7:30 PM MST to 8:30 PM MST`;

const subsequence = findLCS(testStr1, testStr2);
console.log(subsequence);

// Deleted characters test
console.log("\nThe following strings were deleted:");
deleted = findChange(testStr1, subsequence);
for (let i = 0; i < deleted.length; i++) {
  console.log(deleted[i]);
}

// Inserted characters test
console.log("\nThe following strings were inserted:");
inserted = findChange(testStr2, subsequence);
for (let i = 0; i < inserted.length; i++) {
  console.log(inserted[i]);
}
