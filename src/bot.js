import { Telegraf } from "telegraf";
import { loadEnvFile } from "process";
import elPaisSeeker from "./seekers/elPaisSeeker.js";
import laVanguardiaSeeker from "./seekers/laVanguardiaSeeker.js";

loadEnvFile('../.env');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('read', async (ctx) => {
    let result = ['This article is not supported yet.'];
    const url = ctx.payload;

    let target = url.split('.com')[0].split('.');
    target = target[target.length - 1];
    target.includes('://') ? target = target.split('://')[1] : target = target;

    switch (target) {
        case 'elpais':
            console.log('El Pais Seeker')
            result = await elPaisSeeker(url);
            // console.log(result)
            break;
        case 'lavanguardia':
            console.log('La Vanguardia Seeker')
            result = await laVanguardiaSeeker(url);
            break;
        default:
            console.log('Default Seeker')
            break;
    }
    
    if (result.length === 1) {
        ctx.reply(result[0]);
    } else {
        ctx.reply(`${result.title}\n\n${result.description}`);
        let resBody = [];
        let resElement = '';
        result.content.forEach((value) => {
            if (resElement.length + value.length < 4096) {
                resElement += value + '\n';
            } else {
                resBody.push(resElement);
                resElement = value + '\n';
            }
        });
        await resBody.forEach((value) => {
            ctx.reply(value);
        });
        ctx.reply(resElement);
    }
    
});



bot.launch();