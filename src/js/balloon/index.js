import '../../scss/balloon.scss';
import { isLegalWord } from '../utils/app';
import { getStructure, getLoader, getContent } from './html';
import { getSettings } from '../utils/storage';

const BALLOON_ELEMENT_ID = 'adidiMorfixChromeExtensionBalloon';

let balloonDOM = document.getElementById(BALLOON_ELEMENT_ID),
    timeoutId,
    settings;

//if exists remove it to start fresh - in case of re-injecting script
if(balloonDOM){
    balloonDOM.parentNode.removeChild(balloonDOM);
}

balloonDOM = document.createElement('div');
balloonDOM.id = BALLOON_ELEMENT_ID;
balloonDOM.innerHTML = getStructure();

balloonDOM.classList.add('adidi-mceb-topRight');

const x = balloonDOM.querySelector('div.adidi-mceb-x-box');
x.addEventListener('click', e => {
    e.stopPropagation();
    closeBalloon();
});

//stop propagation in links (now - only footer)
const links = balloonDOM.querySelectorAll('a');
links.forEach( link => {
    link.addEventListener('click', e => {
        e.stopPropagation();
    });
});


document.body.appendChild(balloonDOM);

const title = balloonDOM.querySelector('div.adidi-mceb-title-box .adidi-mceb-t'),
    content = balloonDOM.querySelector('div.adidi-mceb-content');

document.addEventListener('click',  async () => {
    settings = await getSettings();
    const { balloon } = settings,
        selection = window.getSelection().toString().trim(),
        { enabled, position } = balloon;

    //always send the selected text to the backgorund-page cause this code runs on all frames
    //and the popup can't get the selected text from iframe so it takes it from the backgroud page
    chrome.runtime.sendMessage({ action: 'setSelectedText', text: selection });

    if(!enabled || !isLegalWord(selection)){
        return;
    }

    balloonDOM.classList.remove('adidi-mceb-topRight','adidi-mceb-topLeft','adidi-mceb-bottomLeft','adidi-mceb-bottomRight','adidi-mceb-open');
    balloonDOM.classList.add(`adidi-mceb-${position}`);

    //make set timeout cause otherwise it will jump(not animate) when switching position in the settings
    setTimeout(() => {
        title.innerHTML = `"${selection}"`;
        content.innerHTML = getLoader();

        openBalloon();
        //send to background page for http from https use (morfix is always http)
        chrome.runtime.sendMessage({ action: 'morfix', query: selection }, data => {
            content.innerHTML = getContent(data);
            attachEvents();
            timeoutCloseBalloon();
        });
    },1);
});

const timeoutCloseBalloon = () => {
    clearTimeout(timeoutId);

    //settings will always be exists cause i fetch them on click !
    const { balloon } = settings,
        { timeOpen } = balloon;
    if(timeOpen === -1){
        return;
    }

    timeoutId = setTimeout(() => {
        closeBalloon();
    },timeOpen*1000);
};

const openBalloon = () => {
    clearTimeout(timeoutId);
    balloonDOM.classList.add('adidi-mceb-open');
};

const closeBalloon = () => balloonDOM.classList.remove('adidi-mceb-open');

const attachEvents = () => {
    //attach sound events
    const sounds = [...content.querySelectorAll('.js-sound')];
    sounds.forEach( el => {
        const soundUrl = el.getAttribute('data-sound-url');
        el.addEventListener('click', e => {
            e.stopPropagation();
            //send sound to bg for https -> http
            chrome.runtime.sendMessage({ action: 'sound', url: soundUrl });
            //delay the close if press on sound
            timeoutCloseBalloon();
        });
    });
};


