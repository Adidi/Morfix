import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './search-box';
import TableResults from './table-results';
import Chrome from './../utils/chrome';
import $ from 'jquery';
// import axios from 'axios';
import conf from './../conf';
import parse from './../models/items';
import {debounce} from 'lodash';


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
            directionSuggestions: 'rtl'
        };
    }

    componentDidMount() {
        Chrome.executeScript('window.getSelection().toString();')
            .then(selection => {
                let searchText = selection[0];
                this.setState({searchText});
            })
            .then(this.request.bind(this));
    }

    request() {
        if (this.state.searchText.trim()) {
            this.setState({loading: true});
            let url = conf.baseUrl + this.state.searchText;

            if (this.jqxhr) {
                this.jqxhr.abort();
            }

            this.jqxhr = $.ajax({
                url,
                cache: false
            }).done((res)=> {
                let data = parse(res, this.state.direction, this.state.directionSuggestions);
                this.setState({
                    items: data.items,
                    suggestions: data.suggestions,
                    loading: false,
                    direction: data.direction,
                    directionSuggestions: data.directionSuggestions
                });
            }).fail((jqXHR, textStatus, err)=> {
                if (textStatus !== 'abort') {
                    this.setState({loading: false, error: true});
                }
            }).always(()=> {
                this.jqxhr = null;
            });

            /*
             axios.get(url)
             .then(res => {
             let data = parse(res.data, this.state.direction);
             //check again if search term is not empty to shwo results
             if(this.state.searchText.trim()){
             this.setState({loading: false, items: data.items, direction: data.direction});
             }
             })
             .catch(res => {
             this.setState({loading: false, error: true});
             });
             */
        }
        else {
            this.setState({items: [], suggestions: []});
        }
    }

    onChangeSearch(value, focus = false) {
        let loading = value.trim() ? true : false;
        this.setState({searchText: value, loading, items: [], suggestions: []});
        this.search();
        if (focus) {
            let el = ReactDOM.findDOMNode(this.searchBoxComp.refs.searchInput);
            el.focus();
        }
    }

    search() {
        //only initialize debounce once !!!
        if (!this.requestDebounce) {
            this.requestDebounce = debounce(this.request.bind(this), 500);
        }
        this.requestDebounce();
    }

    render() {
        let linkFooter = this.state.searchText.trim() ?
            <div className="footer-link"><a href={conf.baseUrl + this.state.searchText} target="_blank"><img
                src="/icons/icon16.png" alt=""/>&nbsp;Morfix</a></div> : '';


        return (
            <div className="morfix">
                <SearchBox
                    ref={r => this.searchBoxComp = r}
                    onChangeSearch={this.onChangeSearch.bind(this)}
                    searchText={this.state.searchText}
                />
                <TableResults
                    items={this.state.items}
                    suggestions={this.state.suggestions}
                    onChangeSearch={this.onChangeSearch.bind(this)}
                    direction={this.state.direction}
                    directionSuggestions={this.state.directionSuggestions}
                    loading={this.state.loading}
                    searchText={this.state.searchText}
                />
                {linkFooter}
            </div>
        );
    }
}

export default App;