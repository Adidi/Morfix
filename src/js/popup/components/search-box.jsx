import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onChangeSearch, searchText }) =>
    <div className="search-box">
        <input
            ref={r => {
                r && r.focus();
            }}
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={e => onChangeSearch(e.target.value)}
            value={searchText}
        />
    </div>;

SearchBox.propTypes = {
    onChangeSearch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired
};

export default SearchBox;