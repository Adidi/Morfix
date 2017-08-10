import cloneDeep from 'lodash/cloneDeep';
import { DEFAULT_SETTINGS } from '../consts/app';

export const getDefaultSettings = () => cloneDeep(DEFAULT_SETTINGS);