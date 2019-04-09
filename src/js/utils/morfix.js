import {
    searchMorfix
} from './xhr';

const HEB = 'he';
const ENG = 'en';
const RTL = 'rtl';
const LTR = 'ltr';

let items;
let suggestions;
let direction;
let directionSuggestions;

const parseLang = (doc, from) => {
    const to = from === ENG ? HEB : ENG;
    const strId = `${from}To${to}`;
    const elContents = [...doc.querySelectorAll(`.Translation_content_${strId}`)];
    elContents.forEach(elContent => {
        const translate = elContent.querySelector('.normal_translation_div').innerText;
        const word = elContent.querySelector(`.Translation_spTop_${strId}`).innerText;
        const diber = elContent.querySelector(`.Translation_sp2Top_${strId}`).innerText;

        // get sound url 
        let soundUrl = ''
        const elSound = elContent.querySelector(`.Translation_imgTop_${strId}`);
        const html = elSound && elSound.outerHTML;
        if (html) {
            const m = html.match(/http.*GetSoundByMelingoID[^\'\"]+/gi);
            if (m) {
                soundUrl = m[0];
            }
        }

        add(translate, word, diber, false, soundUrl);
        
    });

    if (elContents.length) {
        direction = from === ENG ? RTL : LTR;
    }

    // check viki
    const viki = doc.querySelector(`.wiki_content_${from}`);
    if (viki) {
        const html = viki.querySelector(`.translation_bottom_container`).innerHTML;
        add(html, '', '', true);
    }

    // check suggestions
    const elSuggestions = doc.querySelector(`.Suggestions_content_${strId}`);
    if (elSuggestions) {
        directionSuggestions = from === ENG ? LTR : RTL;
        const lis = [...elSuggestions.querySelectorAll('ul > li')];
        suggestions = lis.map(li => li.innerText.replace(',', ''));
    }
}

const add = (text, word = '', diber = '', viki = false, soundUrl = '') => {
    items.push({
        text,
        word,
        diber,
        viki,
        soundUrl
    });
};

const parse = html => {
    items = [];
    suggestions = [];
    direction = RTL;
    directionSuggestions = RTL;

    let parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    parseLang(doc, ENG);
    parseLang(doc, HEB);

    return {
        items,
        direction,
        suggestions,
        directionSuggestions
    };
};


const fetchData = query => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await searchMorfix(query);
            const data = parse(result.data);
            resolve(data);
        } catch (ex) {
            reject(ex);
        }
    });
};

export default fetchData;