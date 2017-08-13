/**
 * use background script to fetch data from morfix because morfix is in http and from https pages
 * you can't xhr http for security
 * same thing about sound (new york times site blocks call to http sound :))
 * register also global events to communicate between page and popup
 */
import fetchData from '../utils/morfix';
import { playSound } from '../utils/dom';
import { MORFIX_URL } from '../consts/app';
import { openTab } from '../utils/tabs';

let selectedText = '';
chrome.runtime.onMessage.addListener((request, sender, callback) => {
    const { action } = request;
    switch(action){
        case 'morfix':
            const { query } = request;
            requestMorfix(query, callback);
            break;
        case 'sound':
            const { url } = request;
            playSound(url);
            break;
        case 'setSelectedText':
            const { text } = request;
            selectedText = text;
            break;
        case 'getSelectedText':
            callback(selectedText);
            break;
    }

    return true; //must return true to wait till the request end - otherwise it will return too soon
});

const requestMorfix = async (query, callback) => {
    const data = await fetchData(query);
    callback(data);
};

/**
 * insert the content script on installed cause without it the user will have to make refresh
 * if he chooses the balloon enabled cause the content script is not injected yet.
 */
chrome.runtime.onInstalled.addListener( details => {
    const manifest = chrome.runtime.getManifest(),
        content_script = manifest.content_scripts[0],
        scripts = content_script.js,
        styles = content_script.css;

    const injectIntoTab = tab => {
        scripts.forEach( file => chrome.tabs.executeScript(tab.id, { file }) );
        styles.forEach( file => chrome.tabs.insertCSS(tab.id, { file }) );
    };

    chrome.windows.getAll({
        populate: true
    }, windows => {
        windows.forEach( window => {
            window.tabs.forEach( tab => {
                //skip chrome pages
                if(!tab.url.match(/chrome:\/\//gi) ){
                    injectIntoTab(tab);
                }
            });
        });
    });
});

//selection from the web page:
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const url = MORFIX_URL + info.selectionText;
    openTab(url);
});

chrome.contextMenus.create({
    id: 'adidiMorfixSearch',
    title: 'Translate "%s"',
    contexts:['selection']
});
