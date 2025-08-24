const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running!");
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

function levenshtein(a, b) {
  // Return Infinity if lengths are different to exclude non-matching lengths
  if (a.length !== b.length) {
    return Infinity;
  }

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}


const words = [
  "apple",
  "ample",
  "apply",
  "maple",
  "apples",
  "ape",
  "ale",
  "lap",
  "paple"
];

app.post('/similar', (req, res) => {
  const input = req.body.word;
  if (!input) {
    return res.status(400).json({ error: "Missing 'word' in request body." });
  }

  // Find words with distance 1 or more (customize as needed)
  const threshold = 2; // For example, find words within two edits
  const similar = words.filter(w => levenshtein(input, w) <= threshold);

  res.json({ similar });
});
