
export const getStructure = () =>
    `<div class="adidi-mceb-img-box"><img src="${chrome.extension.getURL("icons/icon.png")}" /></div>
     <div class="adidi-mceb-x-box"><img src="${chrome.extension.getURL("icons/x.png")}" /></div>
     <div class="adidi-mceb-title-box"><div class="adidi-mceb-t"></div></div>
     <div class="adidi-mceb-content"></div>`;

export const getLoader = () =>
    `<div class="adidi-mceb-loader">
      <div class="adidi-mceb-circle-1" ></div>
      <div class="adidi-mceb-circle-2" ></div>
      <div class="adidi-mceb-circle-3" ></div>
    </div>`;

export const getContent = data => {
    const { direction, items } = data;
    if(!items.length){
        return `<div class="adidi-mceb-nr">- No Results -</div>`;
    }

    const arrElements = items.map( item =>
        `<div class="adidi-mceb-result-item adidi-mceb-${direction}">
            <div class="adidi-mceb-t ${item.viki ? 'adidi-mceb-viki' : ''}">${item.text}</div>
            <div class="adidi-mceb-ww">
                <div class="adidi-mceb-wb">
                    <div class="adidi-mceb-w">${item.word}</div>
                    ${item.soundUrl && `<div class="adidi-mceb-s js-sound" data-sound-url="${item.soundUrl}"><img src="${chrome.extension.getURL("icons/sound.png")}"  /></div>`}
                </div>
                <div class="adidi-mceb-d">${item.diber}</div>
            </div>
        </div>`
    );

    return arrElements.join('');
};