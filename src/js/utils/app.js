import cloneDeep from 'lodash/cloneDeep';
import { DEFAULT_SETTINGS, WORD_MAX_LENGTH } from '../consts/app';

export const getDefaultSettings = () => cloneDeep(DEFAULT_SETTINGS);

export const isLegalWord = str => {
    if(!str || typeof(str) !== 'string'){
        return false;
    }
    str = str.trim();
    return str.length <= WORD_MAX_LENGTH;
};