import { DEFAULT_SETTINGS } from '../consts/app';

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

export const getHistory = () => {
    return new Promise( async(resolve,reject) => {
        let { history } = await get('history');
        if(!history){
            history = [];
        }
        resolve(history);
    });
};

export const saveHistory = history => set({history});

export const clearHistory = () => saveHistory([]);

export const getSettings = () => {
    return new Promise( async(resolve,reject) => {
        let { settings } = await get('settings');
        if(!settings){
            settings = DEFAULT_SETTINGS;
        }
        resolve(settings);
    });
};

export const saveSettings = settings => set({settings});