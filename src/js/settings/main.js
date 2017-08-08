
const defaultSettings = {
    history: {
        enabled: false,
        itemsCount: 20
    },
    balloon: {
        enabled: false,
        position: 'topLeft'
    }
};

function init(){
    getStorage('settings').then( data => {
        let settings = data.settings;
        if(!settings){
            settings = defaultSettings;
        }

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

        const saveSettings = () => {
            setStorage({settings});
        };

        renderChkHistory();


        chkSaveHistory.addEventListener('click', (e) => {
            history.enabled = e.target.checked;
            if(!history.enabled){
                //clear the history
                setStorage({history: []});
            }
            renderChkHistory();
            saveSettings();
        });

        selectHistoryItems.addEventListener('change', (e) => {
            const value = selectHistoryItems.options[selectHistoryItems.selectedIndex].value;
            history.itemsCount = Number(value);
            saveSettings();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});