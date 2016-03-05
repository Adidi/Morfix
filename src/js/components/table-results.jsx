import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './loader';
import conf from './../conf';

class TableResults extends React.Component {

  constructor() {
    super();
  }

  render(){
    let searchText = this.props.searchText.trim(),
      els,
      cls = '',
      oppositeDir = this.props.direction == 'rtl' ? 'ltr' : 'rtl';
    if(this.props.loading){
      //put the loader inside the same table for better gui result
      els = <tr>
        <td colSpan="2"><Loader /></td>
      </tr>;
    }
    else if(this.props.items.length){
      cls = 'table-striped';
      els = this.props.items.map( (item,i) =>
        <tr key={i} >
          /* dangerouslySetInnerHTML because in viki there are html links to viki */
          <td style={{direction: item.viki ? 'rtl' : null}} dangerouslySetInnerHTML={{__html: item.text}}></td>
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

    return (
      <div>
        <table className={'table ' + cls} style={{direction:this.props.direction}} >
          <tbody>
          {els}
          </tbody>
        </table>
      </div>
    );
  }
}

TableResults.propTypes = {
  items: React.PropTypes.array.isRequired,
  direction: React.PropTypes.oneOf(['rtl', 'ltr']).isRequired,
  loading: React.PropTypes.bool.isRequired,
  searchText: React.PropTypes.string.isRequired
};

export default TableResults;