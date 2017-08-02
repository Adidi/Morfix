import React from 'react';
import PropTypes from 'prop-types';

const Suggestions = ({suggestions, onChangeSearch, directionSuggestions}) => {
    if (suggestions && suggestions.length) {
        const elAnchors = [];
        suggestions.forEach((word, i) => {
            word = word.trim();
            elAnchors.push(<a key={`a${i}`} href="#" onClick={ e => {
                onChangeSearch(word, true);
            }}>{word}</a>);
            if (i + 1 < suggestions.length) {
                elAnchors.push(<span key={`span${i}`}>,</span>);
            }
        });

        return <tr>
                    <td colSpan="2">
                        <div className="suggestions">
                            <div style={{direction: 'ltr'}}>Suggestions:</div>
                            <div className={`ancs ${directionSuggestions}`} style={{direction: directionSuggestions}}>
                                {elAnchors}
                            </div>
                        </div>
                    </td>
                </tr>;
    }
    else{
        return null;
    }
};

Suggestions.propTypes = {
    suggestions: PropTypes.array,
    directionSuggestions: PropTypes.oneOf(['rtl', 'ltr']),
    onChangeSearch: PropTypes.func.isRequired
};

export default Suggestions;