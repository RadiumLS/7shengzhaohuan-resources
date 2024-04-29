import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import * as cheerio from 'cheerio';

const cardNameList = [ null, "甘雨", "迪奥娜", "凯亚", "重云", "神里绫华", "优菈", "申鹤", "七七", "芭芭拉", "行秋", "莫娜", "达达利亚", "珊瑚宫心海", "神里绫人", "坎蒂丝", "妮露", "迪卢克", "香菱", "班尼特", "安柏", "宵宫", "可莉", "胡桃", "烟绯", "迪希雅", "菲谢尔", "雷泽", "刻晴", "赛诺", "北斗", "九条裟罗", "雷电将军", "八重神子", "丽莎", "多莉", "砂糖", "琴", "温迪", "魈", "枫原万叶", "流浪者", "凝光", "诺艾尔", "钟离", "阿贝多", "荒泷一斗", "柯莱", "提纳里", "纳西妲", "瑶瑶", "白术", "愚人众·冰萤术士", "纯水精灵·洛蒂娅", "愚人众·藏镜仕女", "愚人众·火之债务处理人", "深渊咏者·渊火", "无相之雷", "魔偶剑鬼", "丘丘岩盔王", "翠翎恐蕈", "唯此一心", "猫爪冰摇", "冷血之剑", "吐纳真定", "寒天宣命祝词", "战欲涌现", "忘玄", "起死回骸", "光辉的季节", "重帘留香", "沉没的预言", "深渊之灾·凝水盛放", "匣中玉栉", "镜华风姿", "衍溢的汐潮", "星天的花雨", "流火焦灼", "交叉火力", "冒险憧憬", "一触即发", "长野原龙势流星群", "砰砰礼物", "血之灶火", "最终解释权", "崇诚之真", "噬星魔鸦", "觉醒", "抵天雷罚", "落羽的裁择", "霹雳连霄", "我界", "万千的愿望", "神篱之御荫", "脉冲的魔女", "酌盈剂虚", "混元熵增论", "蒲公英的国土", "绪风之拥", "降魔·护法夜叉", "风物之诗咏", "梦迹一风", "储之千日，用之一刻", "支援就交给我吧", "炊金馔玉", "神性之陨", "荒泷第一", "飞叶迴斜", "眼识殊明", "心识蕴藏之种", "慈惠仁心", "在地为化", "冰萤寒光", "百川奔流", "镜锢之笼", "悉数讨回", "烬火重燃", "汲能棱晶", "机巧神通", "重铸：岩盔", "孢子增殖", "魔导绪论", "祭礼残章", "天空之卷", "千夜浮梦", "盈满之实", "鸦羽弓", "祭礼弓", "天空之翼", "阿莫斯之弓", "终末嗟叹之诗", "王下近侍", "白铁大剑", "祭礼大剑", "狼的末路", "天空之傲", "钟剑", "白缨枪", "千岩长枪", "天空之脊", "贯虹之槊", "薙草之稻光", "贯月矢", "旅行剑", "祭礼剑", "风鹰剑", "天空之刃", "西风剑", "冒险家头带", "幸运儿银冠", "游医的方巾", "赌徒的耳环", "教官的帽子", "流放者头冠", "华饰之兜", "绝缘之旗印", "将帅兜鍪", "千岩牢固", "虺雷之姿", "辰砂往生录", "无常之面", "追忆之注连", "海祇之冠", "海染砗磲", "沙王的投影", "破冰踏雪的回音", "冰风迷途的勇士", "酒渍船帽", "沉沦之心", "焦灼的魔女帽", "炽烈的炎之魔女", "唤雷的头冠", "如雷的盛怒", "翠绿的猎人之冠", "翠绿之影", "不动玄石之相", "悠古的磐岩", "月桂的宝冠", "深林的记忆", "璃月港口", "骑士团图书馆", "群玉阁", "晨曦酒庄", "望舒客栈", "西风大教堂", "天守阁", "鸣神大社", "珊瑚宫", "须弥城", "桓那兰那", "镇守之森", "黄金屋", "化城郭", "风龙废墟", "派蒙", "凯瑟琳", "蒂玛乌斯", "瓦格纳", "卯师傅", "阿圆", "提米", "立本", "常九爷", "艾琳", "田铁嘴", "刘苏", "花散里", "鲸井小弟", "旭东", "迪娜泽黛", "拉娜", "老章", "塞塔蕾", "弥生七月", "参量质变仪", "便携营养袋", "红羽团扇", "寻宝仙灵", "旧时庭园", "磐岩盟契", "愉舞欢游", "自由的新风", "万家灶火", "元素共鸣：交织之冰", "元素共鸣：粉碎之冰", "元素共鸣：交织之水", "元素共鸣：愈疗之水", "元素共鸣：交织之火", "元素共鸣：热诚之火", "元素共鸣：交织之雷", "元素共鸣：强能之雷", "元素共鸣：交织之风", "元素共鸣：迅捷之风", "元素共鸣：交织之岩", "元素共鸣：坚定之岩", "元素共鸣：交织之草", "元素共鸣：蔓生之草", "风与自由", "岩与契约", "雷与永恒", "草与智慧", "最好的伙伴！", "换班时间", "一掷乾坤", "运筹帷幄", "本大爷还没有输！", "交给我吧！", "鹤归之时", "星天之兆", "白垩之术", "诸武精通", "神宝迁宫祝词", "快快缝补术", "送你一程", "护法之誓", "深渊的呼唤", "愚人众的阴谋", "下落斩", "重攻击", "温妮莎传奇", "永远的友谊", "大梦的曲调", "藏锋何处", "拳力斗技！", "琴音之诗", "绝云锅巴", "仙跳墙", "莲花酥", "北地烟熏鸡", "甜甜花酿鸡", "蒙德土豆饼", "烤蘑菇披萨", "兽肉薄荷卷", "提瓦特煎蛋", "刺身拼盘", "唐杜尔烤鸡", "黄油蟹蟹" ];
/**
 * 4.3版本新卡
 */
