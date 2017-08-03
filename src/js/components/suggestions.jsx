import React from 'react';
import PropTypes from 'prop-types';
import WordsLinks from './words-links';

const Suggestions = ({suggestions, onChangeSearch, directionSuggestions}) =>
    <tr>
        <td colSpan="2">
            <div style={{direction: 'ltr'}}>Suggestions:</div>
            <WordsLinks
                words={suggestions}
                direction={directionSuggestions}
                onChangeSearch={onChangeSearch}
            />
        </td>
    </tr>;

Suggestions.propTypes = {
    suggestions: PropTypes.array,
    directionSuggestions: PropTypes.oneOf(['rtl', 'ltr']),
    onChangeSearch: PropTypes.func.isRequired
};

export default Suggestions;