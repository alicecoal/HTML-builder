const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');

var text = fs.createWriteStream(path.join(__dirname,'text.txt'))

stdout.write('Hi, type the text:\n');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit')
    {
        console.log('Bye!)')
        process.exit()
    } 
    else text.write(data.toString()); 
})

process.on('SIGINT', () => {
    console.log('Bye!)')
    process.exit()
})