const newCardName_4_3 = [
  "「女士」", // 277
  "若陀龙王",
  "莱依拉",
  "夜兰",
  "林尼",
  "琳妮特",
  "五郎",
  "艾尔海森",
  "镀金旅团·炽沙叙事人", // 285
  "雷音权现",
  "特瓦林",
  "归芒携信",
  "猜先有方",
  "完场喝彩", // 290
  "如影流露的冷刃",
  "犬奔·疾如风",
  "正理",
  "苦痛奉还",
  "魔蝎烈祸", // 295
  "悲号回唱",
  "毁裂风涡",
  "晦朔千引",
  "四风原典",
  "图莱杜拉的回忆", // 300
  "苇海信标",
  "和璞鸢",
  "裁叶萃光",
  "饰金之梦",
  "浮溯之珏",
  "来歆余响",
  "灵光明烁之心", // 307
  "花海甘露之光",
  "湖中垂柳",
  "欧庇克莱歌剧院", // 310
  "玛梅赫", // 311
  "化种匣",
  "留念镜",
  "裁定之时", // 314
  "野猪公主",
  "坍陷与契机",
  "浮烁的四叶印",
  "炸鱼薯条", // 318
]
/**
 * 4.4版本新卡
 */
const newCardName_4_4 = [
  "托马", // 319
  "早柚",
  "无相之冰", // 321
  "千年珍珠骏麟", // 322
  "僚佐的才巧",
  "偷懒的新方法",
  "严霜棱晶", // 325
  "明珠固化",
  "原木刀",
  "老兵的容颜",
  "婕德",
  "西尔弗和迈勒斯",
  "机关铸成之链",
  "净觉花", // 332
  "松茸酿肉卷", // 333
]
cardNameList.push(...newCardName_4_3);
cardNameList.push(...newCardName_4_4);
const newCardName_4_56 = [
  "夏洛蒂", // 334
  "那维莱特", // 335
  "绮良良", // 336
  "愚人众·雷萤术士", // 337
  "以有趣相关为要义", // 338
  "古海孑遗的权柄", // 339
  "沿途百景会心", // 340
  "雷萤浮闪", // 341
  "万世流涌大典", // 342
  "黄金剧团的奖赏", // 343
  "梅洛彼得堡", // 344
  "流明石触媒", // 345
  "抗争之日·碎梦之时", // 346
  "可控性去危害化式定向爆破", // 347

  "久岐忍", // 348
  "珐露珊", // 349
  "深渊使徒·激流", // 350
  "铁甲熔火帝皇", // 351
  "妙道合真", // 352
  "暗流涌动", // 353
  "熔火铁甲", // 354
  "公义的酬报", // 355
  "紫晶的花冠", // 356
  "清籁岛", // 357
  "太郎丸", // 358
  "白手套和渔夫", // 359
  "海中寻宝", // 360
  "缤纷马卡龙", // 361
  "割舍软弱之心", // 362

];
cardNameList.push(...newCardName_4_56);


