
let items,
  direction;

function parse(html,dir){
  items = [];
  direction = dir;

  let parser = new DOMParser(),
    doc = parser.parseFromString(html, "text/html");

  parseHebrew(doc);
  parseEnglish(doc);
  parseViki(doc);

  return {items,direction};
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
    add(el.innerText,'','',true);
  }
}

function add(text,word = '',diber = '',viki = false){
  items.push({text,word,diber,viki});
}

export default {parse};