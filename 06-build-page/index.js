const fs = require('fs/promises');
const path = require('path');
const projectPath = path.join(__dirname, 'project-dist');
const pagePath = path.join(projectPath, 'index.html');
const assetsPath = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const assetsCopyPath = path.join(__dirname, 'project-dist', 'assets');
const pathStyles = path.join(__dirname, 'styles');
const pathProjectDist = path.join(projectPath, 'style.css');

async function buildPage() 
{
    let templateHTML = await fs.readFile(templatePath);
    templateHTML = templateHTML.toString();
    const tags = templateHTML.match(/{{.+}}/gi);
    const arr = [];
    tags.forEach((el) => arr.push(el.slice(2, el.length - 2)));
    const components = {};
    for (let i = 0; i < arr.length; i++) 
    {
      let componentPath = path.join(componentsPath, `${arr[i]}.html`);
      const component = await fs.readFile(componentPath);
      components[tags[i]] = component.toString();
      templateHTML = templateHTML.replace(`${tags[i]}`, components[tags[i]]);
    }
    fs.writeFile(pagePath, templateHTML);
};

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
};

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

async function init() 
{
    await fs.rm(projectPath, { recursive: true, force: true });
    await fs.mkdir(projectPath, { recursive: true });
    bundleCreate();
    copyDir(assetsPath, assetsCopyPath);
    buildPage();
}
init();