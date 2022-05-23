const fs = require('fs/promises');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist','bundle.css');
const pathStyles = path.join(__dirname, 'styles');

async function bundleCreate() {
    try {
        const files = await fs.readdir(pathStyles, { withFileTypes: true } );
        let styles = [];
        for (const el of files)
            if (el.isFile() && path.extname(el.name)=='.css')
            {
                let style = await fs.readFile(path.join(pathStyles, el.name));
                styles.push(style.toString());
            }         
        await fs.writeFile(pathProjectDist, styles.join('\n'), 'utf-8') ;
    } catch (err) {
        console.log(err);
    }
}

bundleCreate();