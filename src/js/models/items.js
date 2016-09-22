
let items,
    suggestions,
    direction,
    directionSuggestions;

function parse(html,dir,dirSuggestions){
  items = [];
  suggestions = [];
  direction = dir;
  directionSuggestions = dirSuggestions;

  let parser = new DOMParser(),
    doc = parser.parseFromString(html, "text/html");

  parseSuggestion(doc);
  parseHebrew(doc);
  parseEnglish(doc);
  parseViki(doc);

  return {items,direction, suggestions, directionSuggestions};
}

function parseSuggestion(doc){
  const elSuggestions = doc.querySelector('div.suggestions');
  if(elSuggestions){
    let english = elSuggestions.querySelector('.english'),
        hebrew = elSuggestions.querySelector('.hebrew'),
        elParent;
    if(english){
      directionSuggestions = 'ltr';
      elParent = english;
    }
    else if(hebrew){
      directionSuggestions = 'rtl';
      elParent = hebrew;
    }

    if(elParent){
      //querySelectorAll returns nodelist - so spread ... convert it to array
      const anchorArr = [...elParent.querySelectorAll('a')];
      if(anchorArr.length){
        suggestions = anchorArr.map( a => a.innerText );
      }
    }
  }

  return suggestions;
}

function parseHebrew(doc){
  let i = 0,
    el;
  while(el = doc.querySelector('div[class*=heWord' + i++ + ']')){
    direction = 'rtl';
    add(
      el.querySelector('div.translation_he').innerText,
      el.querySelector('span.word').innerText,
      el.querySelector('span.diber').innerText
    );
  }
}

function parseEnglish(doc){
  let i = 0,
    el;
  while(el = doc.querySelector('div[id=translate_result' + i++ + ']')){
    direction = 'ltr';
    add(
      el.querySelector('div.default_trans').innerText,
      el.querySelector('span.word').innerText,
      el.querySelector('span.diber').innerText
    );
  }
}

function parseViki(doc){
  let el = doc.getElementById('vikiBrief');
  if(el){
    add(el.innerHTML,'','',true);
  }
}

function add(text,word = '',diber = '',viki = false){
  items.push({text,word,diber,viki});
}

export default parse;