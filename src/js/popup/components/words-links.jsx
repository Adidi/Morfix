import React from 'react';
import PropTypes from 'prop-types';

const WordsLinks = ({ words, direction, onChangeSearch}) => {

    const anchors = [];
    words.forEach((word, i) => {
        word = word.trim();
        anchors.push(<a key={`a${i}`} href="#" onClick={ e => {
            onChangeSearch(word);
        }}>{word}</a>);
        if (i + 1 < words.length) {
            anchors.push(<span key={`span${i}`}>,</span>);
        }
    });

    return (
        <div className="words-links">
            <div className={direction}>
                {anchors}
            </div>
        </div>
    )
};

WordsLinks.propTypes = {
    words: PropTypes.array.isRequired,
    direction: PropTypes.oneOf(['rtl', 'ltr']),
    onChangeSearch: PropTypes.func.isRequired
};

export default WordsLinks;