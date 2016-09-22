import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';
import conf from './../conf';

class TableResults extends React.Component {

  constructor() {
    super();
  }

  render(){
    let { searchText, direction, loading, suggestions, directionSuggestions, items, onChangeSearch  } = this.props;
    let els,
      cls = '',
      oppositeDir = direction == 'rtl' ? 'ltr' : 'rtl';
    searchText = searchText.trim();
    if(loading){
      //put the loader inside the same table for better gui result
      els = <tr>
        <td colSpan="2"><Loader /></td>
      </tr>;
    }
    else if(items.length){
      /* dangerouslySetInnerHTML because in viki there are html links to viki */
      cls = 'table-striped';
      els = items.map( (item,i) =>
        <tr key={i} >
          <td style={{direction: item.viki ? 'rtl' : null}} dangerouslySetInnerHTML={{__html: item.text}} />
          <td style={{direction: oppositeDir}}>
            <div className="word">{item.word}</div>
            <div className="diber">{item.diber}</div>
          </td>
        </tr>
      );
    }
    else if(searchText){
      els = <tr>
        <td colSpan="2" className="center explain">- No Results -</td>
      </tr>;
    }
    else{
      els = <tr>
        <td colSpan="2" className="explain" >
          <img src="/icons/icon48.png" alt="" />
          <span>Tip: Select text on any webpage, then click the Morfix button to view the definition of your selection.</span>
        </td>
      </tr>;
    }

    let elsSuggestions = null;
    if(suggestions && suggestions.length){
      let elAnchors = [];
      suggestions.forEach( (word,i) => {
        word = word.trim();
        elAnchors.push(<a key={`a${i}`} href="#" onClick={ (e) => {
          onChangeSearch(word, true);
        }}>{word}</a>);
        if(i + 1 < suggestions.length){
          elAnchors.push(<span key={`span${i}`}>,</span>);
        }
      });

      elsSuggestions = <tr>
        <td colSpan="2">
          <div className="suggestions" >
            <div style={{direction: 'ltr'}}>Suggestions:</div>
            <div className={`ancs ${directionSuggestions}`} style={{direction:directionSuggestions}}>
              {elAnchors}
            </div>
          </div>
        </td>
      </tr>;
    }


    return (
      <div>
        <table className={'table ' + cls} style={{direction:direction}} >
          <tbody>
          {els}
          {elsSuggestions}
          </tbody>
        </table>
      </div>
    );
  }
}

TableResults.propTypes = {
  items: React.PropTypes.array.isRequired,
  suggestions: React.PropTypes.array,
  direction: React.PropTypes.oneOf(['rtl', 'ltr']).isRequired,
  directionSuggestions: React.PropTypes.oneOf(['rtl', 'ltr']),
  loading: React.PropTypes.bool.isRequired,
  searchText: React.PropTypes.string.isRequired,
  onChangeSearch: React.PropTypes.func.isRequired
};

export default TableResults;