import axios from 'axios';
import merge from 'lodash/merge';
import { MORFIX_URL }  from '../consts/app';

const send = (url, options) => {
    let base = {
        url: url,
        method: 'get'
    };

    options = merge(base,options);
    return axios(options);
};

let cancelRequest = null;

export const searchMorfix = query => {
    cancelRequest && cancelRequest.cancel('abort');
    cancelRequest = axios.CancelToken.source();

    const url = MORFIX_URL + query;
    return send(url, { cancelToken: cancelRequest.token });
};