const cardNameIdMap = {};
for(let i = 1; i < cardNameList.length; i++) {
  cardNameIdMap[cardNameList[i]] = { id: i, name: cardNameList[i] };
}
// XXX: 接口返回的有个名字是“无常之面 ”，多了一个空格，这里做个映射
cardNameIdMap['无常之面 '] = cardNameIdMap['无常之面']
const elementMap = {
  '301': 'cryo', // 冰
  '302': 'hydro', // 水
  '303': 'pryo', // 火
  '304': 'electro', // 雷
  '305': 'geo', // 岩
  '306': 'dendro', // 草
  '307': 'anemo', // 风
}
// 卡牌类型, 是摸索出来的, 对应card_tag的第一项
const actionCardTypeMap = {
  '3': 'weapon', // 武器
  '4': 'equipment', // 圣遗物
  '6': 'talent', // 天赋
  '7': 'arcane', // 秘传牌
  '101': 'food', // 食物 料理
  '103': 'companion', // 伙伴
  '104': 'location', // 场地
  '102': 'item', // 道具
  '105': 'resonance', // 共鸣牌, 包括骰子牌和共鸣牌
};
// 当card_tag第一项为3时, 第二项为武器类型
const weaponTypeMap = {
  '201': 'sword', // 单手剑
  '204': 'bow', // 弓
  '203': 'claymore', // 双手剑
  '202': 'catalyst', // 法器
  '205': 'Polearm', // 长柄武器
};
const costTypeMap = {
  '1': 'energy',
  '13': 'pryo', // 火
  '12': 'hydro', // 水
  '15': 'geo', // 岩
  '14': 'electro', // 雷
  '16': 'dendro', // 草
  '11': 'cryo', // 冰
  '17': 'anemo', // 风
  '3': 'matching',
  '10': 'unaligned',
  // 但是秘传牌被视作有一个额外cost, 但是工程中暂时预计通过其他方式处理
  '6': 'arcane', // 秘传
}

