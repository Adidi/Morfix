import { getSettings, saveSettings, clearHistory } from '../utils/storage';
import { DEFAULT_SETTINGS } from '../consts/app';

import '../../scss/vendor/bootstrap.scss';
import '../../scss/settings.scss';

let settings,
    chkSaveHistory,
    selectHistoryItems,
    chkShowBalloon,
    selectBalloonPosition,
    btnSave,
    btnReset,
    success;

const render = () => {
    const { history, balloon } = settings;

    chkSaveHistory.checked = history.enabled;
    selectHistoryItems.selectedIndex = Array.from(selectHistoryItems.options)
        .findIndex( opt => Number(opt.value) === history.itemsCount);

    if(history.enabled){
        selectHistoryItems.removeAttribute('disabled');
    }
    else{
        selectHistoryItems.setAttribute('disabled','disabled');
    }

    chkShowBalloon.checked = balloon.enabled;
    selectBalloonPosition.selectedIndex = Array.from(selectBalloonPosition.options)
        .findIndex( opt => opt.value === balloon.position);


    if(balloon.enabled){
        selectBalloonPosition.removeAttribute('disabled');
    }
    else{
        selectBalloonPosition.setAttribute('disabled','disabled');
    }
};

let timeoutId = null;
const showSuccess = () => {
    success.classList.add('show');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
        success.classList.remove('show');
    },3000);
};

const init = async () => {
    settings = await getSettings();
    chkSaveHistory = document.getElementById('chkSaveHistory');
    selectHistoryItems = document.getElementById('selectHistoryItems');
    chkShowBalloon = document.getElementById('chkShowBalloon');
    selectBalloonPosition = document.getElementById('selectBalloonPosition');
    btnSave = document.getElementById('btnSave');
    btnReset = document.getElementById('btnReset');
    success = document.getElementById('success');

    const { history, balloon } = settings;

    chkSaveHistory.addEventListener('click', e => {
        const { checked } = e.target;
        if(checked){
            selectHistoryItems.removeAttribute('disabled');
        }
        else{
            selectHistoryItems.setAttribute('disabled','disabled');
        }
    });

    chkShowBalloon.addEventListener('click', e => {
        const { checked } = e.target;
        if(checked){
            selectBalloonPosition.removeAttribute('disabled');
        }
        else{
            selectBalloonPosition.setAttribute('disabled','disabled');
        }
    });

    btnSave.addEventListener('click', e => {
        history.enabled = chkSaveHistory.checked;
        history.itemsCount = Number(selectHistoryItems.options[selectHistoryItems.selectedIndex].value);
        balloon.enabled = chkShowBalloon.checked;
        balloon.position = selectBalloonPosition.options[selectBalloonPosition.selectedIndex].value;
        if(!history.enabled){
            clearHistory();
        }

        saveSettings(settings);
        showSuccess();
    });

    btnReset.addEventListener('click', e => {
        settings = DEFAULT_SETTINGS;
        render();
        saveSettings(settings);
        showSuccess();
    });

    render();
};

document.addEventListener('DOMContentLoaded', init);