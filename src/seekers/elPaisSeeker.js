import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import fs from 'fs';

// const url = 'https://elpais.com/espana/2024-06-27/vox-no-descarta-romper-los-gobiernos-con-el-pp-si-los-populares-aceptan-el-reparto-de-menores-migrantes-llegados-a-canarias.html';

const elPaisSeeker = async (url) => {
    const response = await fetch(url);
    const body = await response.text();
    const dom = new JSDOM(body);
    const { document } = dom.window;

    fs.writeFileSync('html.html', document.documentElement.innerHTML);

    const script = await document.querySelectorAll('script[type="application/ld+json"]');
    // console.log(script.length);

    const data = JSON.parse(script[1].text);
    
    const title = data.headline;
    const description = data.description;
    const content = data.articleBody.replaceAll('. ', '.. ').split('. ');
    // content.pop();

    const result = {
        title,
        description,
        content
    }

    return result;

};

// elPaisSeeker(url);

export default elPaisSeeker;
