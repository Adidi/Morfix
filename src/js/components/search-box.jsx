import React from 'react';
import PropTypes from 'prop-types';
import History from './history';

const SearchBox = ({onChangeSearch, searchText, history, historyOpen }) => {
    return (
        <div className="search-box">
            <input
                ref={r => {
                    if (r) {
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
            <History open={historyOpen} history={history} searchText={searchText} />
        </div>
    );
};

SearchBox.propTypes = {
    onChangeSearch: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    historyOpen: PropTypes.bool.isRequired
};

export default SearchBox;