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

export const getSettings = () => {
    return new Promise( async(resolve,reject) => {
        let { settings } = await get('settings');
        settings = merge(getDefaultSettings(), settings);
        resolve(settings);
    });
};

export const saveSettings = settings => set({settings});