import { executeScript } from './tabs';


export const getSelection = () => {
    return new Promise(async(resolve, reject) => {
        try{
            const selection = await executeScript('window.getSelection().toString();');
            resolve(selection && selection[0] || '');
        }
        catch(ex){
            reject(ex);
        }

    });
};