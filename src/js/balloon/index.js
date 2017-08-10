import '../../scss/balloon.scss';

const getLoader = () => {
    return `<div class="loader">
      <div class="circle-1" ></div>
      <div class="circle-2" ></div>
      <div class="circle-3" ></div>
    </div>`;
};


let root = document.getElementById('morfixChromeExtensionBalloon'),
    title,
    content;
if(!root){
    root = document.createElement("div");
    root.id = 'morfixChromeExtensionBalloon';
    root.innerHTML = `<div class="adidi-mceb-wrapper">
                          <div class="adidi-mceb-img-box"><img src="${chrome.extension.getURL("icons/icon.png")}" /></div>
                          <div class="adidi-mceb-title"></div>
                          <div class="adidi-mceb-content"></div>
                     </div>`;

    title = root.querySelector('div.adidi-mceb-title');
    content = root.querySelector('div.adidi-mceb-content');
    content.innerHTML = getLoader();
    title.innerHTML = 'Search for "java"';
    document.body.appendChild(root);
}

let timeoutId;
const showBalloon = () => {
    root.classList.add('open');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        root.classList.remove('open');
    },5000);
};


document.addEventListener('click',  () => {
    const selection = window.getSelection().toString().trim();
    if(!selection){
        return;
    }

    title.innerHTML = `"${selection}"`;
    showBalloon();

    chrome.runtime.sendMessage({
        action: 'morfix',
        query: selection
    }, (obj) => {
        console.log(obj);
    });

    // chrome.runtime.sendMessage({action: 'morfix', query: selection} , data => {
    //     console.log('data',data);
    // });
    // var selection = window.getSelection().toString();
    //
    // if(selection){
    //     div.innerText = selection;
    //     div.classList.add('open');
    //
    //     clearTimeout(timeoutid);
    //
    //     timeoutid = setTimeout(() => {
    //         div.classList.remove('open');
    //     },10000);
    // }
});