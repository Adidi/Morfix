import { executeScript } from './tabs';


export const getSelection = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const selection = await executeScript('window.getSelection().toString();');
            if(selection[0]){
                resolve(selection[0]);
            }
            else{
                chrome.runtime.sendMessage({ action: 'getSelectedText' }, selection => {
                    resolve(selection);
                });
            }
        }
        catch(ex){
            reject(ex);
        }

    });
};

export const playSound = url => {
    new Audio(url).play();
};