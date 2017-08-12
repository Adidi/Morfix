
export const getStructure = () =>
    `<div class="adidi-mceb-wrapper">
          <div class="adidi-mceb-img-box"><img src="${chrome.extension.getURL("icons/icon.png")}" /></div>
          <div class="adidi-mceb-x-box"><img src="${chrome.extension.getURL("icons/x.png")}" /></div>
          <div class="adidi-mceb-title-box"><div class="t"></div></div>
          <div class="adidi-mceb-content"></div>
     </div>`;

export const getLoader = () =>
    `<div class="adidi-mceb-loader">
      <div class="circle-1" ></div>
      <div class="circle-2" ></div>
      <div class="circle-3" ></div>
    </div>`;

export const getContent = data => {
    const { direction, items } = data;
    if(!items.length){
        return `<div class="nr">- No Results -</div>`;
    }

    const arrElements = items.map( item => {
            return `<div class="adidi-mceb-result-item ${direction}">
                        <div class="t ${item.viki ? 'viki' : ''}">${item.text}</div>
                        <div class="ww">
                            <div class="wb">
                                <div class="w">${item.word}</div>
                                ${item.soundUrl && `<div class="s js-sound" data-sound-url="${item.soundUrl}"><img src="${chrome.extension.getURL("icons/sound.png")}"  /></div>`}
                            </div>
                            <div class="d">${item.diber}</div>
                        </div>
                    </div>`;
        });

    return arrElements.join('');
};