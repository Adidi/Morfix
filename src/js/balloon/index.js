import '../../scss/balloon.scss';
import { isLegalWord } from '../utils/app';
import { getStructure, getLoader, getContent } from './html';
import { getSettings } from '../utils/storage';

const BALLOON_ELEMENT_ID = 'adidiMorfixChromeExtensionBalloon';

let balloonDOM = document.getElementById(BALLOON_ELEMENT_ID),
    timeoutId,
    settings;

if(!balloonDOM){
    balloonDOM = document.createElement('div');
    balloonDOM.id = BALLOON_ELEMENT_ID;
    balloonDOM.innerHTML = getStructure();

    balloonDOM.classList.add('topRight');

    const x = balloonDOM.querySelector('div.adidi-mceb-x-box');
    x.addEventListener('click', e => {
        e.stopPropagation();
        closeBalloon();
    });

    document.body.appendChild(balloonDOM);
}

const title = balloonDOM.querySelector('div.adidi-mceb-title-box .t'),
    content = balloonDOM.querySelector('div.adidi-mceb-content');

document.addEventListener('click',  async () => {
    settings = await getSettings();
    const { balloon } = settings,
        selection = window.getSelection().toString().trim(),
        { enabled, position } = balloon;
    if(!enabled || !isLegalWord(selection)){
        return;
    }

    balloonDOM.classList.remove('topRight','topLeft','bottomLeft','bottomRight');
    balloonDOM.classList.add(position);

    clearTimeout(timeoutId);

    title.innerHTML = `"${selection}"`;
    content.innerHTML = getLoader();

    openBalloon();
    //send to background page for http from https use (morfix is always http)
    chrome.runtime.sendMessage({ action: 'morfix', query: selection }, data => {
        content.innerHTML = getContent(data);
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

        timeoutCloseBalloon();
    });
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

const openBalloon = () => balloonDOM.classList.add('open');
const closeBalloon = () => balloonDOM.classList.remove('open');


