import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ChannelUploads extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      titleSort: false,
      dateSort: false
    };
    this.handleTitleSort = this.handleTitleSort.bind(this);
    this.handleDateSort = this.handleDateSort.bind(this);
  }
  
  handleTitleSort(){
    this.setState(prevState=> ({titleSort: !prevState.titleSort}));
  }

  handleDateSort(){
    this.setState(prevState=> ({dateSort: !prevState.dateSort}));
  }

  render() { 
    let uploadsVideos = this.props.uploadsVideos;
    // console.log(uploadsVideos);
    if(this.state.titleSort){
      let titles = [];
      (uploadsVideos).forEach(element => {
        titles.push(element.snippet.title);
      });
      // console.log(uploadsVideos);
      titles.sort();
      let sorteduploadsVideos = [];
      // console.log(titles);
      (uploadsVideos).forEach(element => {
        let index = titles.indexOf(element.snippet.title);
        sorteduploadsVideos[index] = element;
      });
      uploadsVideos = sorteduploadsVideos;
    }
    if(this.state.dateSort){
      let dates = [];
      (uploadsVideos).forEach(element=> {
        dates.push(element.snippet.publishedAt);
      });
      dates.sort((a, b) => b - a);
      let sorteduploadsVideos = [];
      (uploadsVideos).forEach(element => {
        let index = dates.indexOf(element.snippet.publishedAt);
        sorteduploadsVideos[index] = element;
      });
      uploadsVideos = sorteduploadsVideos;
    }
    return ( 
      <div>
          <table className="highlight centered">
      <thead>
        <tr>
            <th></th>
            <th className=""  >
              <div onClick={this.handleTitleSort}>
                  <span className="valign-wrapper" id="title"><i className="material-icons">unfold_more</i>Title</span>
              </div>
            </th>
            
            <th>
              <div  onClick={this.handleDateSort}>
                  <span id="publish-date" className="valign-wrapper"><i className="material-icons">unfold_more</i>Publish Date</span> 
              </div>
            </th>
            <th></th>
        </tr>
      </thead>

      <tbody>
        {uploadsVideos.map((item)=>{
          const videoId = item.snippet.resourceId.videoId;
      
          const thubmnail = item.snippet.thumbnails.medium.url;
      
          const title = item.snippet.title;
      
          const publishDate = new Date(item.snippet.publishedAt);
          const dd = String(publishDate.getDate()).padStart(2, '0');
          const mm = String(publishDate.getMonth() + 1).padStart(2, '0');
          const yyyy = publishDate.getFullYear();
          const publishDateFromated = `${dd}-${mm}-${yyyy}`;

          return(<tr key={videoId}>
            <td className="thumbnail">
              <iframe width={250} height={120} src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </td>
            <td>{title}</td>
            <td>{publishDateFromated}</td>
            <td><Link to="/details" onClick={e=> {this.props.componentDetails(videoId)}} className="btn red center-align">Details</Link></td>
          </tr>)
        })}
      </tbody>
    </table>
    <div className="right-align" id="uploads-pagination">
        {this.props.prevPageToken? <button onClick={this.props.loadPage} id="prev" className="btn-small">prev</button>
        : <button onClick={this.props.loadPage} id="prev" className="btn-small disabled">prev</button>}
        
        {this.props.nextPageToken? 
          <button onClick={this.props.loadPage} id="next" className="btn-small">next</button>
          : <button onClick={this.props.loadPage} id="next" className="btn-small disabled">next</button>
        }
    </div>
      </div>
    );
  }
}
 
export default ChannelUploads;