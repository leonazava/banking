fs = require("fs");
const processData = require("./processData");

let filePath = process.argv[2];
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) throw err;
  let input = JSON.parse(data);
  processData(input);
});
