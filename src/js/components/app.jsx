import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './search-box';
import TableResults from './table-results';
import Loader from './loader';
import Chrome from './../utils/chrome';
import $ from 'jquery';
//import axios from 'axios';
import conf from './../conf';
import ModelItems from './../models/items';
import { debounce } from 'lodash';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
      loading: false,
      error: false,
      direction: 'rtl',
      items: []
    };
  }

  componentDidMount(){
    Chrome.executeScript('window.getSelection().toString();')
      .then( selection =>{
          let searchText = selection[0]
          this.setState({searchText});
      })
      .then(this.request.bind(this));
  }

  request(){
    if(this.state.searchText.trim()) {
      this.setState({loading:true});
      let url = conf.baseUrl + this.state.searchText;

      if(this.jqxhr){
        this.jqxhr.abort();
      }

      this.jqxhr = $.ajax({
            url,
            cache: false
        }).done((res)=> {
            let data = ModelItems.parse(res, this.state.direction);
            this.setState({items: data.items, direction: data.direction});
        }).fail(()=> {
            //this.setState({loading: false, error: true});
        }).always(()=>{
          this.jqxhr = null;
          this.setState({loading:false});
        });

      /*
      axios.get(url)
        .then(res => {
          let data = ModelItems.parse(res.data, this.state.direction);
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
    else{
      this.setState({items: []});
    }
  }

  onChangeSearch(value){
    let loading = value.trim() ? true : false;
    this.setState({searchText:value,loading,items:[]});
  }

  onKeyUpSearch(){
    //only initialize debounce once !!!
    if(!this.requestDebounce){
      this.requestDebounce = debounce(this.request.bind(this),500);
    }
    this.requestDebounce();
  }

  render(){
    let linkFooter = this.state.searchText.trim() ?
      <div className="footer-link"><a href={conf.baseUrl + this.state.searchText} target="_blank"><img src="/icons/icon16.png" alt="" />&nbsp;Morfix</a></div> : '';


    return (
      <div className="morfix">
        <SearchBox
          onChangeSearch={this.onChangeSearch.bind(this)}
          searchText={this.state.searchText}
          onKeyUpSearch={this.onKeyUpSearch.bind(this)}
        />
        <TableResults
          items={this.state.items}
          direction={this.state.direction}
          loading={this.state.loading}
          searchText={this.state.searchText}
        />
        {linkFooter}
      </div>
    );
  }
}

export default App;