import React, {Component} from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleSearch(e){
    let searchResult = [];
    this.setState({searchValue: e.target.value.toLowerCase()});
    if( this.state.searchValue === '' ){
      searchResult = this.props.videos;
      this.props.setSearchResult(searchResult);
      return;
    }
    this.props.videos.map((item)=>{
      if(item.snippet.title.toLowerCase().includes(this.state.searchValue)){
        searchResult.push(item);
      }
    });
    this.props.setSearchResult(searchResult);
  }

  render() { 
    return ( 
      <nav className="grey darken-4 nav-wrapper">
      <div className=" container">
        <NavLink to="/" className="brand-logo">YouTube Channel</NavLink>
          <ul className="hide-on-med-and-down right">               
              <li>    
                 <div className="center row">
                    <div className="col s12 " >
                      <div className="row" id="topbarsearch">
                        <div className="input-field col s6 s12 ">
                          <i className="material-icons prefix">search</i>
                          <input type="text" placeholder="Search by video title" id="search-input" 
                          className="autocomplete white-text"
                            value={this.state.searchValue} onChange={this.handleSearch}
                          />
                          </div>
                        </div>
                      </div>
                    </div>          
                </li> 
                <li>
                <NavLink className="btn-floating black darken-4 z-depth-0" to="/favorite"><i className="material-icons">favorite</i></NavLink>
                 </li>
               <li><span className="badge white-text pink new" id="favorite-badge">{this.props.favoriteVideos.length}</span></li>                    
          </ul>
      </div>
    </nav> 
  );
  }
}
 
export default Navbar;