import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';
import Suggestions from './suggestions';
import History from './history';
import { playSound } from '../../utils/dom';
import cs from 'classnames';

const TableResults = ({searchText,
                          direction,
                          loading,
                          items,
                          suggestions,
                          directionSuggestions,
                          onChangeSearch,
                          history,
                          clearHistory,
                          showHistory
                        } ) => {
    let els;
    searchText = searchText.trim();
    if (loading) {
        //put the loader inside the same table for better gui result
        els = <tr>
            <td colSpan="2"><Loader /></td>
        </tr>;
    }
    else if (items.length) {
        /* dangerouslySetInnerHTML because in viki there are html links to viki */
        els = items.map((item, i) =>
            <tr key={i}>
                <td className={cs({'viki': item.viki})} colSpan={item.viki ? '2' : null} dangerouslySetInnerHTML={{__html: item.text}}/>
                {!item.viki &&  <td className="word-wrapper">
                                    <div className="word-box">
                                        <div className="word">{item.word}</div>
                                        {item.soundUrl && <div className="sound-box" onClick={e => {
                                                                playSound(item.soundUrl);
                                                             }}><img src="icons/sound.png" alt="" /></div> }
                                    </div>
                                    <div className="diber">{item.diber}</div>
                                </td> }
            </tr>
        );
    }
    else if (searchText) {
        els = <tr>
            <td colSpan="2" className="center explain">- No Results -</td>
        </tr>;
    }
    else {
        els = <tr>
            <td colSpan="2" className="explain">
                <img src="icons/icon48.png" alt=""/>
                <span>Tip: Select text on any webpage, then click the Morfix button to view the definition of your selection.</span>
            </td>
        </tr>;
    }

    return (
        <div className="results-box">
            <table className={cs('table-results table',{'table-striped': !!items.length},direction)} >
                <tbody>
                {els}
                { !!suggestions.length && <Suggestions
                    suggestions={suggestions}
                    direction={directionSuggestions}
                    onChangeSearch={onChangeSearch}
                    /> }
                { showHistory &&
                        <History
                            history={history}
                            onChangeSearch={onChangeSearch}
                            clearHistory={clearHistory}
                        /> }
                </tbody>
            </table>
        </div>
    );
};

TableResults.propTypes = {
    items: PropTypes.array.isRequired,
    suggestions: PropTypes.array,
    direction: PropTypes.oneOf(['rtl', 'ltr']).isRequired,
    directionSuggestions: PropTypes.oneOf(['rtl', 'ltr']),
    loading: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
    clearHistory: PropTypes.func.isRequired,
    showHistory: PropTypes.bool.isRequired
};

export default TableResults;