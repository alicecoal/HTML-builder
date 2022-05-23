const fs = require('fs');
const path = require('path');

var path_ = path.join(__dirname, 'text.txt');
var stream = fs.createReadStream(path_);

stream.on('data', chunk => {
  let textFile = chunk.toString();
  console.log(textFile);
});