const fs = require('fs/promises');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathFilesCopy = path.join(__dirname, 'files-copy');

async function copyDir(source, copy)
{
    try {
        await fs.rm(copy, { recursive: true, force: true });
        await fs.mkdir(copy, { recursive: true });
        const files = await fs.readdir(source, { withFileTypes: true });   
        files.forEach(async function (el){
            if (el.isFile()) {
                await fs.copyFile(path.join(source, el.name), path.join(copy, el.name));
            } else {
                copyDir(path.join(source, el.name), path.join(copy, el.name));
            }
        });
    } catch (err) {
        console.log(err);
    }
};

copyDir(pathFiles, pathFilesCopy);
    