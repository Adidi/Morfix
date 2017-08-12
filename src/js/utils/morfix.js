import {searchMorfix} from './xhr';

let items,
    suggestions,
    direction,
    directionSuggestions;

const parseSuggestion = doc => {
    const elSuggestions = doc.querySelector('div.suggestions');
    if (elSuggestions) {
        let english = elSuggestions.querySelector('.english'),
            hebrew = elSuggestions.querySelector('.hebrew'),
            elParent;
        if (english) {
            directionSuggestions = 'ltr';
            elParent = english;
        }
        else if (hebrew) {
            directionSuggestions = 'rtl';
            elParent = hebrew;
        }

        if (elParent) {
            //querySelectorAll returns nodelist - so spread ... convert it to array
            const anchorArr = [...elParent.querySelectorAll('a')];
            if (anchorArr.length) {
                suggestions = anchorArr.map(a => a.innerText);
            }
        }
    }

    return suggestions;
};

const parseHebrew = doc => {
    let i = 0,
        el;
    while (el = doc.querySelector('div[class*=heWord' + i++ + ']')) {
        direction = 'rtl';

        let soundUrl = '',
            spanSound = el.querySelector('span.goody'),
            spanSoundHTML = spanSound && spanSound.innerHTML;
        if (spanSoundHTML) {
            const m = spanSoundHTML.match(/(http.*\.mp3)/i);
            if (m) {
                soundUrl = m[1];
            }
        }

        add(
            el.querySelector('div.translation_he').innerText,
            el.querySelector('span.word').innerText,
            el.querySelector('span.diber').innerText,
            false,
            soundUrl
        );
    }
};

const parseEnglish = doc => {
    let i = 0,
        el;
    while (el = doc.querySelector('div[id=translate_result' + i++ + ']')) {
        direction = 'ltr';
        add(
            el.querySelector('div.default_trans').innerText,
            el.querySelector('span.word').innerText,
            el.querySelector('span.diber').innerText
        );
    }
};

const parseViki = doc => {
    let el = doc.getElementById('vikiBrief');
    if (el) {
        add(el.innerHTML, '', '', true);
    }
};

const add = (text, word = '', diber = '', viki = false, soundUrl = '') => {
    items.push({text, word, diber, viki, soundUrl});
};

const parse = html => {
    items = [];
    suggestions = [];
    direction = 'rtl';
    directionSuggestions = 'rtl';

    let parser = new DOMParser(),
        doc = parser.parseFromString(html, "text/html");

    parseSuggestion(doc);
    parseHebrew(doc);
    parseEnglish(doc);
    parseViki(doc);

    return {items, direction, suggestions, directionSuggestions};
};


const fetchData = query => {
    return new Promise( async (resolve, reject) => {
        try{
            const result = await searchMorfix(query),
                data = parse(result.data);
            resolve(data);
        }
        catch(ex){
            reject(ex);
        }
    });
};

export default fetchData;