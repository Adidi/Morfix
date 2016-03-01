import React from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends React.Component {

  constructor() {
    super();
  }

  componentDidMount(){
    let el = ReactDOM.findDOMNode(this.refs.searchInput);
    el.focus();
  }

  onChangeSearch(e){
    this.props.onChangeSearch(e.target.value);
  }

  render(){
    let text = this.props.searchText,
      clearDisplay = text ? 'block' : 'none';

    return (
      <div className="search-box">
        <input
          ref="searchInput"
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={this.onChangeSearch.bind(this)}
          onKeyUp={this.props.onKeyUpSearch}
          value={text}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  onChangeSearch: React.PropTypes.func.isRequired,
  onKeyUpSearch: React.PropTypes.func.isRequired
};

export default SearchBox;