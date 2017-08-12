import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';
import Suggestions from './suggestions';
import History from './history';
import { playSound } from '../../utils/dom';

const TableResults = ({searchText,
                          direction,
                          loading,
                          items,
                          suggestions,
                          directionSuggestions,
                          onChangeSearch,
                          history,
                          clearHistory,
                          settings
                        } ) => {
    let els,
        cls = '',
        oppositeDir = direction === 'rtl' ? 'ltr' : 'rtl';
    searchText = searchText.trim();
    if (loading) {
        //put the loader inside the same table for better gui result
        els = <tr>
            <td colSpan="2"><Loader /></td>
        </tr>;
    }
    else if (items.length) {
        /* dangerouslySetInnerHTML because in viki there are html links to viki */
        cls = 'table-striped';
        els = items.map((item, i) =>
            <tr key={i}>
                <td style={{direction: item.viki ? 'rtl' : null}} dangerouslySetInnerHTML={{__html: item.text}}/>
                <td style={{direction: oppositeDir}}>
                    <div className="word-box">
                        <div className="word">{item.word}</div>
                        {item.soundUrl && <div className="sound-box" onClick={e => {
                                                playSound(item.soundUrl);
                                             }}><img src="icons/sound.png" alt="" /></div> }
                    </div>
                    <div className="diber">{item.diber}</div>
                </td>
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
                <img src="/icons/icon48.png" alt=""/>
                <span>Tip: Select text on any webpage, then click the Morfix button to view the definition of your selection.</span>
            </td>
        </tr>;
    }

    return (
        <div className="results-box">
            <table className={'table ' + cls} style={{direction: direction}}>
                <tbody>
                {els}
                { !!suggestions.length && <Suggestions
                    suggestions={suggestions}
                    direction={directionSuggestions}
                    onChangeSearch={onChangeSearch}
                    /> }
                { !!history.length &&
                    settings.history.enabled &&
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
    settings: PropTypes.object.isRequired
};

export default TableResults;