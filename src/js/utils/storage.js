
export const set = data => {
    return new Promise( (resolve,reject) => {
        chrome.storage.sync.set(data, () => {
            resolve();
        });
    });
};

export const get = keys => {
    return new Promise( (resolve,reject) => {
        chrome.storage.sync.get(keys, data => {
            resolve(data);
        });
    });
};