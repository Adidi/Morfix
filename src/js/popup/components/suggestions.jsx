import React from 'react';
import PropTypes from 'prop-types';
import WordsLinks from './words-links';

const Suggestions = ({suggestions, onChangeSearch, direction}) =>
    <tr>
        <td colSpan="2">
            <div style={{direction: 'ltr'}}>Suggestions:</div>
            <WordsLinks
                words={suggestions}
                direction={direction}
                onChangeSearch={onChangeSearch}
            />
        </td>
    </tr>;

Suggestions.propTypes = {
    suggestions: PropTypes.array,
    direction: PropTypes.oneOf(['rtl', 'ltr']),
    onChangeSearch: PropTypes.func.isRequired
};

export default Suggestions;