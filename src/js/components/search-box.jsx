import React from 'react';

const SearchBox = ({onChangeSearch,searchText}) => {

  return (
    <div className="search-box">
      <input
        ref={r => {
            if(r){
                SearchBox.searchInput = r;
                r.focus();
            }
        }}
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={e => onChangeSearch(e.target.value)}
        value={searchText}
      />
    </div>
  );
};

SearchBox.propTypes = {
  onChangeSearch: React.PropTypes.func.isRequired,
  searchText: React.PropTypes.string.isRequired
};

export default SearchBox;