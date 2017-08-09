import { getSettings, saveSettings, clearHistory } from '../utils/storage';

import '../../scss/vendor/bootstrap.scss';
import '../../scss/settings.scss';

const init = async () => {
    const settings = await getSettings();
    const chkSaveHistory = document.getElementById('chkSaveHistory'),
        selectHistoryItems = document.getElementById('selectHistoryItems'),
        history = settings.history,
        balloon = settings.balloon;

    chkSaveHistory.checked = history.enabled;
    selectHistoryItems.selectedIndex = Array.from(selectHistoryItems.options)
        .findIndex( opt => Number(opt.value) === history.itemsCount);

    const renderChkHistory = () => {
        if(history.enabled){
            selectHistoryItems.removeAttribute('disabled');
        }
        else{
            selectHistoryItems.setAttribute('disabled','disabled');
        }
    };

    renderChkHistory();


    chkSaveHistory.addEventListener('click', (e) => {
        history.enabled = e.target.checked;
        if(!history.enabled){
            //clear the history
            clearHistory();
        }
        renderChkHistory();
        saveSettings(settings);
    });

    selectHistoryItems.addEventListener('change', (e) => {
        const value = selectHistoryItems.options[selectHistoryItems.selectedIndex].value;
        history.itemsCount = Number(value);
        saveSettings(settings);
    });
};

document.addEventListener('DOMContentLoaded', init);