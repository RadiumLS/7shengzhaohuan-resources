import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import * as cheerio from 'cheerio';

const getCardList = async function() {
  const api = 'https://api-static.mihoyo.com/common/blackboard/ys_obc/v1/home/content/list?app_sn=ys_obc&channel_id=231';
  const resp = await axios.get(api);
  const [charCardData, actionCardData] = resp.data.data.list[0].children;
  const charCards = charCardData.list.map(oneCardData => {
    return {
      id: oneCardData.content_id,
      title: oneCardData.title,
      icon: oneCardData.icon,
    };
  });
  const actionCards = actionCardData.list.map(oneCardData => {
    return {
      id: oneCardData.content_id,
      title: oneCardData.title,
      icon: oneCardData.icon,
    };
  });
  return { charCards, actionCards };
};
const getCardDetail = async function() {
  // TODO: 
}

const downloadIcon = async function(url, path) {
  const writer = fs.createWriteStream(path)
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const main = async function() {
  const { charCards, actionCards } = await getCardList();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  for(let i = 0; i < charCards.length; i++) {
    const oneCard = charCards[i];
    await downloadIcon(oneCard.icon, path.resolve(__dirname, './icons', `${oneCard.id}.png`))
  }
  for(let i = 0; i < actionCards.length; i++) {
    const oneCard = actionCards[i];
    await downloadIcon(oneCard.icon, path.resolve(__dirname, './icons', `${oneCard.id}.png`))
  }
}

main();