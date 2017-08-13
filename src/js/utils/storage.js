import { getDefaultSettings } from '../utils/app';
import merge from 'lodash/merge';

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
        const { history = [] } = await get('history');
        resolve(history);
    });
};

export const saveHistory = history => set({history});

export const clearHistory = () => saveHistory([]);

export const addToHistory = term => {
    return new Promise( async (resolve, reject) => {
        const [history,settings] = await Promise.all([getHistory(), getSettings()]);

        term = term.trim();
        if(!settings.history.enabled || !term){
            return reject(new Error('error'));
        }

        const index = history.findIndex(item => item === term);
        if(index !== -1){
            history.splice(index, 1);
        }
        else if(history.length >= settings.history.itemsCount){
            //remove last
            history.pop();
        }
        //add to first of the array
        history.unshift(term);
        saveHistory(history);

        resolve(history);
    });
};


export const getSettings = () => {
    return new Promise( async(resolve,reject) => {
        let { settings } = await get('settings');
        settings = merge(getDefaultSettings(), settings);
        resolve(settings);
    });
};

export const saveSettings = settings => set({settings});