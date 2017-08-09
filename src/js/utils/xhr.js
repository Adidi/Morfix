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


export const getData = (query,cancelToken) => {
    const url = MORFIX_URL + query;
    return send(url,{cancelToken});
};