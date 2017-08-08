import React from 'react';
import PropTypes from 'prop-types';
import WordsLinks from './words-links';

const History = ({ history, onChangeSearch, clearHistory }) =>
    <tr>
        <td colSpan="2">
            <div style={{direction: 'ltr'}}>History: <a href="#" onClick={clearHistory} >clear</a></div>
            <WordsLinks
                words={history}
                direction={'ltr'}
                onChangeSearch={onChangeSearch}
            />
        </td>
    </tr>;

History.propTypes = {
    history: PropTypes.array.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired
};

export default History;
