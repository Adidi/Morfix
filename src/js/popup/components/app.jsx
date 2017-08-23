import React from 'react';
import SearchBox from './search-box';
import TableResults from './table-results';
import fetchData from '../../utils/morfix';
import debounce from 'lodash/debounce';
import { MORFIX_URL }  from '../../consts/app';
import { getSelection } from '../../utils/dom';
import { getHistory, addToHistory, clearHistory, getSettings } from '../../utils/storage';
import { getDefaultSettings } from '../../utils/app';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            searchText: '',
            loading: false,
            error: false,
            direction: 'rtl',
            items: [],
            suggestions: [],
            directionSuggestions: 'rtl',
            history: [],
            settings: getDefaultSettings()
        };
        this.requestDebounce = debounce(this.request, 500);
    }

    async componentDidMount() {
        try{
            const [ searchText, history, settings ] = await Promise.all([getSelection(), getHistory(), getSettings()]);
            this.setState({searchText, history, settings}, () => this.request());
        }
        catch(ex){
            throw ex;
        }
    }

    async request() {
        const { searchText } = this.state;

        if (searchText.trim()) {
            this.setState({loading: true});

            try{
                const data = await fetchData(searchText);
                this.setState({
                    loading: false,
                    items: data.items,
                    suggestions: data.suggestions,
                    direction: data.direction,
                    directionSuggestions: data.directionSuggestions
                });
                this.addToHistory();
            }
            catch(ex){
                if (ex.message !== 'abort') {
                    this.setState({loading: false, error: true});
                    throw ex;
                }
            }

        }
        else {
            this.setState({items: [], suggestions: []});
        }
    }

    onChangeSearch(value, focus = false) {
        let loading = !!value.trim();
        this.setState({searchText: value, loading, items: [], suggestions: []});
        this.search();
        if (focus) {
            let el = this.searchBoxComp && this.searchBoxComp.searchInput;
            if(el){
                el.focus();
            }
        }
    }

    search() {
        //debounced in constructor
        this.requestDebounce();
    }

    async addToHistory(){
        const { searchText } = this.state;

        try{
            const history = await addToHistory(searchText);
            this.setState({ history });
        }
        catch(ex){

        }
    }

    clearHistory(){
        //clear from storage
        clearHistory();
        //clear from local state
        this.setState({history: []});
    }

    render() {
        const { searchText,
            items,
            suggestions,
            direction,
            directionSuggestions,
            loading,
            history,
            settings
        } = this.state,
            { history:settingsHistory } = settings;

        let linkFooter = searchText.trim() ?
            <div className="footer-link"><a href={MORFIX_URL + searchText} target="_blank"><img
                src="/icons/icon16.png" alt=""/>&nbsp;Morfix</a></div> : '';

        return (
            <div className="morfix">
                <SearchBox
                    ref={r => this.searchBoxComp = r}
                    onChangeSearch={this.onChangeSearch.bind(this)}
                    searchText={searchText}
                />
                <TableResults
                    items={items}
                    suggestions={suggestions}
                    onChangeSearch={this.onChangeSearch.bind(this)}
                    direction={direction}
                    directionSuggestions={directionSuggestions}
                    loading={loading}
                    searchText={searchText}
                    history={history}
                    clearHistory={this.clearHistory.bind(this)}
                    showHistory={!!history.length && settingsHistory.enabled}
                />
                {linkFooter}
                <div className="settings-link"><img src="icons/settings.png" alt="" /><a href="settings.html" target="_blank">Settings</a></div>
            </div>
        );
    }
}

export default App;