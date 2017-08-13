
export const openTab = (url, active = true) => {
    url && chrome.tabs.create({url: url, active: active});
};

export const executeScript = (code) => {
    return new Promise((resolve,reject) => {
        chrome.tabs.executeScript({code},result => resolve(result) );
    });
};