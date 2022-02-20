const fs = require('fs');
const processData = require('./processData');

const filePath = process.argv[2];
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  const input = JSON.parse(data);
  processData(input);
});
