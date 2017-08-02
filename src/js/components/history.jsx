import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'lodash/escapeRegExp';

const History = ({open, history, searchText}) => {
    searchText = searchText.trim();
    if(!open || !searchText){
        return null;
    }

    let regMark = null;
    if(searchText){
        const reg = new RegExp(escapeRegExp(searchText), 'i');
        history = history.filter( item => reg.test(item));
        regMark = new RegExp('(' + escapeRegExp(searchText) + ')','ig');
    }

    if(!history.length){
        return null;
    }

    return (
        <div className="history">
            { history.map( item => {
                if(regMark){
                    item = item.replace(regMark,'<b>$1</b>');
                }
                return <div className="item" dangerouslySetInnerHTML={{__html: item}} />
            })}
        </div>
    )
};

History.propTypes = {
    open: PropTypes.bool.isRequired,
    history: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired
};

export default History;
