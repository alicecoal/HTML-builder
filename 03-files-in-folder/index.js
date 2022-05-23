const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname,'secret-folder');

try {
    fs.readdir(filepath, {withFileTypes: true}, (err, files) => {
        if(err) {
            console.error(err)
            return
        }
        files.forEach((file) => {
            if (file.isFile()) 
            { 
              let fullpath = filepath + '\\' + file.name;
              fs.stat(fullpath, (err, stats) => {
                console.log(path.basename(fullpath).split('.').slice(0,-1).join('.') + '-' + path.extname(fullpath).slice(1) + '-' + stats.size + 'b');
              });
            };
        })
    })
} catch (err) {
  console.error(err);
}