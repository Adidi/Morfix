
function setStorage(data) {
    return new Promise( (resolve, reject) => {
        chrome.storage.sync.set(data, () => {
            resolve();
        });
    });
}

function getStorage(keys) {
    return new Promise( (resolve, reject) => {
        chrome.storage.sync.get(keys, data => {
            resolve(data);
        });
    });
}