/**
 * 米游社卡片图鉴页面拿卡片列表
 * @deprecated 
 */
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
const getCharCardJSON = async function() {
  const charCards = [];
  const api = 'https://api-takumi.mihoyo.com/event/cardsquare/roles'; 
  // const actionApi = 'https://api-takumi.mihoyo.com/event/cardsquare/actions?lang=zh-cn';
  //const actionResp = await axios.post(actionApi, {});
  const resp = await axios.get(api);
  const charCardData = resp.data.data.roles;
  for(let i = 0; i < charCardData.length; i++) {
    const oneData = charCardData[i];
    // XXX: 没有武器类型
    charCards.push({
      id: cardNameIdMap[oneData.basic.name]?.id,
      name: oneData.basic.name,
      itemId: oneData.basic.item_id,
      icon: oneData.basic.icon,
      iconSmall: oneData.basic.icon_small,
      wiki: oneData.basic.wiki_url,
      health: oneData.hp,
      energy: oneData.skill_cost,
      element: elementMap[oneData.element]
    });
  }
  return charCards;
}
const getActionCardJSON = async function(roleIds = []) {
  const actionCards = [];
  const api = 'https://api-takumi.mihoyo.com/event/cardsquare/actions'; 
  const resp = await axios.post(api, {
    role_ids: roleIds,
  });
  const actionCardData = resp.data.data.actions;
  for(let i = 0; i < actionCardData.length; i++) {
    const oneData = actionCardData[i];
    const oneCard = {
      id: cardNameIdMap[oneData.basic.name]?.id,
      name: oneData.basic.name,
      itemId: oneData.basic.item_id,
      icon: oneData.basic.icon,
      iconSmall: oneData.basic.icon_small,
      wiki: oneData.basic.wiki_url,
      type: actionCardTypeMap[oneData.card_tag[0]] || 'event',
      weaponType: oneData.card_tag[0] === '3' ? (weaponTypeMap[oneData.card_tag[1]] || 'other') : undefined,
      // energy: oneData.energy_cost,
      cost: [],
    }
    if(oneData.skill_element) {
      oneCard.cost.push({
        type: costTypeMap[oneData.skill_element],
        cost: oneData.skill_value,
      });
    }
    if(oneData.skill_element2) {
      const costType = costTypeMap[oneData.skill_element2];
      if(costType !== 'arcane') {
        oneCard.cost.push({
          type: costTypeMap[oneData.skill_element2],
          cost: oneData.skill_value2,
        });
      }
    }
    actionCards.push(oneCard);
  }
  return actionCards;
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
const downloadAllDiceIcon = async function() {
  const diceUrlMap = {
    // 火
    pryo: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Pryo_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/1/13/Icon_TCG_Pyro.png"
    },
    // 水
    hydro: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Hydro_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/9/98/Icon_TCG_Hydro.png"
    },
    // 岩
    geo: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Geo_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/b/b2/Icon_TCG_Geo.png"
    },
    // 雷
    electro: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Electro_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/7/7f/Icon_TCG_Electro.png"
    },
    // 草
    dendro: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Dendro_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/d/dc/Icon_TCG_Dendro.png"
    },
    // 冰
    cryo: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/3/36/Genius_Invokation_TCG_Cryo_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/a/a6/Icon_TCG_Cryo.png"
    },
    // 风
    anemo: {
      // bg: "https://static.wikia.nocookie.net/gensin-impact/images/e/e4/Genius_Invokation_TCG_Anemo_Cost.png",
      el: "https://static.wikia.nocookie.net/gensin-impact/images/d/d3/Icon_TCG_Anemo.png"
    },
    // 同色骰
    matching: {
      bg: "https://static.wikia.nocookie.net/gensin-impact/images/b/b1/Genius_Invokation_TCG_Matching_Cost.png",
    },
    // 无颜色要求骰
    unaligned: {
      bg: "https://static.wikia.nocookie.net/gensin-impact/images/2/21/Genius_Invokation_TCG_Unaligned_Cost.png",
    },
    omni: {
      bg: "https://static.wikia.nocookie.net/gensin-impact/images/5/56/Icon_TCG_Omni_Element.png"
    }
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  for(const [key, obj] of Object.entries(diceUrlMap)) {
    if(obj.bg) {
      await downloadIcon(obj.bg, path.resolve(__dirname, './dices', `${key}_bg.png`))
    }
    if(obj.el) {
      await downloadIcon(obj.el, path.resolve(__dirname, './dices', `${key}_el.png`))
    }
  }
}

const main = async function() {
  // const { charCards, actionCards } = await getCardList();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const charCard = await getCharCardJSON();
  const actionCard = await getActionCardJSON(charCard.map(oneCard => oneCard.itemId));
  const charCardFd = fs.openSync(path.resolve(__dirname, './icons', `char_card.json`), 'a');
  const actionCardFd = fs.openSync(path.resolve(__dirname, './icons', `action_card.json`), 'a');
  fs.writeFileSync(charCardFd,JSON.stringify(charCard));
  fs.writeFileSync(actionCardFd,JSON.stringify(actionCard));

  for(let i = 0; i < charCard.length; i++) {
    const oneCard = charCard[i];
    await downloadIcon(oneCard.icon, path.resolve(__dirname, './icons', `${oneCard.id}.png`))
    await downloadIcon(oneCard.iconSmall, path.resolve(__dirname, './icons', `${oneCard.id}_small.png`))
  }
  for(let i = 0; i < actionCard.length; i++) {
    const oneCard = actionCard[i];
    await downloadIcon(oneCard.icon, path.resolve(__dirname, './icons', `${oneCard.id}.png`))
  }
}

main();