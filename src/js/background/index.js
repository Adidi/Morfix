import { getData } from '../utils/xhr';
import parse from '../utils/morfix';

chrome.runtime.onMessage.addListener((request, sender, callback) => {
    if(request.action === 'morfix'){
        (async () => {
            const result = await getData(request.query);
            const data = parse(result.data);
            callback(data);
        })();
        return true; //must return true to wait till the request end - otherwise it will return too soon
    }
});