import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';
import fs from 'fs';

const url = 'https://www.lavanguardia.com/internacional/20240628/9766108/biden-trump-debate-cnn.html';

const laVanguardiaSeeker = async (url) => {
    const response = await fetch(url);
    const body = await response.text();
    const dom = new JSDOM(body);
    const { document } = dom.window;

    // fs.writeFileSync('html.html', document.documentElement.innerHTML);
    const supraTitle = await document.querySelector('.supra-title').textContent;
    const title = await document.querySelector('.title').textContent;
    const paragraphEls = await document.querySelectorAll('.paragraph');
    const paragraphs = [];
    paragraphEls.forEach((value) => {
        if(value.textContent){
            paragraphs.push(value.textContent);
        }
    })
    // console.log(paragraphs);

    const result = {
        title: supraTitle,
        description: title,
        content: paragraphs
    }

    return result;

};

laVanguardiaSeeker(url);

export default laVanguardiaSeeker;
