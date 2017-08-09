import React from 'react';
import SearchBox from './search-box';
import TableResults from './table-results';
import parse from '../../utils/morfix';
import debounce from 'lodash/debounce';
import { getData } from '../../utils/xhr';
import { MORFIX_URL }  from '../../consts/app';
import axios from 'axios';
import { getSelection } from '../../utils/dom';
import { getHistory, saveHistory, getSettings } from '../../utils/storage';

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
            settings: null
        };
        this.requestDebounce = debounce(this.request, 500);
    }

    async componentDidMount() {
        try{
            let [ searchText, history, settings ] = await Promise.all([getSelection(), getHistory(), getSettings()]);
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

            this.axiosSource && this.axiosSource.cancel('abort');
            this.axiosSource = axios.CancelToken.source();

            try{
                const result = await getData(searchText, this.axiosSource.token);
                let data = parse(result.data, this.state.direction, this.state.directionSuggestions);
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
        let { settings, searchText } = this.state;
        if(!settings.history.enabled){
            return;
        }

        const history = await getHistory();

        searchText = searchText.trim();
        if(!searchText){
            return;
        }

        const index = history.findIndex(item => item === searchText);
        if(index !== -1){
            history.splice(index, 1);
        }
        else if(history.length >= settings.history.itemsCount){
            //remove last
            history.pop();
        }
        //add to first of the array
        history.unshift(searchText);
        this.saveHistory(history);
    }

    clearHistory(){
        this.saveHistory([]);
    }

    saveHistory(history){
        saveHistory(history);
        this.setState({ history });
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
        } = this.state;

        let linkFooter = searchText.trim() ?
            <div className="footer-link"><a href={MORFIX_URL + searchText} target="_blank"><img
                src="/icons/icon16.png" alt=""/>&nbsp;Morfix</a></div> : '';

        return (
            <div className="morfix">
                <a href="settings.html" target="_blank">Settings</a>
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
                    settings={settings}
                />
                {linkFooter}
            </div>
        );
    }
}

export default App;